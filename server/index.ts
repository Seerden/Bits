import { config } from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import { strategy } from "./auth/passport-config";
import { sessionConfig } from "./auth/session-config";
import { getUser } from "./db/queries/user-get";
import { logRequests } from "./lib/middleware";
import dbRouter from "./routers/db-router";
config();

async function runDb() {
    // initialize express app
    const app = express();
    app.use(
        express.urlencoded({
            limit: "5mb",
            parameterLimit: 10000,
            extended: true,
        })
    );
    app.use(express.json());
    app.use(session(sessionConfig));
    app.use(logRequests);

    // include passport strategy
    passport.use(strategy);
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser((user: any, done) => done(null, user.username));
    passport.deserializeUser(async (username: any, done) => {
        try {
            const [user] = await getUser(username);
            if ("username" in user) {
                done(null, user);
            } else {
                done("User not found");
            }
        } catch (e) {
            done(e);
        }
    });

    app.use("/db", dbRouter);

    app.post(
        "/login",
        passport.authenticate("local", {
            /*  @note: need to include /api in redirects, because of the 
                url proxy in the client-side webpack config  
                @todo: figure out if /api/ is still needed on production, since we don't use the proxy in that situation
            */
            successRedirect: "/api/me",
            failureRedirect: "/api/login/fail",
        })
    );

    app.get("/me", (req, res) => {
        if (req.isAuthenticated && req.user) {
            // @ts-ignore: @todo: expand Express.User type to include username and user_id definitions
            const { username, userId } = req.user;
            res.send({
                username,
                userId,
            });
        } else {
            res.send({ error: "Not logged in" });
        }
    });

    app.get("/login/fail", (req, res) => {
        res.status(401).send(
            "Login unsuccessful. Please check your username and password."
        );
    });

    app.get("/logout", (req, res) => {
        req.session.destroy(() => {
            req.logOut();
            res.send({
                success: true,
                message: "Logged out successfully",
            });
        });
    });

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
        console.log(`Server started on port ${port} on ${new Date()}`);
    });
}

runDb();

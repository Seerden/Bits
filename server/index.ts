import express from 'express';
import passport from 'passport';
import { strategy } from './auth/passportConfig';
import dbRouter from './routers/dbRouter';
import session from 'express-session';
import { config } from 'dotenv';
import { getUser } from './db/queries/getUsers';
import { sessionConfig } from './auth/sessionConfig';

config();

const app = express();
app.use(express.urlencoded({
    limit: '5mb',
    parameterLimit: 10000,
    extended: true
}));
app.use(express.json());
app.use(session(sessionConfig));

// include passport strategy
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user: any, done) => done(null, user.username));
passport.deserializeUser(async (username: any, done) => {
    try {
        const [user] = await getUser(username);

        user ? done(null, user) : done('User not found');
    } catch (e) {
        done(e);
    }
});

app.use('/db', dbRouter);

app.post('/login', passport.authenticate('local', {
    successRedirect: '/api/me',  // @note: the /api is needed to work with the proxy set in the client's webpack config -- strange
    failureRedirect: '/login/fail'
}));
app.post('/login/fail', (req, res) => {
    res.status(401).send('Login unsuccessful')
})
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        req.logOut();
        res.send({
            success: true,
            message: 'Logged out successfully'
        })
    });
});
app.get('/me', (req, res) => {
    if (req.isAuthenticated && req.user) {
        // @ts-ignore: @todo: expand Express.User type to include username and user_id definitions
        const { username, userId } = req.user;
        res.send({
            username,
            userId
        });
    } else {
        res.send({ error: 'Not logged in' })
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port} on ${new Date()}`);
})

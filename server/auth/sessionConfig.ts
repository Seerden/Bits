import connectPg from 'connect-pg-simple';
import session, { Session, SessionOptions } from 'express-session';
import pool from '../db/pool';

const pgSession = connectPg(session);

export const sessionConfig: SessionOptions = {
    store: new pgSession({
        pool: pool,
        tableName: 'session',
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 7*24*3600*1000,  // 7 days
        secure: process.env.NODE_ENV == 'production'
    }
}
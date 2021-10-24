import express from 'express';
import dbRouter from './routers/dbRouter';

const app = express();
app.use(express.urlencoded({
    limit: '5mb',
    parameterLimit: 10000,
    extended: true
}));
app.use(express.json());
app.use('/db', dbRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port} on ${new Date()}`);
})

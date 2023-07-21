import express from 'express';
import * as dotenv from 'dotenv';
import { bookRouter } from './books/book.router';
import cors from 'cors'
import helmet from 'helmet';
import { authorRouter } from './authors/authors.router';
dotenv.config();

const app =express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/books',bookRouter);
app.use('/api/authors',authorRouter);

const port = parseInt(process.env.PORT as string);

app.listen(port,()=>{
    console.log(`express Started at port ${port}`);
});
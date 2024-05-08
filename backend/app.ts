import logger from 'morgan';
import express, {Request, Response} from 'express';
import cors from 'cors';
import {origin} from 'utils/db';
import routes from 'routes';
import {ErrorResponse} from 'utils/error';

const app = express();

app.use(logger('dev'));
app.use(cors({origin: origin, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', routes);

app.use((err: ErrorResponse, _req: Request, res: Response, next: any) => {
    const {http_code} = err;

    console.log(err);
    if (http_code) {
        res.status(http_code).json(err);
    } else {
        res.status(500).json({message: 'Internal Server Error'});
    }
});


export default app;
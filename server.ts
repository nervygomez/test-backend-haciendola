import express, { Application } from 'express';
import cors from 'cors';
import routes from './src/routes/index'
import db from './src/config/db.config'
import multer from 'multer';
import path from 'path';
import { swaggerDocs } from './src/routes/swagger';
class Server {
    app: Application;
    port: string
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.connectDatabase();
        this.middlewares();
        this.app.use('/api', routes);
    }
    

    listen() {
        this.app.listen (this.port, () => {
            console.log("[server] Server is running on port", this.port);
            swaggerDocs(this.app, this.port)
        });
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        const storage = multer.memoryStorage();

        this.app.use(multer({ storage }).single("file"));
        this.app.use(express.static(path.join(__dirname, "public")));
    }

    async connectDatabase() {
        try {
            await db.authenticate();
            console.log('Connection to the database has been established successfully');
        } catch (error) {
            throw new Error('Error - connection to the database');
        }
    }
}

export default Server;

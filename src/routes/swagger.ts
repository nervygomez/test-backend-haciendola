import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { Application, Request, Response } from 'express';


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API de test Haciendola',
            version: '1.0.0',
            description: 'A documented example API with Swagger',
        }
    },
    apis: ['src/routes/index.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);


export const swaggerDocs = (app: Application, port: string) => { 
    app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get('api/v1/docs.json', (_: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec)
    })
    console.log(`v1 doc at http://localhost:${port}/api/v1/docs`)
}


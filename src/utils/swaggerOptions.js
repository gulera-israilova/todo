import swaggerJsDoc from 'swagger-jsdoc'
import PORT from "../../index.js";
export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo API",
            version: "1.0.0",
            description: "A simple Express Todo API",
        },
        servers: [
            {
                url: `http://localhost:5556`,
            },
            {
                url: `https://todo-application9.herokuapp.com`,
            },

        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ["./src/routes/*.js"],
};

export const specs = swaggerJsDoc(options);
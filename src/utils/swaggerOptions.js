import swaggerJsDoc from 'swagger-jsdoc'
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
                url: `https://todo-application9.herokuapp.com`,
            },
            {
                url: `http://localhost:5556`,
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
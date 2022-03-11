import express from "express";
import router from "./routes";

const createApp = (): express.Application => {
    const app: express.Application = express();
    app.use(router);
    return app;
}

export default createApp;
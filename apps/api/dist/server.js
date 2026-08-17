import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";
const { connectRedis } = await import("./config/redis.js");
const startServer = async () => {
    await connectDatabase();
    await connectRedis();
    app.listen(env.PORT, () => {
        console.log(`${env.SERVICE_NAME} running on http://localhost:${env.PORT}`);
    });
};
startServer();

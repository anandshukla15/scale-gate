import "dotenv/config";
export const env = {
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    SERVICE_NAME: process.env.SERVICE_NAME || "api-server",
    SERVER_ID: process.env.SERVER_ID || "server-1"
};

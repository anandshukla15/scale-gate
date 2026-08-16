import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

redis.on("error", (error) => {
  console.error("Redis error:", error);
});

export const connectRedis = async () => {
  try {
    await redis.connect();

    console.log("Redis connected");
  } catch (error) {
    console.error("Redis connection failed:", error);
    process.exit(1);
  }
};
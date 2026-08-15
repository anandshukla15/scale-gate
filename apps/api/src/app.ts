import express from "express";
import cors from "cors";
import helmet from "helmet";

import healthRoutes from "./routes/health.routes.js";
import { requestLogger } from "./middleware/requestLogger.js";
import companyRoutes from "./routes/company.routes.js";

const app = express();

app.use(helmet());


app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.use("/health", healthRoutes);
app.use("/api/companies", companyRoutes);
export default app;
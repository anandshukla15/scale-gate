import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.PORT, () => {
  console.log(
    `${env.SERVICE_NAME} running on http://localhost:${env.PORT}`
  );
});
import express from "express";
import cors from "cors";
import routes from "./routes/index";
import logout from "./routes/logout.routes";
import { errorMiddleware } from "./middlewares/error.middlewares";
import cookieParser from "cookie-parser";
import { log } from "node:console";
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5000", // local dev
      "https://chat-bot-ai-five-beige.vercel.app", // production frontend
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/", logout);
app.use("/api", routes);
app.use(errorMiddleware);
export default app;

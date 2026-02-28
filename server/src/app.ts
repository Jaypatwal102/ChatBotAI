import express from "express";
import cors from "cors";
import routes from "./routes/index";
import logout from "./routes/logout.routes";
import { errorMiddleware } from "./middlewares/error.middlewares";
import cookieParser from "cookie-parser";
import { log } from "node:console";
const allowedOrigins = [
  "http://localhost:3000",
  "https://chat-bot-ai-five-beige.vercel.app",
];
const app = express();
app.set("trust proxy", 1);
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

app.use("/", logout);
app.use("/api", routes);
app.use(errorMiddleware);
export default app;

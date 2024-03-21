import mainRouter from "./routes/index";
import express, { Request, Response} from "express"
import morgan from "morgan"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to my brand backend"
    })
});

app.use("/api/v1", mainRouter);

app.use("*", (req: Request, res: Response) => {
    res.status(404).json({
        status: "error",
        message: "Invalid URL"
    });
});


export default app;
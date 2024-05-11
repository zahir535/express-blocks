import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

import express from "express";
import router from "./router";
import morgan from 'morgan'
import cors from 'cors'
import { protect } from "./modules/auth";

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', protect, router)

app.get("/", (req, res) => {
  console.log("Hello");
  res.status(200);
  res.json({ status: 200, message: "hello from here" });
});





export default app;
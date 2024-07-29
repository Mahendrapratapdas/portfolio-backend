import express from "express";
import cors from 'cors';
import {ContactRoutes} from "../back-end/contractUS/route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/contact", ContactRoutes)

app.listen(3003,()=>{
    console.log("Server listen at port 3003");
})
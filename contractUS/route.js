import express from "express";
import ContactController from "./controller.js";

const controller = new ContactController();
export const ContactRoutes = express.Router();

ContactRoutes.post("/",(req, res)=>{
    controller.contactUS(req, res);
})
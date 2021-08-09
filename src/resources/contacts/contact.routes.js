import { Router } from "express";
import ContactController from "./contact.controller.js";

export const contactRoutes = Router();

contactRoutes.get("/", ContactController.findAll);

contactRoutes.get("/:id", ContactController.findOne);

contactRoutes.post("/", ContactController.create);

contactRoutes.put("/:id", ContactController.update);

contactRoutes.delete("/:id", (req, res) => {
  res.status(200).json(`Suppression contact`);
});

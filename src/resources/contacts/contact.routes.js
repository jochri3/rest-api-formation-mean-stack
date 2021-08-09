import { Router } from "express";
import ContactController from "./contact.controller.js";
import contactsExists from "../../middlewares/contact.exists.js";

export const contactRoutes = Router();

contactRoutes.get("/", ContactController.findAll);

contactRoutes.get("/:id", [contactsExists], ContactController.findOne);

contactRoutes.post("/", ContactController.create);

contactRoutes.put("/:id", [contactsExists], ContactController.update);

contactRoutes.delete("/:id", [contactsExists], ContactController.destroy);

import { Router } from "express";
import ContactController from "./contact.controller.js";

export const contactRoutes = Router();

contactRoutes.get("/", ContactController.findAll);

contactRoutes.get("/:id", (req, res) => {
  res.status(200).json(`Un seul contact`);
});

contactRoutes.post("/", (req, res) => {
  res.status(201).json(`Nouveau contact`);
});

contactRoutes.put("/:id", (req, res) => {
  res.status(200).json(`Modification contact`);
});

contactRoutes.delete("/:id", (req, res) => {
  res.status(200).json(`Suppression contact`);
});

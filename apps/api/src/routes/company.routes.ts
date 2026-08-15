import { Router } from "express";

import {
  createCompany,
  getCompanies
} from "../controllers/company.controller.js";

const router = Router();

router.post("/", createCompany);

router.get("/", getCompanies);

export default router;
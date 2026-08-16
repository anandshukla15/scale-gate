import { Router } from "express";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";

import { validate } from "../middleware/validate.js";
import {
  createUserSchema
} from "../validators/user.validator.js";

const router = Router();

router.post("/",validate(createUserSchema), createUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
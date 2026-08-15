import { Request, Response } from "express";
import { prisma } from "../config/database.js";

export const createCompany = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, description, website } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Company name is required"
      });
    }

    const company = await prisma.company.create({
      data: {
        name,
        description,
        website
      }
    });

    return res.status(201).json({
      success: true,
      data: company
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create company"
    });
  }
};
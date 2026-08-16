import { Request, Response } from "express";
import { prisma } from "../config/database.js";

export const createOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      userId,
      companyId,
      amount
    } = req.body;

    if (!userId || !companyId || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "userId, companyId and amount are required"
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId }
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        companyId,
        amount
      }
    });

    return res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order"
    });
  }
};

export const getOrders = async (
  req: Request,
  res: Response
) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        company: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders"
    });
  }
};

export const getOrderById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        company: true
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order"
    });
  }
};
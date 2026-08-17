import { prisma } from "../config/database.js";
export const createCompany = async (req, res) => {
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create company"
        });
    }
};
export const getCompanies = async (req, res) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
        const skip = (page - 1) * limit;
        const search = typeof req.query.search === "string"
            ? req.query.search.trim()
            : undefined;
        const [companies, total] = await Promise.all([
            prisma.company.findMany({
                where: search
                    ? {
                        OR: [
                            {
                                name: {
                                    contains: search,
                                    mode: "insensitive"
                                }
                            },
                            {
                                description: {
                                    contains: search,
                                    mode: "insensitive"
                                }
                            }
                        ]
                    }
                    : undefined,
                skip,
                take: limit,
                orderBy: {
                    createdAt: "desc"
                }
            }),
            prisma.company.count({
                where: search
                    ? {
                        OR: [
                            {
                                name: {
                                    contains: search,
                                    mode: "insensitive"
                                }
                            },
                            {
                                description: {
                                    contains: search,
                                    mode: "insensitive"
                                }
                            }
                        ]
                    }
                    : undefined
            })
        ]);
        return res.status(200).json({
            success: true,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
            data: companies
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch companies"
        });
    }
};
export const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        if (typeof id !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid ID parameter",
            });
        }
        const company = await prisma.company.findUnique({
            where: { id }
        });
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: company
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch company"
        });
    }
};
export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, website } = req.body;
        if (typeof id !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid ID parameter",
            });
        }
        const existingCompany = await prisma.company.findUnique({
            where: { id }
        });
        if (!existingCompany) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }
        const company = await prisma.company.update({
            where: { id },
            data: {
                name,
                description,
                website
            }
        });
        return res.status(200).json({
            success: true,
            data: company
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update company"
        });
    }
};
export const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        if (typeof id !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid ID parameter",
            });
        }
        const existingCompany = await prisma.company.findUnique({
            where: { id }
        });
        if (!existingCompany) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }
        await prisma.company.delete({
            where: { id }
        });
        return res.status(200).json({
            success: true,
            message: "Company deleted successfully"
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Company deleted successfully"
        });
    }
};

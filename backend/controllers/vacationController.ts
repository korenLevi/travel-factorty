import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { VacationRequest, RequestStatus } from "../entities/VacationRequest";
import { User } from "../entities/User";

const requestRepo = AppDataSource.getRepository(VacationRequest);
const userRepo = AppDataSource.getRepository(User);

export const createRequest = async (req: Request, res: Response) => {
  try {
    const { userId, startDate, endDate, reason } = req.body;

    if (!userId || !startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "userId, startDate and endDate are required" });
    }

    const request = requestRepo.create({ user: { id: userId }, startDate, endDate, reason });
    const saved = await requestRepo.save(request);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error creating request", error });
  }
};

export const getAllRequests = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const where = status ? { status: status as RequestStatus } : {};
    const requests = await requestRepo.find({
      where,
      relations: ["user"],
      order: { createdAt: "DESC" },
    });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error });
  }
};

export const getRequestsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const requests = await requestRepo.find({
      where: { user: { id: Number(userId) } },
      relations: ["user"],
      order: { createdAt: "DESC" },
    });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error });
  }
};

export const updateRequestStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, comments } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const request = await requestRepo.findOneBy({ id: Number(id) });
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    request.comments = comments || null;

    const updated = await requestRepo.save(request);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating request", error });
  }
};

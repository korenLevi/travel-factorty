import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepo.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, role } = req.body;

    if (!name || !role) {
      return res.status(400).json({ message: "Name and role are required" });
    }

    const user = userRepo.create({ name, role });
    const saved = await userRepo.save(user);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};
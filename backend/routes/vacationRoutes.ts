import { Router } from "express";
import {
  createRequest,
  getRequestsByUser,
  getAllRequests,
  updateRequestStatus,
} from "../controllers/vacationController";

const router = Router();

router.post("/", createRequest);
router.get("/", getAllRequests);
router.get("/user/:userId", getRequestsByUser);
router.patch("/:id", updateRequestStatus);

export default router;
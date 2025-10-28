import express from "express";
import {
  reserveSeats,
  cancelReservation,
  listReservations,
  getEventSummary
} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", reserveSeats);
router.delete("/:reservationId", cancelReservation);
router.get("/", listReservations);
router.get("/summary", getEventSummary);

export default router;

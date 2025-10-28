import express from "express";
import {
  reserveSeats,
  cancelReservation,
  listReservations,
  getEventSummary
} from "../controllers/reservationController.js";

const router = express.Router();

// POST /reservations -> reserve seats
router.post("/", reserveSeats);

// DELETE /reservations/:reservationId -> cancel reservation
router.delete("/:reservationId", cancelReservation);

// GET /reservations -> list all reservations
router.get("/", listReservations);

// GET /reservations/summary -> event summary
router.get("/summary", getEventSummary);

export default router;

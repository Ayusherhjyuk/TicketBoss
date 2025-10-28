import { event } from "../models/eventStore.js";
import { v4 as uuidv4 } from "uuid";
import { validateSeatRequest } from "../utils/validate.js";

// Reserve Seats
export const reserveSeats = (req, res) => {
  const { partnerId, seats } = req.body;

  if (!partnerId || seats === undefined) {
    return res.status(400).json({ error: "partnerId and seats required" });
  }

  const { valid, message } = validateSeatRequest(seats);
  if (!valid) return res.status(400).json({ error: message });

  if (event.availableSeats < seats) {
    return res.status(409).json({ error: "Not enough seats left" });
  }

  const reservationId = uuidv4();
  event.availableSeats -= seats;
  event.reservationCount++;
  event.reservations[reservationId] = seats;
  event.version++;

  return res.status(201).json({
    reservationId,
    seats,
    status: "confirmed"
  });
};

// Cancel Reservation
export const cancelReservation = (req, res) => {
  const { reservationId } = req.params;

  if (!event.reservations[reservationId]) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  const seats = event.reservations[reservationId];
  delete event.reservations[reservationId];
  event.availableSeats += seats;
  event.version++;

  return res.status(204).send();
};

// Get All Reservations
export const listReservations = (req, res) => {
  const reservations = Object.entries(event.reservations).map(
    ([id, seats]) => ({ reservationId: id, seats })
  );
  res.status(200).json(reservations);
};

// Event Summary
export const getEventSummary = (req, res) => {
  res.status(200).json({
    eventId: event.eventId,
    name: event.name,
    totalSeats: event.totalSeats,
    availableSeats: event.availableSeats,
    reservationCount: event.reservationCount,
    version: event.version
  });
};

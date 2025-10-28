import express from "express";
import reservationRoutes from "./routes/reservations.js";

const app = express();
app.use(express.json());

// Routes
app.use("/reservations", reservationRoutes);

// Health Check
app.get("/", (req, res) => res.send("🎟️ TicketBoss API Running!"));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

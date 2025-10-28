export function validateSeatRequest(seats) {
    if (typeof seats !== "number" || seats <= 0 || seats > 10) {
      return { valid: false, message: "Seats must be between 1 and 10" };
    }
    return { valid: true };
  }
  
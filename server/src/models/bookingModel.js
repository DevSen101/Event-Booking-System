// src/models/bookingModel.js
const db = require('../config/db');

class Booking {
  static async create(booking) {
    const { event_id, name, email, mobile, quantity, total_amount } = booking;
    const [result] = await db.execute(
      `INSERT INTO bookings (event_id, name, email, mobile, quantity, total_amount)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [event_id, name, email, mobile, quantity, total_amount]
    );
    return result;
  }

  static async getByEvent(event_id) {
    const [rows] = await db.execute(`SELECT * FROM bookings WHERE event_id=?`, [event_id]);
    return rows;
  }

  static async getAll() {
    const [rows] = await db.execute(`SELECT * FROM bookings`);
    return rows;
  }

  static async cancel(id) {
    const [result] = await db.execute(
      `UPDATE bookings SET status='cancelled' WHERE id=?`,
      [id]
    );
    return result;
  }
}

module.exports = Booking;

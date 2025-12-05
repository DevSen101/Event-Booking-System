// src/models/eventModel.js
const db = require('../config/db');

class Event {
  static async create(event) {
    const { title, description, location, date, total_seats, available_seats, price, img } = event;
    const [result] = await db.execute(
      `INSERT INTO events (title, description, location, date, total_seats, available_seats, price, img)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, location, date, total_seats, available_seats, price, img]
    );
    return result;
  }

  static async getAll(filters = {}) {
    let sql = `SELECT * FROM events WHERE 1=1`;
    const params = [];
    if (filters.location) {
      sql += ` AND location LIKE ?`;
      params.push(`%${filters.location}%`);
    }
    if (filters.date) {
      sql += ` AND DATE(date) = ?`;
      params.push(filters.date);
    }
    const [rows] = await db.execute(sql, params);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.execute(`SELECT * FROM events WHERE id = ?`, [id]);
    return rows[0];
  }

  static async update(id, event) {
    const { title, description, location, date, total_seats, available_seats, price, img } = event;
    const [result] = await db.execute(
      `UPDATE events SET title=?, description=?, location=?, date=?, total_seats=?, available_seats=?, price=?, img=? WHERE id=?`,
      [title, description, location, date, total_seats, available_seats, price, img, id]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await db.execute(`DELETE FROM events WHERE id = ?`, [id]);
    return result;
  }

  static async reduceSeats(id, quantity) {
    const [result] = await db.execute(
      `UPDATE events SET available_seats = available_seats - ? WHERE id=? AND available_seats >= ?`,
      [quantity, id, quantity]
    );
    return result;
  }
}

module.exports = Event;

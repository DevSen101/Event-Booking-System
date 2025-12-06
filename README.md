# 🎟️ Smart Event Booking System – Backend API

A full-stack ready **Event Booking System API** built with **Node.js, Express & MySQL**, featuring event management, real-time seat validation, and secure booking workflow.
This backend powers a modern multi-page React frontend with dynamic animations, admin dashboard, and real-time availability.

---

## 🚀 Features

### **👥 User Functionalities**

* Browse all upcoming events
* Search + filter by **date** and **location**
* View event details
* Check real-time seat availability
* Book tickets securely

### **🛠 Admin Functionalities**

* Create new events
* Update event details
* Delete events
* Monitor bookings
* Protected routes using **Admin Middleware**

### **⚡ Advanced Features**

* Real-time seat validation (prevents over-booking)
* Transaction-safe ticket booking
* Clean and modular architecture
* Production-ready folder structure

---

## 📁 Folder Structure

```
event-booking-backend/
│
├── src/
│   ├── config/          # Database connection
│   ├── models/          # Mongoose schemas
│   ├── controllers/     # API logic
│   ├── services/        # Business logic layer
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, admin, error handlers
│   ├── app.js           # Express app instance
│   └── server.js        # Server start file
│
├── .env
├── package.json
└── README.md


```

---

## 🗄️ Database Schema (MySQL)

### **events**

| Field           | Type         |
| --------------- | ------------ |
| id              | INT (PK, AI) |
| title           | VARCHAR      |
| description     | TEXT         |
| location        | VARCHAR      |
| date            | DATETIME     |
| total_seats     | INT          |
| available_seats | INT          |
| price           | DECIMAL      |
| img             | VARCHAR      |

### **bookings**

| Field        | Type                          |
| ------------ | ----------------------------- |
| id           | INT (PK, AI)                  |
| event_id     | INT (FK → events.id)          |
| name         | VARCHAR                       |
| email        | VARCHAR                       |
| mobile       | VARCHAR                       |
| quantity     | INT                           |
| total_amount | DECIMAL                       |
| booking_date | DATETIME                      |
| status       | ENUM('confirmed','cancelled') |

---

## 🔧 Setup Instructions

### **1️⃣ Clone Repository**

```sh
git clone https://github.com/DevSen101/Event-Booking-System
cd event-booking-backend
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Create `.env` File**

```
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=event_booking

ADMIN_SECRET=superadmin123
```

### **4️⃣ Import SQL Schema**

Import `event_booking.sql` into MySQL (via Workbench or CLI).

### **5️⃣ Start Server**

```sh
npm run dev
```

---

## 🔌 API Endpoints

# 📍 Events API

### ➤ **GET /events**

List all events (with optional search filters)

### ➤ **GET /events/:id**

Get event details by ID

### ➤ **POST /events** (Admin only)

Create new event

### ➤ **PUT /events/:id** (Admin only)

Update event information

### ➤ **DELETE /events/:id** (Admin only)

Delete event

---

# 🎫 Bookings API

### ➤ **POST /booking**

Create a booking

* Validates seat availability
* Uses MySQL transactions
* Updates remaining seats

Response:

```json
{
  "success": true,
  "message": "Booking confirmed",
  "bookingId": 21
}
```
---

## 🔐 Admin Authentication

Admin routes use a simple middleware that checks for an `x-admin-key` header:

```
x-admin: true
```

If the key matches your `.env`, access is granted.

---

## 🧪 Sample Booking Request

```
POST /api/bookings
Content-Type: application/json

{
  "event_id": 3,
  "name": "Dev Kumar",
  "email": "dev@example.com",
  "mobile": "9999999999",
  "quantity": 2
}
```

---

## 🛡 Tech Stack

* **Node.js**
* **Express.js**
* **MySQL**
* **Nodemon**
* **dotenv**
* **CORS**
* **MySQL2**

---

## 🏁 Future Enhancements

✔ Real-time seat locking via WebSocket
✔ Email Ticket with QR Code
✔ Payment Gateway Integration
✔ Redis Cache
✔ PWA Support for Mobile


---

## 🎉 Author

**Dev Kumar Sen**

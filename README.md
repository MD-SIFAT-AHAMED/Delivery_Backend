# Delivery Web App Backend

This is a **Delivery Management System backend** built using **Express.js** and **MySQL**.  
It is designed for managing **users, riders, and parcels** in a delivery service application.  
This project follows a clean folder structure with **Models, Controllers, and Routes** to maintain scalability and readability.

---

## 🧩 Project Structure

delivery-backend/
│
├── config/
│ └── db.js # MySQL database connection
│
├── controllers/
│ ├── userController.js # User logic
│ ├── riderController.js # Rider logic
│ └── parcelController.js # Parcel logic
│
├── routes/
│ ├── userRoutes.js # User API endpoints
│ ├── riderRoutes.js # Rider API endpoints
│ └── parcelRoutes.js # Parcel API endpoints
│
├── models/
│ └── parcelModel.js # Database queries / models
│
├── .env # Environment variables
├── package.json
├── server.js # Main Express server
└── README.md

const db = require("../config/db");

const Payment = {
  // Parcel payment_status update
  paymentUpdate: async (trackingId) =>
    db.query(
      `
        UPDATE parcels
        SET payment_status = "paid"
        WHERE trackingId = ?
    `,
      [trackingId]
    ),

  // Payment info save
  paymentInfo: async (trackingId, tran_id, val_id, amount, status, tran_date) =>
    db.query(
      `
        INSERT INTO payments (
        parcel_trackingId, 
        tran_id,
        val_id,
        amount,
        status,
        payment_date
        ) VALUES (?,?,?,?,?,?)
    `,
      [trackingId, tran_id, val_id, amount, status, tran_date]
    ),
};

module.exports = Payment;

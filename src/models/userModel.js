const db = require("../config/db");

const User = {
  // new user create
  create: async (name, email, address, role, is_active) =>
    await db.query(
      `
      INSERT INTO users
      (name,email,address,role,is_active)
      VALUES(?,?,?,?,?)`,
      [name, email, address, role, is_active]
    ),

  // One user search by email
  GetByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },

  // One user search by Id
  GetById: async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    console.log("Rows:", rows);
    return rows[0];
  },

  // parcel info post
  PostParcelInfo: async (
    title,
    type,
    weight,
    trackingId,
    cost,
    senderName,
    senderContact,
    senderRegion,
    senderCenter,
    senderAddress,
    pickupInstruction,
    receiverName,
    receiverContact,
    receiverRegion,
    receiverCenter,
    receiverAddress,
    deliveryInstruction,
    created_by,
    delivery_status,
    payment_status
  ) => {
    db.query(
      `
      INSERT INTO parcels
      ( trackingId,
      title,
      type,
      weight,
      cost,
      senderName,
      senderContact,
      senderRegion,
      senderCenter,
      senderAddress,
      pickupInstruction,
      receiverName,
      receiverContact,
      receiverRegion,
      receiverCenter,
      receiverAddress,
      deliveryInstruction,
      created_by,
      delivery_status,
      payment_status) VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        trackingId,
        title,
        type,
        weight,
        cost,
        senderName,
        senderContact,
        senderRegion,
        senderCenter,
        senderAddress,
        pickupInstruction,
        receiverName,
        receiverContact,
        receiverRegion,
        receiverCenter,
        receiverAddress,
        deliveryInstruction,
        created_by,
        delivery_status,
        payment_status,
      ]
    );
  },
  // one user delete
  deleteById: (id) => db.query("DELETE FROM users WHERE id = ?", [id]),
};

module.exports = User;

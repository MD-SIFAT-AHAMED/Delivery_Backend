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
    return rows[0];
  },

  // parcel info post
  PostParcelInfo: async (
    type,
    title,
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
    weight,
    cost,
    delivery_status,
    payment_status,
    created_by,
    trackingId
  ) => {
    await db.query(
      `
      INSERT INTO parcels
      ( type,
      title,
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
      weight,
      cost,
      delivery_status,
      payment_status,
      created_by,
      trackingId) VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        type,
        title,
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
        weight,
        cost,
        delivery_status,
        payment_status,
        created_by,
        trackingId,
      ]
    );
  },
  // one user delete
  deleteById: (id) => db.query("DELETE FROM users WHERE id = ?", [id]),
};

module.exports = User;

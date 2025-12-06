const db = require("../config/db");

const User = {
  // new user create
  create: async (name, lowerCaseEmail, address, role, is_active) =>
    await db.query(
      `
      INSERT INTO users
      (name,email,address,role,is_active)
      VALUES(?,?,?,?,?)`,
      [name, lowerCaseEmail, address, role, is_active]
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
  // Get My parcel
  getMyParcel: async (email) => {
    const [row] = await db.query(
      `
      SELECT trackingId,
      title,
      type,
      weight,
      cost,

      senderName,
      senderContact,
      senderRegion,
      senderCenter,
      senderAddress,

      receiverName,
      receiverContact,
      receiverRegion,
      receiverCenter,
      receiverAddress,

      pickupInstruction,
      deliveryInstruction,

      delivery_status,
      payment_status,
      created_at,
      updated_at
      FROM parcels
      WHERE created_by = ?
      `,
      [email]
    );
    return row;
  },
  // one user delete
  deleteById: (id) => db.query("DELETE FROM users WHERE id = ?", [id]),
};

module.exports = User;

const generateTransId = () => {
  const prefix = "TID";

  const timestamp = new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 12);

  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();

  return `${prefix}-${timestamp}-${randomStr}`;
};

module.exports = generateTransId;


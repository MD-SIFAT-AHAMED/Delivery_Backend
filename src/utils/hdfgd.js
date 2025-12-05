const GenerateTrackingId = () => {
  const prefix = "TRK";
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 12); // e.g., 202506301925
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase(); // e.g., A3F9Z
  return `${prefix}-${timestamp}-${randomStr}`;
};
module.exports = GenerateTrackingId;

GenerateTrackingId.js
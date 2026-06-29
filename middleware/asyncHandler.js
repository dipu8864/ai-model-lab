// Wraps an async route handler so rejected promises reach Express error middleware
// instead of being swallowed, removing the per-handler try/catch boilerplate.
module.exports = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

// Centralized error responder. Handlers throw HttpError (or any Error) and this
// turns it into a consistent JSON envelope.
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function notFound(req, res) {
  res.status(404).json({ success: false, message: "Not found" });
}

// eslint-disable-next-line no-unused-vars -- Express identifies error handlers by arity (4 args).
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  if (status >= 500) {
    console.error(err);
  }
  res.status(status).json({ success: false, message: err.message });
}

module.exports = { HttpError, notFound, errorHandler };

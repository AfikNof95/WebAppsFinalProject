const errorHandler = (ex, req, res, next) => {
  let errorMessages = [];
  if (ex.errors) {
    for (let [key, error] of Object.entries(ex.errors)) {
      const errorMessage = error.properties ? error.properties.message : error.message;

      errorMessages.push(errorMessage);
      console.error(errorMessage);
      console.log(error.stack);
    }
    return res.status(400).json({ errors: errorMessages });
  } else {
    console.error(ex.message);
    return res.status(400).json({ errors: [ex.message] });
  }
};

module.exports = errorHandler;

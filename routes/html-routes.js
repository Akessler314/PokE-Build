module.exports = function(app) {
  app.get("/placeholder", (req, res) => {
    res.end();
  });
};

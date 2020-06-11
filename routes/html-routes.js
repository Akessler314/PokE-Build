module.exports = function(app) {
  app.get('/placeholder', (req, res) => {
    res.end();
  });

  app.get('/', (req, res) => {
    res.render('index');
  });
};

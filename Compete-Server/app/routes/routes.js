
//module.exports = function(app, passport){

//module.exports = function(app, passport){ TODO add passport

module.exports = function(app){

  // Connect api routes
  var competitorAPI = require('../api/competitorAPI');
  var adminAPI      = require('../api/adminAPI');

  var userController = require('../controllers/userCtrl.js');

  app.use('/api/competitor', competitorAPI);
  app.use('/api/admin', adminAPI);

  app.post('/api/authenticate', userController.authenticate);
}

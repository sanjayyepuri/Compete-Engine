module.exports = function (app) {
  var userController = require('../controllers/userCtrl.js');
  var compController = require('../controllers/competitorCtrl');

  var competitorAPI = require('../api/competitorAPI');
  var adminAPI = require('../api/adminAPI');
  app.use('/api/competitor', competitorAPI);
  app.use('/api/admin', adminAPI);

  //Public routes
  app.post('/api/authenticate', userController.authenticate);
  app.post('/api/signup', compController.createCompetitor);
}

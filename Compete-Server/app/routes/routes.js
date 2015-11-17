module.exports = function(app){
  var userController = require('../controllers/userCtrl.js');

  // Connect Admin and Competitor APIs TODO make protected
  var competitorAPI = require('../api/competitorAPI');
  var adminAPI      = require('../api/adminAPI');
  app.use('/api/competitor', competitorAPI);
  app.use('/api/admin', adminAPI);

  //create public authentication
  app.post('/api/authenticate', userController.authenticate);
}

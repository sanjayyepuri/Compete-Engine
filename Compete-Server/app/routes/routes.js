//module.exports = function(app, passport){ TODO add passport
module.exports = function(app){

  // Connect api routes
  var competitorAPI = require('../api/competitorAPI');
  var adminAPI      = require('../api/adminAPI');

  //app.use('/api/competitor', competitorAPI);

  app.use('/api/admin', adminAPI);

  app.get('/', function(req, res){
    res.sendfile('././public/index.html');
  });
}

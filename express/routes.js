var index = require('./controllers/indexController.js')
    // ,drug = require('./controllers/drug.js')
    // ,information = require('./controllers/information.js')
    // ,appintro = require('./controllers/introduction.js');

module.exports = function(app) {

  // 首页路由，药品路由，资讯路由
  index.RoutesControl(app);
  // drug.RoutesControl(app);
  // information.RoutesControl(app);
  // appintro.RoutesControl(app);
};

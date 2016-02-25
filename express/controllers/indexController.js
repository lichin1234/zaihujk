var Index = require('../models/index.js');
    // ,indexView = require('../views/')

module.exports = {
  RoutesControl: function(app) {
    app.get('/', this.show);
  },

  show: function(req, res, next) {
    res.render('index', Index.getHotKeyword());
  },
}

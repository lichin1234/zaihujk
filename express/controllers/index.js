var Index = require('../models/index.js');
    // ,indexView = require('../views/')

module.exports = {
  RoutesControl: function(app) {
    app.get('/', this.show);
  },

  show: function(req, res, next) {
    Index.getHotKeyword(function(err, keywordArr) {
      if(err) return next(err);
      if(!keywordArr) return next();
      res.render('index', keywordArr);
    });
  },
}

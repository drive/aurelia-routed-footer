'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.configure = configure;

var _aureliaRouter = require('aurelia-router');

function configure(aurelia) {
  _aureliaRouter.Router.prototype.footer = null;
  _aureliaRouter.Router.prototype.registerFooter = function (footer) {
    this.footer = footer;
  };
  _aureliaRouter.Router.prototype.setFooter = function (footerModule) {
    this.footer.setFooter(footerModule);
  };

  var filters = aurelia.container.get(RouteFilterContainer);
  filters.addStep('precommit', UpdateFooterStep);

  aurelia.globalResources(['footerview']);
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _aureliaRouter = require('aurelia-router');

var _updatefooterstep = require('./updatefooterstep');

function configure(aurelia) {
  _aureliaRouter.Router.prototype.footer = null;
  _aureliaRouter.Router.prototype.registerFooterViewPort = function (footer) {
    this.footer = footer;
  };
  _aureliaRouter.Router.prototype.setFooter = function (footerModule) {
    this.footer.setFooter(footerModule);
  };

  var filters = aurelia.container.get(_aureliaRouter.PipelineProvider);
  filters.addStep('precommit', _updatefooterstep.UpdateFooterStep);

  aurelia.globalResources(['footerview']);
}
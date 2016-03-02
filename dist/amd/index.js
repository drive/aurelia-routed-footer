define(['exports', 'aurelia-router', './updatefooterstep'], function (exports, _aureliaRouter, _updatefooterstep) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.configure = configure;

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
});
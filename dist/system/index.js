System.register(['aurelia-router', './updatefooterstep'], function (_export) {
  'use strict';

  var Router, PipelineProvider, UpdateFooterStep;

  _export('configure', configure);

  function configure(aurelia) {
    Router.prototype.footer = null;
    Router.prototype.registerFooterViewPort = function (footer) {
      this.footer = footer;
    };
    Router.prototype.setFooter = function (footerModule) {
      this.footer.setFooter(footerModule);
    };

    var filters = aurelia.container.get(PipelineProvider);
    filters.addStep('precommit', UpdateFooterStep);

    aurelia.globalResources(['footerview']);
  }

  return {
    setters: [function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
      PipelineProvider = _aureliaRouter.PipelineProvider;
    }, function (_updatefooterstep) {
      UpdateFooterStep = _updatefooterstep.UpdateFooterStep;
    }],
    execute: function () {}
  };
});
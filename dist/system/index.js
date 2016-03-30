'use strict';

System.register(['aurelia-router', './updatefooterstep'], function (_export, _context) {
  var Router, PipelineProvider, UpdateFooterStep;
  return {
    setters: [function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
      PipelineProvider = _aureliaRouter.PipelineProvider;
    }, function (_updatefooterstep) {
      UpdateFooterStep = _updatefooterstep.UpdateFooterStep;
    }],
    execute: function () {
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

      _export('configure', configure);
    }
  };
});
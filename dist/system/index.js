System.register(['aurelia-router', './updatefooterstep'], function (_export) {
  'use strict';

  var Router, RouteFilterContainer, UpdateFooterStep;

  _export('configure', configure);

  function configure(aurelia) {
    Router.prototype.footer = null;
    Router.prototype.registerFooterViewPort = function (footer) {
      this.footer = footer;
    };
    Router.prototype.setFooter = function (footerModule) {
      this.footer.setFooter(footerModule);
    };

    var filters = aurelia.container.get(RouteFilterContainer);
    filters.addStep('precommit', UpdateFooterStep);

    aurelia.globalResources(['footerview']);
  }

  return {
    setters: [function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
      RouteFilterContainer = _aureliaRouter.RouteFilterContainer;
    }, function (_updatefooterstep) {
      UpdateFooterStep = _updatefooterstep.UpdateFooterStep;
    }],
    execute: function () {}
  };
});
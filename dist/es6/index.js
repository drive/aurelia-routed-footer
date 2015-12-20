import {Router} from 'aurelia-router';

export function configure(aurelia) {
  Router.prototype.footer = null;
  Router.prototype.registerFooter = function(footer) {
    this.footer = footer;
  };
  Router.prototype.setFooter = function(footerModule) {
    this.footer.setFooter(footerModule);
  };

  let filters = aurelia.container.get(RouteFilterContainer);
  filters.addStep('precommit', UpdateFooterStep);

  aurelia.globalResources(['footerview']);
}

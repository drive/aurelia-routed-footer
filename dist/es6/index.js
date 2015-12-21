import {Router, RouteFilterContainer} from 'aurelia-router';
import {UpdateFooterStep} from './updatefooterstep';

export function configure(aurelia) {
  Router.prototype.footer = null;
  Router.prototype.registerFooterViewPort = function(footer) {
    this.footer = footer;
  };
  Router.prototype.setFooter = function(footerModule) {
    this.footer.setFooter(footerModule);
  };

  let filters = aurelia.container.get(RouteFilterContainer);
  filters.addStep('precommit', UpdateFooterStep);

  aurelia.globalResources(['footerview']);
}

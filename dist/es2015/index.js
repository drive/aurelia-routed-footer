import { Router, PipelineProvider } from 'aurelia-router';
import { UpdateFooterStep } from './updatefooterstep';

export function configure(aurelia) {
  Router.prototype.footer = null;
  Router.prototype.registerFooterViewPort = function (footer) {
    this.footer = footer;
  };
  Router.prototype.setFooter = function (footerContext) {
    this.footer.setFooter(footerContext);
  };

  let filters = aurelia.container.get(PipelineProvider);
  filters.addStep('precommit', UpdateFooterStep);

  aurelia.globalResources(['./footerview']);
}
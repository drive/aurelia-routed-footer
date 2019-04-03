import { PipelineProvider, Router } from "aurelia-router";
import { FooterView } from "./footer-view";
import { UpdateFooterStep } from "./update-footer-step";
export function configure(config) {
    Router.prototype.footer = null;
    Router.prototype.registerFooterViewPort = function (footer) {
        this.footer = footer;
    };
    Router.prototype.setFooter = function (footerContext) {
        this.footer.setFooter(footerContext);
    };
    var filters = config.container.get(PipelineProvider);
    filters.addStep("precommit", UpdateFooterStep);
    config.globalResources([FooterView]);
}

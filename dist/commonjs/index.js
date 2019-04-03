"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_router_1 = require("aurelia-router");
var footer_view_1 = require("./footer-view");
var update_footer_step_1 = require("./update-footer-step");
function configure(config) {
    aurelia_router_1.Router.prototype.footer = null;
    aurelia_router_1.Router.prototype.registerFooterViewPort = function (footer) {
        this.footer = footer;
    };
    aurelia_router_1.Router.prototype.setFooter = function (footerContext) {
        this.footer.setFooter(footerContext);
    };
    var filters = config.container.get(aurelia_router_1.PipelineProvider);
    filters.addStep("precommit", update_footer_step_1.UpdateFooterStep);
    config.globalResources([footer_view_1.FooterView]);
}
exports.configure = configure;

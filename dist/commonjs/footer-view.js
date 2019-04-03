"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_router_1 = require("aurelia-router");
var aurelia_task_queue_1 = require("aurelia-task-queue");
var aurelia_templating_1 = require("aurelia-templating");
var FooterView = (function () {
    function FooterView(element, container, compositionEngine, viewSlot, viewResources, _taskQueue, _router) {
        this.element = element;
        this.container = container;
        this.compositionEngine = compositionEngine;
        this.viewSlot = viewSlot;
        this.viewResources = viewResources;
        this._taskQueue = _taskQueue;
        this._router = _router;
        this._defaultInstruction = null;
        this.defaultView = null;
        this.defaultModule = null;
        this.currentInstruction = null;
        this.currentController = null;
        this.currentViewModel = null;
        this.bindingContext = null;
        this.overrideContext = null;
        this._router.registerFooterViewPort(this);
    }
    FooterView.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        if (this.defaultModule) {
            this._defaultInstruction = {
                viewModel: this.defaultModule,
            };
        }
        else if (this.defaultView) {
            this._defaultInstruction = {
                view: this.defaultView,
            };
        }
        else {
            throw new Error("default module or default view must be supplied");
        }
    };
    FooterView.prototype.setFooter = function (footerContext) {
        var _this = this;
        var instructionBase = this._defaultInstruction;
        if (footerContext) {
            instructionBase = {
                viewModel: footerContext.footerModule,
                model: footerContext.activationParam,
            };
        }
        if (!instructionBase)
            return;
        var instruction = createInstruction(this, instructionBase);
        if (this.currentInstruction) {
            this.currentInstruction = instruction;
            return;
        }
        this.currentInstruction = instruction;
        this._taskQueue.queueMicroTask(function () { return processInstruction(_this, _this.currentInstruction); });
    };
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneTime }),
        __metadata("design:type", Object)
    ], FooterView.prototype, "defaultView", void 0);
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneTime }),
        __metadata("design:type", Object)
    ], FooterView.prototype, "defaultModule", void 0);
    FooterView = __decorate([
        aurelia_templating_1.customElement("footer-view"),
        aurelia_templating_1.noView,
        aurelia_dependency_injection_1.inject(Element, aurelia_dependency_injection_1.Container, aurelia_templating_1.CompositionEngine, aurelia_templating_1.ViewSlot, aurelia_templating_1.ViewResources, aurelia_task_queue_1.TaskQueue, aurelia_router_1.Router),
        __metadata("design:paramtypes", [Element,
            aurelia_dependency_injection_1.Container,
            aurelia_templating_1.CompositionEngine,
            aurelia_templating_1.ViewSlot,
            aurelia_templating_1.ViewResources,
            aurelia_task_queue_1.TaskQueue,
            aurelia_router_1.Router])
    ], FooterView);
    return FooterView;
}());
exports.FooterView = FooterView;
function createInstruction(composer, instruction) {
    return Object.assign(instruction, {
        bindingContext: composer.bindingContext,
        overrideContext: composer.overrideContext,
        container: composer.container,
        viewSlot: composer.viewSlot,
        viewResources: composer.viewResources,
        currentController: composer.currentController,
        host: composer.element,
    });
}
function processInstruction(composer, instruction) {
    composer.currentInstruction = null;
    composer.compositionEngine.compose(instruction).then(function (controller) {
        composer.currentController = controller;
        composer.currentViewModel = controller ? controller.viewModel : null;
    });
}

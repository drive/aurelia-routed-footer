var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { bindingMode } from "aurelia-binding";
import { inject, Container } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { TaskQueue } from "aurelia-task-queue";
import { bindable, customElement, noView, CompositionEngine, ViewResources, ViewSlot } from "aurelia-templating";
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
        bindable({ defaultBindingMode: bindingMode.oneTime }),
        __metadata("design:type", Object)
    ], FooterView.prototype, "defaultView", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.oneTime }),
        __metadata("design:type", Object)
    ], FooterView.prototype, "defaultModule", void 0);
    FooterView = __decorate([
        customElement("footer-view"),
        noView,
        inject(Element, Container, CompositionEngine, ViewSlot, ViewResources, TaskQueue, Router),
        __metadata("design:paramtypes", [Element,
            Container,
            CompositionEngine,
            ViewSlot,
            ViewResources,
            TaskQueue,
            Router])
    ], FooterView);
    return FooterView;
}());
export { FooterView };
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

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FooterView = undefined;

var _dec, _dec2, _dec3, _dec4, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTaskQueue = require('aurelia-task-queue');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaBinding = require('aurelia-binding');

var _aureliaRouter = require('aurelia-router');

var _aureliaPal = require('aurelia-pal');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FooterView = exports.FooterView = (_dec = (0, _aureliaTemplating.customElement)('footer-view'), _dec2 = (0, _aureliaTemplating.bindable)({
  name: 'defaultView',
  attribute: 'default-view',
  defaultBindingMode: _aureliaBinding.bindingMode.oneTime
}), _dec3 = (0, _aureliaTemplating.bindable)({
  name: 'defaultModule',
  attribute: 'default-module',
  defaultBindingMode: _aureliaBinding.bindingMode.oneTime
}), _dec4 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewResources, _aureliaTaskQueue.TaskQueue, _aureliaRouter.Router), _dec(_class = _dec2(_class = _dec3(_class = (0, _aureliaTemplating.noView)(_class = _dec4(_class = function () {
  function FooterView(element, container, compositionEngine, viewSlot, viewResources, taskQueue, router) {
    _classCallCheck(this, FooterView);

    this.element = element;
    this.container = container;
    this.compositionEngine = compositionEngine;
    this.viewSlot = viewSlot;
    this.viewResources = viewResources;
    this.taskQueue = taskQueue;
    this.currentController = null;
    this.currentViewModel = null;

    router.registerFooterViewPort(this);
  }

  FooterView.prototype.bind = function bind() {
    if (this.defaultModule) {
      this.defaultInstruction = {
        viewModel: this.defaultModule
      };
    } else if (this.defaultView) {
      this.defaultInstruction = {
        view: this.defaultView
      };
    } else {
      throw new Error("default module or default view must be supplied");
    }
  };

  FooterView.prototype.setFooter = function setFooter(footer) {
    var _this = this;

    var instructionBase = this.defaultInstruction;
    if (footer) {
      instructionBase = {
        viewModel: footer
      };
    }

    var instruction = createInstruction(this, instructionBase);

    if (this.currentInstruction) {
      this.currentInstruction = instruction;
      return;
    }

    this.currentInstruction = instruction;
    this.taskQueue.queueMicroTask(function () {
      return processInstruction(_this, _this.currentInstruction);
    });
  };

  return FooterView;
}()) || _class) || _class) || _class) || _class) || _class);


function createInstruction(composer, instruction) {
  return Object.assign(instruction, {
    bindingContext: composer.bindingContext,
    overrideContext: composer.overrideContext,
    container: composer.container,
    viewSlot: composer.viewSlot,
    viewResources: composer.viewResources,
    currentController: composer.currentController,
    host: composer.element
  });
}

function processInstruction(composer, instruction) {
  composer.currentInstruction = null;
  composer.compositionEngine.compose(instruction).then(function (controller) {
    composer.currentController = controller;
    composer.currentViewModel = controller ? controller.viewModel : null;
  });
}
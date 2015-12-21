define(['exports', 'aurelia-dependency-injection', 'aurelia-task-queue', 'aurelia-templating', 'aurelia-binding', 'aurelia-router', 'aurelia-pal'], function (exports, _aureliaDependencyInjection, _aureliaTaskQueue, _aureliaTemplating, _aureliaBinding, _aureliaRouter, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var FooterView = (function () {
    function FooterView(element, container, compositionEngine, viewSlot, viewResources, taskQueue, router) {
      _classCallCheck(this, _FooterView);

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

    _createClass(FooterView, [{
      key: 'bind',
      value: function bind() {
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
      }
    }, {
      key: 'setFooter',
      value: function setFooter(footer) {
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
      }
    }]);

    var _FooterView = FooterView;
    FooterView = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewResources, _aureliaTaskQueue.TaskQueue, _aureliaRouter.Router)(FooterView) || FooterView;
    FooterView = (0, _aureliaTemplating.noView)(FooterView) || FooterView;
    FooterView = (0, _aureliaTemplating.bindable)({
      name: 'defaultModule',
      attribute: 'default-module',
      defaultBindingMode: _aureliaBinding.bindingMode.oneTime
    })(FooterView) || FooterView;
    FooterView = (0, _aureliaTemplating.bindable)({
      name: 'defaultView',
      attribute: 'default-view',
      defaultBindingMode: _aureliaBinding.bindingMode.oneTime
    })(FooterView) || FooterView;
    FooterView = (0, _aureliaTemplating.customElement)('footer-view')(FooterView) || FooterView;
    return FooterView;
  })();

  exports.FooterView = FooterView;

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
});
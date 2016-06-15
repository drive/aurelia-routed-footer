'use strict';

System.register(['aurelia-dependency-injection', 'aurelia-task-queue', 'aurelia-templating', 'aurelia-binding', 'aurelia-router', 'aurelia-pal'], function (_export, _context) {
  "use strict";

  var Container, inject, TaskQueue, CompositionEngine, ViewSlot, ViewResources, customElement, bindable, noView, bindingMode, Router, DOM, _dec, _dec2, _dec3, _dec4, _class, FooterView;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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
  return {
    setters: [function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaTaskQueue) {
      TaskQueue = _aureliaTaskQueue.TaskQueue;
    }, function (_aureliaTemplating) {
      CompositionEngine = _aureliaTemplating.CompositionEngine;
      ViewSlot = _aureliaTemplating.ViewSlot;
      ViewResources = _aureliaTemplating.ViewResources;
      customElement = _aureliaTemplating.customElement;
      bindable = _aureliaTemplating.bindable;
      noView = _aureliaTemplating.noView;
    }, function (_aureliaBinding) {
      bindingMode = _aureliaBinding.bindingMode;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }],
    execute: function () {
      _export('FooterView', FooterView = (_dec = customElement('footer-view'), _dec2 = bindable({
        name: 'defaultView',
        attribute: 'default-view',
        defaultBindingMode: bindingMode.oneTime
      }), _dec3 = bindable({
        name: 'defaultModule',
        attribute: 'default-module',
        defaultBindingMode: bindingMode.oneTime
      }), _dec4 = inject(DOM.Element, Container, CompositionEngine, ViewSlot, ViewResources, TaskQueue, Router), _dec(_class = _dec2(_class = _dec3(_class = noView(_class = _dec4(_class = function () {
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
      }()) || _class) || _class) || _class) || _class) || _class));

      _export('FooterView', FooterView);
    }
  };
});
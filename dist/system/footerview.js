System.register(['aurelia-dependency-injection', 'aurelia-task-queue', 'aurelia-templating', 'aurelia-binding', 'aurelia-router', 'aurelia-pal'], function (_export) {
  'use strict';

  var Container, inject, TaskQueue, CompositionEngine, ViewSlot, ViewResources, customElement, bindable, noView, bindingMode, Router, DOM, FooterView;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
      FooterView = (function () {
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

          router.registerFooter(this);
        }

        _createClass(FooterView, [{
          key: 'bind',
          value: function bind(bindingContext, overrideContext) {
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
        FooterView = inject(DOM.Element, Container, CompositionEngine, ViewSlot, ViewResources, TaskQueue, Router)(FooterView) || FooterView;
        FooterView = noView(FooterView) || FooterView;
        FooterView = bindable({
          name: 'defaultModule',
          attribute: 'default-module',
          defaultBindingMode: bindingMode.oneTime
        })(FooterView) || FooterView;
        FooterView = bindable({
          name: 'defaultView',
          attribute: 'default-view',
          defaultBindingMode: bindingMode.oneTime
        })(FooterView) || FooterView;
        FooterView = customElement('footer-view')(FooterView) || FooterView;
        return FooterView;
      })();

      _export('FooterView', FooterView);
    }
  };
});
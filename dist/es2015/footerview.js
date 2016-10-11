var _dec, _dec2, _dec3, _dec4, _class;

import { Container, inject } from 'aurelia-dependency-injection';
import { TaskQueue } from 'aurelia-task-queue';
import { CompositionEngine, ViewSlot, ViewResources, customElement, bindable, noView } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';
import { Router } from 'aurelia-router';
import { DOM } from 'aurelia-pal';

export let FooterView = (_dec = customElement('footer-view'), _dec2 = bindable({
  name: 'defaultView',
  attribute: 'default-view',
  defaultBindingMode: bindingMode.oneTime
}), _dec3 = bindable({
  name: 'defaultModule',
  attribute: 'default-module',
  defaultBindingMode: bindingMode.oneTime
}), _dec4 = inject(DOM.Element, Container, CompositionEngine, ViewSlot, ViewResources, TaskQueue, Router), _dec(_class = _dec2(_class = _dec3(_class = noView(_class = _dec4(_class = class FooterView {

  constructor(element, container, compositionEngine, viewSlot, viewResources, taskQueue, router) {
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

  bind() {
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

  setFooter(footerContext) {
    let instructionBase = this.defaultInstruction;
    if (footerContext) {
      instructionBase = {
        viewModel: footerContext.footerModule,
        model: footerContext.activationParam
      };
    }

    let instruction = createInstruction(this, instructionBase);

    if (this.currentInstruction) {
      this.currentInstruction = instruction;
      return;
    }

    this.currentInstruction = instruction;
    this.taskQueue.queueMicroTask(() => processInstruction(this, this.currentInstruction));
  }
}) || _class) || _class) || _class) || _class) || _class);

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
  composer.compositionEngine.compose(instruction).then(controller => {
    composer.currentController = controller;
    composer.currentViewModel = controller ? controller.viewModel : null;
  });
}
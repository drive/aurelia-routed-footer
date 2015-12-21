import {Container, inject} from 'aurelia-dependency-injection';
import {TaskQueue} from 'aurelia-task-queue';
import {CompositionEngine, ViewSlot, ViewResources, customElement, bindable, noView} from 'aurelia-templating';
import {bindingMode} from 'aurelia-binding';
import {Router} from 'aurelia-router';
import {DOM} from 'aurelia-pal';

@customElement('footer-view')
@bindable({
  name:'defaultView',
  attribute:'default-view',
  defaultBindingMode: bindingMode.oneTime  
})
@bindable({
  name:'defaultModule',
  attribute:'default-module',
  defaultBindingMode: bindingMode.oneTime  
})
@noView
@inject(DOM.Element, Container, CompositionEngine, ViewSlot, ViewResources, TaskQueue, Router)
export class FooterView {
  

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
    if(this.defaultModule) {
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

  setFooter(footer) {
    let instructionBase = this.defaultInstruction;
    if(footer) {
      instructionBase = {
        viewModel: footer
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
  composer.compositionEngine.compose(instruction).then(controller => {
    composer.currentController = controller;
    composer.currentViewModel = controller ? controller.viewModel : null;
  });
}
import { bindingMode } from "aurelia-binding";
import { inject, Container } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { TaskQueue } from "aurelia-task-queue";
import { bindable, customElement, noView, CompositionEngine, Controller, ViewResources, ViewSlot } from "aurelia-templating";

@customElement("footer-view")
@noView
@inject(Element, Container, CompositionEngine, ViewSlot, ViewResources, TaskQueue, Router)
export class FooterView {
  private _defaultInstruction = null;

  @bindable({ defaultBindingMode: bindingMode.oneTime }) defaultView = null;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) defaultModule = null;

  currentInstruction = null;
  currentController = null;
  currentViewModel = null;
  bindingContext = null;
  overrideContext = null;

  constructor(
    public element: Element,
    public container: Container,
    public compositionEngine: CompositionEngine,
    public viewSlot: ViewSlot,
    public viewResources: ViewResources,
    private _taskQueue: TaskQueue,
    private _router: Router) {
    this._router.registerFooterViewPort(this);
  }

  bind(
    bindingContext: any,
    overrideContext: any) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    if (this.defaultModule) {
      this._defaultInstruction = {
        viewModel: this.defaultModule,
      };
    } else if (this.defaultView) {
      this._defaultInstruction = {
        view: this.defaultView,
      };
    } else {
      throw new Error("default module or default view must be supplied");
    }
  }

  setFooter(footerContext) {
    let instructionBase = this._defaultInstruction;
    if (footerContext) {
      instructionBase = {
        viewModel: footerContext.footerModule,
        model: footerContext.activationParam,
      };
    }

    if (!instructionBase) return; // if bind hasn't run yet we don't have a default instruction

    let instruction = createInstruction(this, instructionBase);

    if (this.currentInstruction) {
      this.currentInstruction = instruction;
      return;
    }

    this.currentInstruction = instruction;
    this._taskQueue.queueMicroTask(() => processInstruction(this, this.currentInstruction));
  }
}

function createInstruction(
  composer: FooterView,
  instruction) {
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

function processInstruction(
  composer: FooterView,
  instruction) {
  composer.currentInstruction = null;
  composer.compositionEngine.compose(instruction).then((controller) => {
    composer.currentController = controller;
    composer.currentViewModel = controller ? (<Controller>controller).viewModel : null;
  });
}
System.config({
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "*": "*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*",
    "aurelia-widgets/*": "dist/system/*"
  },

  map: {
    "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.2.0.5",
    "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.2.1.0",
    "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.2.0.0",
    "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.3.0",
    "aurelia-router": "npm:aurelia-router@1.0.0-beta.2.0.0",
    "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.2.0.0",
    "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.3.0.2",
    "npm:aurelia-binding@1.0.0-beta.2.0.5": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.2.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.2.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.3.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.2.0.0"
    },
    "npm:aurelia-dependency-injection@1.0.0-beta.2.1.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.2.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.3.0"
    },
    "npm:aurelia-event-aggregator@1.0.0-beta.2.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.2.0.0"
    },
    "npm:aurelia-loader@1.0.0-beta.2.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.2.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.2.0.0"
    },
    "npm:aurelia-metadata@1.0.0-beta.2.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.3.0"
    },
    "npm:aurelia-route-recognizer@1.0.0-beta.2.0.0": {
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.2.0.0"
    },
    "npm:aurelia-router@1.0.0-beta.2.0.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.2.1.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.2.0.0",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.2.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.2.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.2.0.0",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-beta.2.0.0"
    },
    "npm:aurelia-task-queue@1.0.0-beta.2.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.3.0"
    },
    "npm:aurelia-templating@1.0.0-beta.3.0.2": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.2.0.5",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.2.1.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.2.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.2.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.2.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.3.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.2.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.2.0.0"
    }
  }
});

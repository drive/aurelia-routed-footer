"use strict";

System.register([], function (_export, _context) {
  var UpdateFooterStep;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _findFooterModules(instruction) {
    var footers = [];
    footers.push(instruction.config.footer);
    var childInstruction = instruction.plan.default.childNavigationInstruction;
    while (childInstruction) {
      footers.push(childInstruction.config.footer);
      childInstruction = childInstruction.plan.default.childNavigationInstruction;
    }

    return footers;
  }

  function _findFooter(footers) {
    var footer = footers.pop();
    while (!footer && footers.length > 0) {
      footer = footers.pop();
    }
    return footer;
  }
  return {
    setters: [],
    execute: function () {
      _export("UpdateFooterStep", UpdateFooterStep = function () {
        function UpdateFooterStep() {
          _classCallCheck(this, UpdateFooterStep);
        }

        UpdateFooterStep.prototype.run = function run(instruction, next) {
          var footers = _findFooterModules(instruction);
          var footer = _findFooter(footers);

          instruction.router.setFooter(footer);

          return next();
        };

        return UpdateFooterStep;
      }());

      _export("UpdateFooterStep", UpdateFooterStep);
    }
  };
});
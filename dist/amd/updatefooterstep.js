define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var UpdateFooterStep = (function () {
    function UpdateFooterStep() {
      _classCallCheck(this, UpdateFooterStep);
    }

    _createClass(UpdateFooterStep, [{
      key: "run",
      value: function run(instruction, next) {
        var footers = _findFooterModules(instruction);
        var footer = _findFooter(footers);

        instruction.router.setFooter(footer);

        return next();
      }
    }]);

    return UpdateFooterStep;
  })();

  exports.UpdateFooterStep = UpdateFooterStep;

  function _findFooterModules(instruction) {
    var footers = [];
    footers.push(instruction.config.footer);
    var childInstruction = instruction.plan["default"].childNavigationInstruction;
    while (childInstruction) {
      footers.push(childInstruction.config.footer);
      childInstruction = childInstruction.plan["default"].childNavigationInstruction;
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
});
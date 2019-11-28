var UpdateFooterStep = (function () {
    function UpdateFooterStep() {
    }
    UpdateFooterStep.prototype.run = function (instruction, next) {
        var footers = _findFooterModules(instruction);
        var footer = _findFooter(footers);
        instruction.router.setFooter(footer);
        return next();
    };
    return UpdateFooterStep;
}());
export { UpdateFooterStep };
function _findFooterModules(instruction) {
    var footers = [];
    footers.push(instruction.config.footer);
    var childInstruction = instruction.plan.default ? instruction.plan.default.childNavigationInstruction : null;
    while (childInstruction) {
        var footerModule = childInstruction.config.footer;
        if (footerModule) {
            var activationParam = childInstruction.params;
            footers.push({
                footerModule: footerModule,
                activationParam: activationParam,
            });
        }
        childInstruction = childInstruction.plan.default ? childInstruction.plan.default.childNavigationInstruction : null;
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

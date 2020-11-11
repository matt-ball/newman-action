"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (det, rec, confidence, name, lang) => ({
    confidence,
    name: name || rec.name(det),
    lang,
});
//# sourceMappingURL=match.js.map
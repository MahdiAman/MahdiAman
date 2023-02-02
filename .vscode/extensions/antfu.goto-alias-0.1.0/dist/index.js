var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
var import_vscode = require("vscode");
var CLOSE_DTS_TAB = false;
function activate() {
  let triggerDoc;
  let lastDoc;
  import_vscode.languages.registerDefinitionProvider([
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact",
    "vue"
  ], {
    provideDefinition(document) {
      triggerDoc = document;
      return null;
    }
  });
  import_vscode.window.onDidChangeActiveTextEditor(async (e) => {
    var _a;
    if (!e || !e.document)
      return;
    const fn = async () => {
      if (!e.selection.isSingleLine)
        return;
      if (!triggerDoc || triggerDoc !== lastDoc)
        return;
      const path = e.document.uri.fsPath;
      if (!path.endsWith(".d.ts"))
        return;
      await Promise.resolve();
      const line = e.document.lineAt(e.selection.anchor.line);
      const text = line.text;
      const regex = /:\s+typeof import\(.*?\)/;
      const match = text.match(regex);
      if (!match)
        return;
      e.selection = new import_vscode.Selection(new import_vscode.Position(e.selection.anchor.line, match.index + match[0].length), new import_vscode.Position(e.selection.anchor.line, match.index + match[0].length + 1));
      const tab = import_vscode.window.tabGroups.activeTabGroup.activeTab;
      triggerDoc = void 0;
      await import_vscode.commands.executeCommand("editor.action.goToDeclaration");
      if (CLOSE_DTS_TAB && tab && tab !== import_vscode.window.tabGroups.activeTabGroup.activeTab)
        await import_vscode.window.tabGroups.close(tab);
    };
    await fn();
    await Promise.resolve();
    lastDoc = (_a = import_vscode.window.activeTextEditor) == null ? void 0 : _a.document;
  });
  setTimeout(() => {
    var _a;
    lastDoc = (_a = import_vscode.window.activeTextEditor) == null ? void 0 : _a.document;
  }, 100);
}
function deactivate() {
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});

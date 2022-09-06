'use strict';

import * as vscode from 'vscode';

/**
 * Called by vscode on first activation of the plugin.
 */
export function activate(context: vscode.ExtensionContext) {
  /*
   * Any files open on startup need to have shebang checked.
   */
  reconfigureAndAssociate();

  /*
   * Re-check when configuration changes.
   */
  let disposable = vscode.workspace.onDidChangeConfiguration(
    reconfigureAndAssociate
  );
  context.subscriptions.push(disposable);

  /*
   * And also when further files are opened we will check them.
   */
  disposable = vscode.workspace.onDidOpenTextDocument(associateFile);
  context.subscriptions.push(disposable);
  /*
   * And also when files are saved.
   */
  disposable = vscode.workspace.onDidSaveTextDocument((doc) => {
    if (
      vscode.workspace
        .getConfiguration("shebang")
        .get<boolean>("associateOnSave")
    ) {
      associateFile(doc);
    }
  });
  context.subscriptions.push(disposable);
}

/**
 * Called by vscode when extension is deactivated
 */
export function deactivate() {}

/**
 * Builds associations global and then associates all files with current settings
 */
function reconfigureAndAssociate() {
  let associationsSettings = vscode.workspace
    .getConfiguration("shebang")
    .get<Array<AssociationSetting>>("associations");

  if (associationsSettings) {
    associations = associationsSettings.map((assoc) => ({
      pattern: new RegExp(assoc.pattern),
      language: assoc.language,
    }));
  } else {
    associations = [];
  }

  for (const td of vscode.workspace.textDocuments) {
    associateFile(td);
  }
}

/**
 * Check whether a file has a matching shebang, and apply the appropriate
 * language mode if so.
 */
function associateFile(doc: vscode.TextDocument) {
  let shebang = doc.lineAt(0);

  for (const association of associations) {
    if (shebang.text.match(association.pattern)) {
      vscode.languages.setTextDocumentLanguage(doc, association.language);
      return;
    }
  }
}

type AssociationSetting = {
  pattern: string;
  language: string;
};

type Association = {
  pattern: RegExp;
  language: string;
};

/**
 * Global state of the plugin.
 */
let associations: Array<Association> = [];

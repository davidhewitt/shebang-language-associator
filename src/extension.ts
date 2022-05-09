'use strict';

import * as vscode from 'vscode';

/**
 * Called by vscode on first activation of the plugin.
 */
export function activate(context: vscode.ExtensionContext) {
    /*
     * Any files open on startup need to have shebang checked.
     */
    checkAllFiles();

    /*
     * Re-check when configuration changes.
     */
    let disposable = vscode.workspace.onDidChangeConfiguration(checkAllFiles);
    context.subscriptions.push(disposable);

    /*
     * And also when further files are opened we will check them.
     */
    disposable = vscode.workspace.onDidOpenTextDocument(checkFile);
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
        checkFile(doc);
      }
    });
    context.subscriptions.push(disposable);
}

/**
 * Called by vscode when extension is deactivated
 */
export function deactivate() {
}

/**
 * Re-check all open files
 */
function checkAllFiles() {
    for (const td of vscode.workspace.textDocuments) {
        checkFile(td);
    }
}

/**
 * Accepted prefixes are:
 * #! - shebang
 * #compdef - zsh
 * /// - POSIX path
 */
const acceptedPrefixes: Array<string> = [
    "#!",
    "#compdef",
    "//",
]

/**
 * Check whether a file has a matching shebang, and apply the appropriate
 * language mode if so.
 */
function checkFile(doc: vscode.TextDocument) {
    let shebang = doc.lineAt(0);

    /*
     * Do nothing if the first line is not a shebang-like line.
     */
    const match = acceptedPrefixes.some(prefix => shebang.text.startsWith(prefix));
    if (!match) {
        return;
    }

    let associations =
        vscode.workspace.getConfiguration("shebang")
            .get<Array<any>>("associations");

    if (associations) {
        for (const association of associations) {
            if (shebang.text.match(new RegExp(association.pattern))) {
                vscode.languages.setTextDocumentLanguage(doc, association.language);
            }
        }
    }
}

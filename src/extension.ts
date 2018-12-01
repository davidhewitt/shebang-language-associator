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
 * Check whether a file has a matching shebang, and apply the appropriate
 * language mode if so.
 */
function checkFile(doc: vscode.TextDocument) {
    let shebang = doc.lineAt(0);

    /*
     * Do nothing if the first line is not a shebang line.
     */
    if (!shebang.text.startsWith("#!")) {
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

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "latex-comment" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('latex-comment.commentOut', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const text = document.getText(selection);
            if (text) {
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, "\n%" + text+ "\n");
                });
            }
        }
	});
	context.subscriptions.push(disposable);

    let disposable2 = vscode.commands.registerCommand('latex-comment.uncomment', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            
            editor.edit(editBuilder => {
                const cursorPosition = selection.start;
                // Get the range including line breaks before line and after line
                let newRange = new vscode.Range(cursorPosition.line - 1, 0, cursorPosition.line + 1, 1);
                const beforeText = document.getText(newRange);
                const afterText = beforeText.replace(/(\r\n|\r|\n)%(.*)(\r\n|\r|\n)/m, '$2');
                editBuilder.replace(newRange, afterText);
            });
        }
	});
    context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {}

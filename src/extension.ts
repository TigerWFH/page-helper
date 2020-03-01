// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "page-helper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.newPage', (uri) =>{
		console.log("typeof uri===>", typeof uri);
		let pathname: string | undefined = undefined;
		if (uri) {
			pathname = uri.fsPath;
		}
		vscode.window.showInputBox().then((msg) => {
			if (msg) {
				const first = msg[0].toUpperCase();
				const second = msg.slice(1).toLowerCase();
				const componentName = first + second;
				const targetPath = path.resolve(uri.fsPath, msg);
				fs.mkdirSync(targetPath);
				// 1、index.js
				if (!fs.existsSync(path.resolve(targetPath, 'index.js'))) {
					const content = '123';
					fs.writeFile(path.resolve(targetPath, 'index.js'), content, (err) => {

					});
				}
				// 2、index.module.scss
				if (!fs.existsSync(path.resolve(targetPath, 'index.module.scss'))) {
					const content = '123';
					fs.writeFile(path.resolve(targetPath, 'index.module.scss'), content, (err) => {

					});
				}
				// 3、controller, 
				const controllerPath = path.resolve(targetPath, 'controller');
				fs.mkdirSync(controllerPath);
				// 3-1、type.js
				if (!fs.existsSync(path.resolve(controllerPath, 'type.js'))) {
					const content = `const prefix=\'${msg.toUpperCase()}/\'`;
					fs.writeFile(path.resolve(controllerPath, 'type.js'), content, (err) => {

					});
				}
				// 3-2、actions.js
				if (!fs.existsSync(path.resolve(controllerPath, 'actions.js'))) {
					const content = 'import * as t from \'./type.js\'';
					fs.writeFile(path.resolve(controllerPath, 'actions.js'), content, (err) => {

					});
				}
				// 3-3、reducers.js
				if (!fs.existsSync(path.resolve(controllerPath, 'reducers.js'))) {
					const content = '123';
					fs.writeFile(path.resolve(controllerPath, 'reducers.js'), content, (err) => {
						console.log("finish=======>");
						vscode.commands.executeCommand('workbench.files.action.refreshFilesExplorer');

					});
				}
				// 4、helper.js
				if (!fs.existsSync(path.resolve(targetPath, 'helper.js'))) {
					const content = '123';
					fs.writeFile(path.resolve(targetPath, 'helper.js'), content, (err) => {
					});
				}
				// vscode.window.showInformationMessage(uri.fsPath || '');

			}
			else {
				vscode.window.showInformationMessage('请输入页面名称');
			}
		});
	});
	
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log("sadfafsdafasfd");
}

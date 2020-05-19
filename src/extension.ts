// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import * as path from 'path'
import * as fs from 'fs'

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
		vscode.window.showInputBox().then((msg) => {
			if (msg) {
				const paramList = msg.split('.')
				const suffix = paramList[1] || 'ts'
				const name = (paramList[0]).toLowerCase()
				const componentName = name.charAt(0).toUpperCase() + name.slice(1)
				const targetPath = path.resolve(uri.fsPath, name)
				fs.mkdirSync(targetPath)
				// 1、index
				if (!fs.existsSync(path.resolve(targetPath, `index.${suffix}`))) {
					const IMPORT_LABEL = 'import * as React from \'react\'\n'
					const EXPORT_LABEL = `export default ${componentName}`
					const prefix = `interface IProps {}\ninterface IState {}\n`
					const first = `class ${componentName} extends React.Component`;
					const firstAfter = '<IProps, IState> {';
					let other = `\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {};\n\t}\n\tstatic getStateFromDerivedProps(nextProps, prevState){\n\t\treturn null;\n\t}\n\tcomponentDidMount() {\n\t}\n\tshouldComponentUpdate() {\n\t\treturn true;\n\t}\n\tgetSnapshotBeforeUpdate(prevProps, prevState) {\n\t}\n\trender(){\n\t\treturn null;\n\t}\n}\n`;
					let content = '';
					if (suffix === 'ts') {
						other = `\n\tconstructor(props: IProps){\n\t\tsuper(props)\n\t\tthis.state={}\n\t}\n\tstatic getStateFromDerivedProps(props: IProps, state: IState){\n\t\treturn null\n\t}\n\tcomponentDidMount(){\n\t}\n\tshouldComponentUpdate(){\n\t\treturn true\n\t}\n\tgetSnapshotBeforeUpdate(prevProps: IProps, prevState: IState){\n\treturn null\n\t}\n\trender(){\n\t\treturn null\n\t}\n}\n`
						content = `${prefix}${first}${firstAfter}${other}`;
					}
					else {
						content = `${first} {${other}`;
					}
					fs.writeFile(path.resolve(targetPath, `index.${suffix}x`), `${IMPORT_LABEL}${content}${EXPORT_LABEL}`, (err) => {
					});
				}
				// 2、index.module.scss
				if (!fs.existsSync(path.resolve(targetPath, 'index.module.scss'))) {
					const content = `.${name.toLowerCase()} {\n}`;
					fs.writeFile(path.resolve(targetPath, 'index.module.scss'), content, (err) => {
					});
				}
				// 3、controller
				const controllerPath = path.resolve(targetPath, 'controller');
				fs.mkdirSync(controllerPath);
				// 3-1、type.js
				if (!fs.existsSync(path.resolve(controllerPath, `type.${suffix}`))) {
					const content = `export const prefix=\'${name.toUpperCase()}/\'`;
					fs.writeFile(path.resolve(controllerPath, `type.${suffix}`), content, (err) => {
					});
				}
				// 3-2、actions.js
				if (!fs.existsSync(path.resolve(controllerPath, `actions.${suffix}`))) {
					const content = 'import * as t from \'./type\'';
					fs.writeFile(path.resolve(controllerPath, `actions.${suffix}`), content, (err) => {
					});
				}
				// 3-3、reducers.js
				if (!fs.existsSync(path.resolve(controllerPath, `reducers.${suffix}`))) {
					const content = `import * as t from \'./type\'\nimport {AnyAction} from 'redux'\nconst initialState = {}\n\nfunction ${name.toLowerCase()}Reducer (state = initialState, action: AnyAction) {\n}\n\nexport default ${name.toLowerCase()}Reducer;`;
					fs.writeFile(path.resolve(controllerPath, `reducers.${suffix}`), content, (err) => {
					});
				}
				// 4、helper.js
				if (!fs.existsSync(path.resolve(targetPath, `helper.${suffix}`))) {
					const content = '';
					fs.writeFile(path.resolve(targetPath, `helper.${suffix}`), content, (err) => {
						vscode.commands.executeCommand('workbench.files.action.refreshFilesExplorer');
					});
				}
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

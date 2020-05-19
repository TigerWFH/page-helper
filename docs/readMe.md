# 新建项目
* 安装Yeoman 和 VS Code Extensions Generator
```
    npm install -g yo generator-code

    yo code
    code ./helloworld
```
* 调试：F5直接调试
* 打包发布
```
    1、直接拷贝文件夹，放到vscode的插件目录，重启即可
    2、打包成vsix插件，发送给别人安装
    3、发布到官方应用市场

    关于打包：
        使用官方提供的vsce工具。
        安装：npm i vsce -g
        打包：vsce package
```

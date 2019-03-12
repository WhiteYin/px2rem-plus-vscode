# px2rem  extension
px转换rem，自动补全分号和注释。  
Convert px to rem extension for Visual Studio Code.

## First of all
这个插件脱胎于[px2rem +](https://github.com/hex-ci/px2rem-plus-vscode)，但是由于加了注释以后需要手动移动光标加上分号不适合我的审美，于是将分号也自动补全了。

This is a extension inspired from [px2rem +](https://github.com/hex-ci/px2rem-plus-vscode) whitch provides the auto comments features.But I dislike that it do not auto complete semicolon. So, I fork it's source code and add this feature.

## Autocomplete

![](https://raw.githubusercontent.com/WhiteYin/px2rem-with-semicolon/master/images/autocomplete.png)

## Settings

Sets the base pixel size of the current file. 

![](https://raw.githubusercontent.com/WhiteYin/px2rem-with-semicolon/master/images/settings.png)

## Comments

Support for adding comments, e.g. `/* 100/234 */`

## Preserve leading zero

Keep the leading zero for converted values < 1. E.g. 0.5rem (preserved) vs .5rem (not preserved)

## Demo

![](https://raw.githubusercontent.com/WhiteYin/px2rem-with-semicolon/master/images/example.gif)

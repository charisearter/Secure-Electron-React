# Secure Electron React

A more secure electron react app

'''
npm init -y
'''

Install dependencies
'''
npm i --save electron react react-dom
'''

Install Dev dependencies
'''
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader sass sass-loader style-loader webpack webpack-cli electron-reload
'''

Make a new file for the webpack in the root (webpack.common.js)

Special thanks to Jerga99 - https://github.com/Jerga99/
Copy the file from this source:
https://raw.githubusercontent.com/Jerga99/electron-react-boilerplate/master/webpack.common.js

Edit output path location to whatever folder structure you want the build to be located

Add Scripts
'''
"watch": "webpack --config webpack.common.js --watch",
"start": "electron ."
'''

Inside root make the files main.js, index.html, and preload.js

Inside the index.html file, make sure this line of code is there otherwise it keeps giving warnings.
'''
<meta charset="UTF-8" />
<!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy -->
<meta http-equiv="Content-Security-Policy" content="script-src 'self'" />
'''

Also make sure the script source points to the build file (output path in webpack)
'''

<script src="./build/dist/app.js"></script>

'''

Make a src folder (this is where React components will go)

Make an index.js 
'''

'''
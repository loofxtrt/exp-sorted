"use strict";
/*import path from 'path';
//import { fileURLToPath } from 'url'; // pra construir o __dirname

import { app, BrowserWindow } from 'electron';

import { CONFIG_FILE_HTML_INDEX } from '../data.js';
*/
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const { app, BrowserWindow } = require('electron');
const { CONFIG_FILE_HTML_INDEX } = require('../data.js');
function createMainWindow() {
    // usando es modules ao invés de commonjs, é preciso construir o __dirname manualmente
    //const __filename = fileURLToPath(import.meta.url);
    //const __dirname = path.dirname(__filename);
    const window = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            preload: '/mnt/seagate/workspace/coding/experimental/exp-sorted/code/dist/electron/preload.js' //path.join(__dirname, 'preload.js'),
        }
    });
    window.loadFile(CONFIG_FILE_HTML_INDEX);
}
app.whenReady().then(() => { createMainWindow(); });
//# sourceMappingURL=main.js.map
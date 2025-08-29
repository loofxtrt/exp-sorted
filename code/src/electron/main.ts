import path from 'path';
import { fileURLToPath } from 'url'; // pra construir o __dirname

import { app, BrowserWindow } from 'electron';

import { CONFIG_FILE_HTML_INDEX } from '../data.js';

function createMainWindow() {
    // usando es modules ao invés de commonjs, é preciso construir o __dirname manualmente
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const window = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    window.loadFile(CONFIG_FILE_HTML_INDEX);
}

app.whenReady().then(
    () => { createMainWindow() }
);
import { app, BrowserWindow } from 'electron';
import { CONFIG_FILE_HTML_INDEX } from '../data.js';

function createMainWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 500,
    });

    window.loadFile(CONFIG_FILE_HTML_INDEX);
}

app.whenReady().then(
    () => { createMainWindow() }
);
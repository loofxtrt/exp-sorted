import path from 'path';
import { app, BrowserWindow } from 'electron';
import { CONFIG_FILE_HTML_INDEX } from '../data.js';
import { fileURLToPath } from 'url';
function createMainWindow() {
    // usando es modules ao invés de commonjs, é preciso construir o __dirname manualmente
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const window = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            sandbox: false // sem isso os paths, tipo o do preload, quebram
        }
    });
    window.loadFile(CONFIG_FILE_HTML_INDEX);
}
app.whenReady().then(() => { createMainWindow(); });
//# sourceMappingURL=main.js.map
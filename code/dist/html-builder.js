export {};
/* INCOMPLETO
import { readDirAsObject } from "./helpers.js";

function loadDirectoryTree(directory: string) {
    const fileTree = document.querySelector('#file-tree');

    function renderTreeItem(iconName: string, label: string) {
        const fileLi = document.createElement('li');
        const icon = document.createElement('span');
        
        // criar o ícone
        icon.className = 'material-symbols-outlined';
        icon.innerHTML = iconName;

        // adicionar o nome do item ao html e o ícone
        fileLi.innerHTML = label;
        fileLi.appendChild(icon);

        return fileLi;
    }

    const dirStructure = readDirAsObject(directory);
    
    Object.keys(dirStructure).forEach(key => {
        if (key != null) {
            const dirItem = renderTreeItem('folder', 'folder');
        }
    });
}
*/ 
//# sourceMappingURL=html-builder.js.map
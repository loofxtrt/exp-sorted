"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
function baseLog({ level = 'text', prefix = undefined, msg, details = undefined }) {
    /**
     * imprime mensagens de log no terminal
     * todos os argumentos DESSA função são passados pelas outras subfunções de log
     *
     * @param level - define o indicador que vai aparecer na frente do conteúdo
     * @param prefix - indicador opcional que aparece depois do level e antes da mensagem
     * @param msg - mensagem principal do log
     * @param details - detalhes adicionais e opcionais sobre o log
     *     podem ser passados como uma string única ou como um array
     *     no caso de serem passados como um array, cada item vai virar uma linha nova
     *     e se não for passado, ele só não vai aparecer
     */
    // definir qual vai ser a cor e alias do level da mensagem baseada no level passado pra func
    // toda versão curta de um level deve ter um número x de caracteres que é igual em todas as ocorrências
    let color;
    let shortLevel;
    switch (level) {
        case 'success':
            color = chalk_1.default.green;
            shortLevel = 'okay';
            break;
        case 'error':
            color = chalk_1.default.red;
            shortLevel = 'erro';
            break;
        case 'info':
            color = chalk_1.default.blue;
            shortLevel = 'info';
            break;
        case 'warn':
            color = chalk_1.default.yellow;
            shortLevel = 'warn';
            break;
        default:
            color = chalk_1.default.reset;
            shortLevel = 'text';
            break;
    }
    // colorir o level e formatar o texto
    shortLevel = shortLevel.toUpperCase();
    shortLevel = color(shortLevel);
    // tratar os details
    let newDetails = null;
    if (Array.isArray(details)) {
        newDetails = '';
        // caso os details passados sejam um array, escrever cada item
        // como uma nova linha com indentação
        details.forEach(item => {
            item = item.trim();
            newDetails += `\n   ${item}`;
        });
    }
    else {
        // caso seja uma string, garantir que ela não tá vazia
        if (details?.toString().trim() != '') {
            newDetails = details;
        }
        else {
            newDetails = null;
        }
    }
    // colorir os details com a mesma cor do level caso eles estejam presentes
    if (typeof newDetails == 'string') {
        newDetails = color(newDetails);
    }
    // formatar a mensagem com ou sem os details, caso eles estejam presentes
    let finalMsg = '';
    if (typeof prefix == 'string' && prefix?.toString().trim() != '') {
        finalMsg += `${prefix} ~ `;
    }
    finalMsg += msg;
    if (newDetails != null) {
        finalMsg += `: ${newDetails}`;
    }
    console.log(`[ ${shortLevel} ] ${finalMsg}`);
}
function success({ prefix, msg, details }) {
    baseLog({
        level: 'success',
        prefix: prefix,
        msg: msg,
        details: details
    });
}
function error({ prefix, msg, details }) {
    baseLog({
        level: 'error',
        prefix: prefix,
        msg: msg,
        details: details
    });
}
function info({ prefix, msg, details }) {
    baseLog({
        level: 'info',
        prefix: prefix,
        msg: msg,
        details: details
    });
}
function warn({ prefix, msg, details }) {
    baseLog({
        level: 'warn',
        prefix: prefix,
        msg: msg,
        details: details
    });
}
exports.default = {
    success,
    error,
    info,
    warn
};
//# sourceMappingURL=logger.js.map
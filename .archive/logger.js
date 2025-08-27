import chalk from 'chalk';

function baseLog(level, msg, details) {
    // definir qual vai ser a cor e formatação do level da mensagem
    // baseada no level passado pra func
    let color;
    let shortLevel;
    switch (level) {
        case 'success':
            color = chalk.green;
            shortLevel = 'okay';
            break;
        case 'error':
            color = chalk.red;
            shortLevel = 'erro';
            break;
        case 'info':
            color = chalk.blue;
            shortLevel = 'info';
            break;
        case 'warn':
            color = chalk.yellow;
            shortLevel = 'warn';
            break;
        default:
            color = null;
            shortLevel = 'text';
            break;
    }

    // formatar a mensagem com ou sem detalhes, caso a string passada não esteja inválida
    const formattedMsg = details != null && details.toString().trim() != '' ? `${msg}: ${details}` : `${msg}` 
    
    // colorir o level
    shortLevel = shortLevel.toUpperCase();
    const finalLevel = color(shortLevel);
    
    console.log(
        `[ ${ finalLevel } ] ${formattedMsg}`
    );
}

function success(msg, details = undefined) {
    baseLog('success', msg, details);
}

function error(msg, details = undefined) {
    baseLog('error', msg, details);
}

function info(msg, details = undefined) {
    baseLog('info', msg, details);
}

export default {
    success,
    error,
    info
}
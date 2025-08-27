import chalk from 'chalk';
function baseLog(level, msg, details) {
    try {
        msg = msg.toString();
        details = details.toString();
    }
    catch (err) {
        console.error(err);
    }
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
            color = chalk.reset;
            shortLevel = 'text';
            break;
    }
    // colorir o level
    shortLevel = shortLevel.toUpperCase();
    const finalLevel = color(shortLevel);
    // colorir os details
    details = color(details);
    // formatar a mensagem com ou sem detalhes, caso a string passada não esteja inválida
    const formattedMsg = details != null && details.toString().trim() != '' ? `${msg}: ${details}` : `${msg}`;
    console.log(`[ ${finalLevel} ] ${formattedMsg}`);
}
function success(msg, details = null) {
    baseLog('success', msg, details);
}
function error(msg, details = null) {
    baseLog('error', msg, details);
}
function info(msg, details = null) {
    baseLog('info', msg, details);
}
function warn(msg, details = null) {
    baseLog('warn', msg, details);
}
export default {
    success,
    error,
    info,
    warn
};
//# sourceMappingURL=logger.js.map
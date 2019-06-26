const path = require('path');
const { createLogger, format, transports } = require('winston');

const consoleTransport = new transports.Console({
  format: format.combine(
    format(info => {
      info.level = info.level.toUpperCase();
      return info;
    })(),
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.colorize(),
    format.align(),
    format.printf(({ label, level, message, timestamp }) => {
      return `${timestamp} [${label}] ${level} ${message}`;
    })
  )
});

const logger = new createLogger({
  level: 'debug',
  transports: [consoleTransport]
});

function accessLogger(req, res, next) {
  logger.debug(`${req.method} ${req.originalUrl}`);
  next();
}

module.exports = {
  logger,
  accessLogger
};

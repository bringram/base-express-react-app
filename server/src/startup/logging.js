const path = require('path');
const { createLogger, format, transports } = require('winston');

const getLabel = function(callingModule) {
  var parts = callingModule.filename.split(path.sep);
  return path.join(parts[parts.length - 2], parts.pop()).replace('src/', '');
};

const initializeLogger = function(callingModule) {
  return new createLogger({
    level: 'debug',
    transports: [
      new transports.Console({
        format: format.combine(
          format(info => {
            info.level = info.level.toUpperCase();
            return info;
          })(),
          format.label({ label: getLabel(callingModule) }),
          format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          format.colorize(),
          format.align(),
          format.printf(({ label, level, message, timestamp }) => {
            return `${timestamp} ${level} [${label}] ${message}`;
          })
        )
      })
    ]
  });
};

const logger = initializeLogger(module);

function accessLogger(req, res, next) {
  logger.debug(`${req.method} ${req.originalUrl}`);
  next();
}

module.exports = {
  initializeLogger,
  accessLogger
};

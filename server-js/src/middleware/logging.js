import path from 'path';
import { createLogger, format, transports } from 'winston';

/**
 * Produces a string representation of the path the given module resides.
 *
 * @param {NodeJS.Module} callingModule The NodeJS module object
 */
const getLabel = (callingModule) => {
  var parts = callingModule.filename.split(path.sep);
  return path.join(parts[parts.length - 2], parts.pop()).replace('dist/', '');
};

/**
 * Creates a new instance of a Winston logger for the given module.
 *
 * @param {NodeJS.Module} callingModule The NodeJS module object
 * @param {String} logLevel An optional parameter defining the log level
 *                          'debug' by default
 */
export const initializeLogger = (callingModule, logLevel = 'debug') => {
  return createLogger({
    level: logLevel,
    format: format.combine(
      format((info) => {
        info.level = info.level.toUpperCase();
        return info;
      })(),
      format.label({ label: getLabel(callingModule) }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.colorize(),
      format.align(),
      format.printf(({ timestamp, level, label, message }) => {
        return `${timestamp} ${level} [${label}] ${message}`;
      })
    ),
    transports: [new transports.Console()],
  });
};

const logger = initializeLogger(module);

/**
 *
 * @param {express.Request} req The Express request object
 * @param {express.Response} res The Express response object
 * @param {express.NextFunction} next The Express next middleware function
 */
export const accessLogger = (req, res, next) => {
  const startHrTime = process.hrtime();

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    logger.debug(
      `${req.method} ${req.originalUrl}\tResponse Time: ${elapsedTimeInMs}ms`
    );
  });

  next();
};

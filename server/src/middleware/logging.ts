import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { createLogger, format, transports } from 'winston';
import { TransformableInfo } from 'logform';

/**
 * Produces a string representation of the path the given module resides.
 *
 * @param callingModule {NodeJS.Module} The NodeJS module object
 */
const getLabel = (callingModule: NodeJS.Module) => {
  var parts = callingModule.filename.split(path.sep);
  return path
    .join(parts[parts.length - 2], parts.pop()!)
    .replace('dist/', '')
    .replace('src/', '');
};

/**
 * Creates a new instance of a Winston logger for the given module.
 *
 * @param callingModule {NodeJS.Module} The NodeJS module object
 */
export const initializeLogger = (callingModule: NodeJS.Module) => {
  return createLogger({
    level: 'debug',
    format: format.combine(
      format((info: TransformableInfo) => {
        info.level = info.level.toUpperCase();
        return info;
      })(),
      format.label({ label: getLabel(callingModule) }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.colorize(),
      format.align(),
      format.printf(({ timestamp, level, label, message }) => {
        return `${timestamp} ${level} [${label}] ${message}`;
      })
    ),
    transports: [new transports.Console()]
  });
};

const logger = initializeLogger(module);

/**
 * A middleware function that logs the HTTP method and URL of every request
 * made to the application.
 *
 * @param req {Request} The Express request object
 * @param res {Response} The Express response object
 * @param next {NextFunction} The Express next middleware function
 */
export const accessLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.debug(`${req.method} ${req.originalUrl}`);
  next();
};

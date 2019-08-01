import path, { FormatInputPathObject } from 'path';
import { Request, Response } from 'express';
import { createLogger, format, transports } from 'winston';

const getLabel = function(callingModule: NodeJS.Module) {
  var parts = callingModule.filename.split(path.sep);
  return path
    .join(parts[parts.length - 2], parts.pop()!)
    .replace('dist/', '')
    .replace('src/', '');
};

export const initializeLogger = (callingModule: NodeJS.Module) => {
  return createLogger({
    level: 'debug',
    format: format.combine(
      format((info: any) => {
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

export const accessLogger = (req: Request, res: Response, next: () => void) => {
  logger.debug(`${req.method} ${req.originalUrl}`);
  next();
};

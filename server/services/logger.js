import winston, { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import "winston-mongodb";

// logger levels:
// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6

const consoleTransport = new winston.transports.Console();

const fileTransport = new DailyRotateFile({
  level: "verbose",
  filename: "./logs/%DATE%-two-days.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "2d",
});

const mongoDBOptions = {
  db: process.env.MONGODB_URI,
  options: { useUnifiedTopology: true },
  collection: "logs",
  level: "verbose",
};

const logger = winston.createLogger({
  level: "verbose",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.align(),
    format.printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} ${level}: ${message} :: ${stack || ""}`;
    })
  ),
  transports: [
    consoleTransport,
    fileTransport,
    new winston.transports.MongoDB(mongoDBOptions),
  ],
});

export default logger;

import pino from 'pino'

/**
 * A logger instance created by the {@link (logger:function)} function or the {@link ILogger.child} method.
 * @public
 */
export interface ILogger {
  child(name: string): ILogger
  debug(...args: any[]): void
  info(...args: any[]): void
  warn(...args: any[]): void
  error(...args: any[]): void
}

type LogFn = {
  (...args: any[]): void
}

let forceMode: null | 'pretty' | 'json' = null
let rootLogger: pino.Logger | null = null

class LoggerWrapper implements ILogger {
  private instance: pino.Logger
  constructor(parentLogger: pino.Logger, private name: string) {
    this.instance = parentLogger.child({ name })
  }
  child(name: string): ILogger {
    return new LoggerWrapper(this.instance, this.name + ':' + name)
  }
  debug: LogFn = (thing, ...args) => this.instance.debug(thing, ...args)
  info: LogFn = (thing, ...args) => this.instance.info(thing, ...args)
  warn: LogFn = (thing, ...args) => this.instance.warn(thing, ...args)
  error: LogFn = (thing, ...args) => this.instance.error(thing, ...args)
}

/**
 * @public
 */
export function logger(name: string): ILogger {
  if (!rootLogger) {
    rootLogger = pino({
      prettyPrint:
        forceMode === 'pretty' || (forceMode === null && process.stdout.isTTY)
          ? { translateTime: true }
          : false,
    })
  }
  return new LoggerWrapper(rootLogger, name)
}

/**
 * @public
 */
export namespace logger {
  export function forcePretty() {
    forceMode = 'pretty'
  }

  export function forceJSON() {
    forceMode = 'json'
  }
}

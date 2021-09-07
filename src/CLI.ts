import yargs from 'yargs'

const wrap = <T extends yargs.Argv<any>>(yargs: T): ICli<T> => ({
  parse() {
    yargs.parse()
  },
  command(command, description, builder, handler) {
    return wrap(yargs.command(command, description, builder, handler))
  },
})

/**
 * A command-line interface created by the {@link cli} function.
 * @public
 */
export interface ICli<T> {
  /**
   * Register a command.
   *
   * @param command - The command name.
   * @param description - The command description.
   * @param options - The options accepted by the command.
   * @param handler - The command handler.
   *  It may return a promise.
   *  If the promise is rejected, the CLI will exit with an non-zero code.
   */
  command<O extends { [key: string]: yargs.Options }>(
    command: string | ReadonlyArray<string>,
    description: string,
    options: O,
    handler: (args: CliArguments<O>) => void,
  ): ICli<T>

  /**
   * Parses the command-line arguments and invoke the registered command handler.
   */
  parse(): void
}

/**
 * @public
 */
export type CliArguments<O extends { [key: string]: yargs.Options }> =
  yargs.Arguments<yargs.InferredOptionTypes<O>>

/**
 * Creates a command-line interface.
 *
 * @param globalOptions - The global options which apply to all commands.
 * @returns An {@link ICli} instance.
 * @public
 */
export function cli<GlobalOptions extends {}>(
  globalOptions: GlobalOptions = {} as any,
) {
  return wrap(yargs.demandCommand().strict().help().options(globalOptions))
}

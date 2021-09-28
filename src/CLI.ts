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
export interface ICli<GlobalOptions> {
  /**
   * Register a command.
   *
   * @param command - The command string.
   *  Use `$0` for default command.
   *  Add `<arg>` for required positional parameter.
   *  Add `[arg]` for optional positional parameter.
   *  See {@link https://github.com/yargs/yargs/blob/master/docs/advanced.md#commands | yargs Command API documentation} for details.
   * @param description - The command description, the text to show in `--help` menu.
   * @param options - The options accepted by the command. See {@link https://github.com/yargs/yargs/blob/master/docs/api.md#optionskey-opt | yargs API documentation} for details.
   * @param handler - The command handler.
   *  It may return a promise.
   *  If the promise is rejected, the CLI will exit with the help text and a non-zero code.
   * @returns An instance of {@link ICli} for chaining.
   */
  command<LocalOptions extends { [key: string]: yargs.Options }>(
    command: string | ReadonlyArray<string>,
    description: string,
    options: LocalOptions,
    handler: (args: CliArguments<LocalOptions>) => void,
  ): ICli<GlobalOptions>

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
 * @param globalOptions - The global options which apply to all commands. See {@link https://github.com/yargs/yargs/blob/master/docs/api.md#optionskey-opt | yargs API} for details.
 * @returns An {@link ICli} instance.
 * @public
 */
export function cli<GlobalOptions extends {}>(
  globalOptions: GlobalOptions = {} as any,
) {
  return wrap(yargs.demandCommand().strict().help().options(globalOptions))
}

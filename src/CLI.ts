import yargs from 'yargs'

const wrap = <T extends yargs.Argv<any>>(yargs: T): CLI<T> => ({
  parse() {
    yargs.parse()
  },
  command(command, description, builder, handler) {
    return wrap(yargs.command(command, description, builder, handler))
  },
})

type CLI<T> = {
  parse(): void
  command<O extends { [key: string]: yargs.Options }>(
    command: string | ReadonlyArray<string>,
    description: string,
    builder: O,
    handler: (args: yargs.Arguments<yargs.InferredOptionTypes<O>>) => void,
  ): CLI<T>
}

export function cli<T extends {}>(options: T = {} as any) {
  return wrap(
    yargs
      .demandCommand()
      .strict()
      .help()
      .options(options),
  )
}

# tkt

`tkt`, pronounced **toolkit**, is an opinionated toolkit for building Node.js applications. Comes with good IntelliSense support thanks to TypeScript.

- [CLI](#cli)
- [Logging](#logging)
- [Invariant](#invariant)

## CLI

Most Node.js applications have a CLI entry point. The CLI API allows you to quickly create a CLI application.

Behind the scenes, it is powered by `yargs` with a reduced API surface and sensible defaults.

Features:

- Strict by default. Unknown commands and arguments are rejected.
- Supports `--help` generation.
- Async errors result in failure exit code by default.

### Synopsis

```js
require('tkt')
  .cli()
  .command(
    '$0',
    'Default command',
    {
      x: { type: 'number', desc: 'X coordinate', demand: true },
      y: { type: 'number', desc: 'Y coordinate', demand: true },
    },
    async args => {
      console.log([args.x, args.y])
    },
  )
  .command(
    'greet <name>',
    'Displays a greeting',
    {
      name: { type: 'string' },
    },
    async args => {
      console.log(`Hello, ${args.name}`)
    },
  )
  .parse()
```

### `cli(globalOptions)` &rarr; `CLI`

- `globalOptions` see [yargs API documentation](https://github.com/yargs/yargs/blob/master/docs/api.md#optionskey-opt).

#### `.command(command, description, options, handler)` &rarr; `CLI`

Registers a command.

- `command` is the command string.
  - Use `$0` for default command.
  - Add `<arg>` for required positional parameter.
  - Add `[arg]` for optional positional parameter.
  - See [yargs Command API documentation](https://github.com/yargs/yargs/blob/master/docs/advanced.md#commands).
- `description` is the text to show in `--help` menu.
- `options` see [yargs API documentation](https://github.com/yargs/yargs/blob/master/docs/api.md#optionskey-opt).
- `handler` an async function to execute.
  - If the async function rejects, the help text is shown and process exits with non-zero status.

#### `.parse()` &rarr; `void`

Do the option parsing. Call this after registering the command.

## Logging

### `logger(moduleName)` &rarr; `Logger`

Creates a logger for a module.

Features:

- Structured logging (JSON log output).
- When connected to TTY, log output is prettified.

#### `.debug(...args)` <br>`.info(...args)` <br>`.warn(...args)` <br>`.error(...args)`

Logs stuff.

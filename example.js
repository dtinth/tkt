// @ts-check
const { cli, logger } = require('./lib')

const log = logger('main')
cli()
  .command(
    '$0 [name]',
    'Runs the app',
    { name: { desc: 'Your name', type: 'string', default: 'world' } },
    async args => {
      log.info('Hello, %s!', args.name)
    },
  )
  .command('test-logging', 'Runs the app', {}, async args => {
    log.info('Simple log')
    log.info('%s with %s', 'Logging', 'variable interpolations')
    log.info({ x: 1 }, 'Logging with object')
  })
  .command('error', 'Throws an error', {}, async args => {
    try {
      throw new Error('wtf')
    } catch (error) {
      log.error(error)
    }
  })
  .parse()

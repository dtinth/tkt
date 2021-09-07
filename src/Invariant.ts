import invariantLib from 'invariant'

/**
 * Asserts state which your program assumes to be true.
 * If it is false, an error is thrown.
 * @param value - The value to assert.
 * @param message - The message format string to display on error.
 * @param extra - Optional values used to populate the message format string.
 * @public
 */
export function invariant(value: any, message?: string, ...extra: any[]): void {
  invariantLib(value, message, ...extra)
}

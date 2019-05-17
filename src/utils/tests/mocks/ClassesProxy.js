/**
 * This mock allows to import JSS styles from a file
 * and use any classnames that would be generated by withStyles in the real app, without actually using withStyles.
 * Proxy allows to return non-existing values from an object.
 *
 *
 * Example:
 * -- ./Component.styles.js --
 * export default theme => ({
 *  root: {
 *   padding: `${theme.spacing.unit * 3}px 0`,
 *   font-size: '120%',
 *  },
 *  button: {
 *   color: theme.palette.red,
 *  }
 * })
 *
 * -- ./Component.js --
 * // ...
 * render() {
 *  const { classes } = this.props
 *  return (
 *    <div className={classes.root}>
 *      <button className={classes.button}>Click me</button>
 *    </div>
 *  )
 *
 * -- ./Component.test.js --
 * import { ClassesProxy } from '~utils/tests/mocks'
 *
 * const initComponent = overrides => {
 *  const wrapper = <Component classes={ClassesProxy} {...overrides} />
 *  return { wrapper }
 * }
 * */

import { makeGetProxy } from '~utils/proxies'

export default makeGetProxy({}, (target, name) => name)

export default ({ palette, spacing }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: spacing.unit * 4,
    backgroundColor: palette.blue[300],
    color: palette.common.white,
  },
})

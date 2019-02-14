export default ({ palette, spacing }) => ({
  appBar: {
    background: palette.background.default,
    boxShadow: 'none',
    color: palette.primary.main,
  },
  formContainer: {
    background: palette.background.accent,
    display: 'flex',
    flexGrow: 1,
    overflowY: 'scroll',
    padding: spacing.unit * 3,
  },
  formWrapper: {
    background: palette.background.paper,
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    minHeight: '100%',
    overflowY: 'auto',
    padding: spacing.unit * 1,
  },
  row: {
    paddingBottom: spacing.unit * 2,
    paddingTop: spacing.unit * 2,
  },
  sizeNotification: {
    color: palette.error.main,
    marginTop: spacing.unit * 0.5,
  },
  uploadButton: {
    marginLeft: spacing.unit * 1,
  },
  drawer: {
    width: 475,
    height: 'calc(100% - 30px)',
    top: 15,
    right: 15,
    padding: '30px 15px',
  },
  keyContainer: {
    marginTop: 20,
    marginBottom: 50,
  },
})

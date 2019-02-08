export default ({ palette, spacing, typography }) => {
  return {
    root: {
      flexGrow: 1,
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: 20,
    },
    card: {
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
    },
    editIcon: {
      position: 'absolute',
      bottom: 5,
      right: 5,
    },
  }
}

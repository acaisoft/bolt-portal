import React from 'react'
import { CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core'

import theme from './theme'

const muiTheme = createMuiTheme(theme)

if (process.env.NODE_ENV === 'development') {
  console.log('theme', muiTheme)
}

const withMuiTheme = (Component, injectedTheme = muiTheme) => {
  const HOC = componentProps => (
    <MuiThemeProvider theme={injectedTheme}>
      <CssBaseline />
      <Component {...componentProps} />
    </MuiThemeProvider>
  )

  const name = Component.displayName || Component.name || ''
  HOC.displayName = `withMuiTheme(${name})`

  return HOC
}

export default withMuiTheme

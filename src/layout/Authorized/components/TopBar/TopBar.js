import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withRouter, Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  withStyles,
} from '@material-ui/core'
import { Extension, ShowChart } from '@material-ui/icons'

import styles from './TopBar.styles'
import ProjectSelector from '../ProjectSelector'

export class TopBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  items = [
    { label: 'Projects', linkTo: '/projects', icon: Extension },
    { label: 'Tests Results', linkTo: '/test-runs', icon: ShowChart },
  ]

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
    this.handleMobileMenuClose()
  }

  handleMenuItemClick = item => {
    const { history } = this.props
    this.handleMenuClose()
    history.push(item.linkTo)
  }

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget })
  }

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null })
  }

  render() {
    const { classes, history, location } = this.props
    const { anchorEl } = this.state

    const isMenuOpen = !!anchorEl

    return (
      <div className={classes.root}>
        <AppBar position="sticky" elevation={0} className={classes.appBar}>
          <Toolbar>
            <Link to="/" className={classes.title}>
              <Typography variant="h6" noWrap color="inherit">
                Acai Bolt
              </Typography>
            </Link>

            <div className={classes.projectSelector}>
              <ProjectSelector
                onChange={this.handleProjectChange}
                history={history}
                location={location}
              />
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {/* <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
                <MoreVert />
              </IconButton> */}
            </div>
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          {this.items.map(item => (
            <MenuItem
              key={item.linkTo}
              onClick={() => this.handleMenuItemClick(item)}
            >
              <item.icon className={classes.menuIcon} />
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(TopBar))

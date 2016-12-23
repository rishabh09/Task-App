import React from 'react'
import { IndexLink, Link } from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'
import Home from 'material-ui/svg-icons/action/home'
import Exit from 'material-ui/svg-icons/action/exit-to-app'
import Assignment from 'material-ui/svg-icons/action/assignment'
import Account from 'material-ui/svg-icons/action/account-circle'
import Add from 'material-ui/svg-icons/content/add-circle'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const NavBar = React.createClass({
  componentWillMount: function () {
    this.setState({open: false})
  },
  handleToggle: function () { this.setState({open: !this.state.open})},
  handleClose: function () {
    console.log('clicked')
    this.setState({open: false})},
  render: function () {
    return (
      <div>
        <AppBar
          title={<span>Task-App</span>}
          onLeftIconButtonTouchTap={this.handleToggle}
          onTitleTouchTap={this.handleToggle}
          iconElementRight={<FlatButton label="Logout" href="/logout" icon={<Exit/>} />} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <IndexLink to='/' activeClassName='active' activeStyle={{fontWeight: 'bold'}}>
            <MenuItem onTouchTap={this.handleClose} rightIcon={<Home />}> Home
            </MenuItem>
          </IndexLink>
          <Link to='/tasks' activeClassName='active' activeStyle={{fontWeight: 'bold'}}>
          <MenuItem onTouchTap={this.handleClose} rightIcon={<Assignment/>}> Your Tasks
          </MenuItem>
          </Link>
          <Link to='/update' activeClassName='active' activeStyle={{fontWeight: 'bold'}}>
          <MenuItem onTouchTap={this.handleClose} rightIcon={<Account/>}> Update Profile
          </MenuItem>
          </Link>
          <Link to='/create' activeClassName='active' activeStyle={{fontWeight: 'bold'}}>
          <MenuItem onTouchTap={this.handleClose} rightIcon={<Add/>}> Create Tasks
          </MenuItem>
          </Link>
        </Drawer>
      </div>
    )}
})

module.exports = NavBar

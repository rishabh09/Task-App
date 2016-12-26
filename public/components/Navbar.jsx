import React from 'react'
import { IndexLink, Link } from 'react-router'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Exit from 'material-ui/svg-icons/action/exit-to-app'
import Account from 'material-ui/svg-icons/action/account-circle'
import Arrow from 'material-ui/svg-icons/navigation/arrow-drop-down'
import IconMenu from 'material-ui/IconMenu'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const NavBar = React.createClass({

  render: function () {
    return (
      <div>
        <AppBar
          title={<span>Task-App</span>}
          showMenuIconButton={false}
          iconElementRight={
             <IconMenu style={{marginTop:11}}
      iconButtonElement={
        <FlatButton
      label="Account"
      labelPosition="before"
      style={{color:'white'}}
      icon={<Arrow />}
    />
    }
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
               <Link to='/update' activeClassName='active' style={{textDecoration: 'none'}}>

      <MenuItem primaryText="Update Profile" rightIcon={<Account/>}/>
      </Link>
      <MenuItem primaryText="Sign out" href="/logout" rightIcon={<Exit/>} />
    </IconMenu>
              }
          />
      </div>
    )}
})

module.exports = NavBar

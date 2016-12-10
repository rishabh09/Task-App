import React from 'react'
import {IndexLink, Link} from 'react-router'

const NavBar = React.createClass({
render:function(){
return (
  <div className="top-bar">
    <div className="top-bar-left">
      <ul className="menu">
        <li className="menu-text">Task App</li>
        <li>
          <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight:'bold'}}>Home</IndexLink>
        </li>
        <li>
          <Link to="/update" activeClassName="active" activeStyle={{fontWeight:'bold'}}>Update Profile</Link>
        </li>
        <li>
          <Link to="/create" activeClassName="active" activeStyle={{fontWeight:'bold'}}>Create Task</Link>
        </li>
      </ul>
    </div>
    <div className="top-bar-right">
      <ul className="menu">
        <li>
          <a href="logout">Logout</a>
        </li>
      </ul>
    </div>
  </div>
    )}
})


module.exports = NavBar

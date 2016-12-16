import React from 'react'
import {IndexLink, Link} from 'react-router'

const NavBar = React.createClass({
render:function(){
return (
  <div>
  <div className="top-bar">
    <div className="top-bar-right">
          <a href="logout">Logout</a>
    </div>
  </div>
  <div className="left-bar">
    <h2 className="menu-text">Task App</h2>
    <ul className="menu">
      <li>
        <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight:'bold'}}>Home</IndexLink>
      </li>
      <li>
        <IndexLink to="/tasks" activeClassName="active" activeStyle={{fontWeight:'bold'}}>Your Tasks</IndexLink>
      </li>
      <li>
        <Link to="/update" activeClassName="active" activeStyle={{fontWeight:'bold'}}>Update Profile</Link>
      </li>
      <li>
        <Link to="/create" activeClassName="active" activeStyle={{fontWeight:'bold'}}>Create Task</Link>
      </li>
    </ul>
  </div>
  </div>
    )}
})


module.exports = NavBar

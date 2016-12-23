import React from 'react'
import NavBar from 'NavBar'

const Home = React.createClass({
  render: function () {
    return (
      <div>
        <NavBar/>
        {this.props.children}
      </div>
  )}})

module.exports = Home

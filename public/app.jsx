import React from 'react'
import { render } from 'react-dom'
import { Route, Router, IndexRoute, hashHistory } from 'react-router'
import Home from 'Home'
import Dashboard from 'Dashboard'
import Update from 'Update'
import Create from 'Create'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

require('style!css!AppCss')
render(
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path='/' component={Home}>
        <Route path='/update' component={Update} />
        <Route path='/create' component={Create} />
        <IndexRoute component={Dashboard} />
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('app'))

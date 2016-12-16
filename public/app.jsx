import React from 'react'
import {render} from 'react-dom'
import {Route,Router,IndexRoute,hashHistory} from 'react-router'
import Home from 'Home'
import Dashboard from 'Dashboard'
import Update from 'Update'
import Create from 'Create'
import Tasks from 'Tasks'

require('style!css!AppCss')
render(
<Router history={hashHistory}>
    <Route path='/' component={Home}>
      <Route path='/tasks' component={Tasks}/>
      <Route path='/update' component={Update}/>
      <Route path='/create' component={Create}/>
      <IndexRoute component={Dashboard} />
    </Route>
</Router>,
document.getElementById('app'))

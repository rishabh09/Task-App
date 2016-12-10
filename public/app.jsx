import React from 'react'
import ReactDOM from 'react-dom'
import {Route,Router,IndexRoute,hashHistory} from 'react-router'
import Home from 'Home'
import Dashboard from 'Dashboard'
import Update from 'Update'
import Create from 'Create'

require('style!css!foundation-sites/dist/css/foundation.min.css')
require('style!css!AppCss')
$(document).foundation()
ReactDOM.render(
<Router history={hashHistory}>
    <Route path='/' component={Home}>
      <Route path='/update' component={Update}/>
      <Route path='/create' component={Create}/>
      <IndexRoute component={Dashboard} />
    </Route>
</Router>,
document.getElementById('app'))

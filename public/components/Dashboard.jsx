import React from 'react'
import { getJSON } from 'io-square-browser'
import Modal from 'react-modal'
import io from 'Socket'
const socket = io()
import Chat from 'Chat'
import moment from 'moment'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { IndexLink, Link } from 'react-router'

const Panel = React.createClass({
  componentWillMount: function () {
    this.setState({
      data: this.props.data
    })
  },
  render: function () {
    return (
      <div className="taskPannel">
        {this.state.data}
      </div>
    )
  }
})

const Dashboard = React.createClass({
  componentWillMount: function () {
    let stateObj = {panel:{}}
    let that = this
    getJSON('/getdashboard')
      .then((reply) => {
        this.setState({
          taskby: reply.taskby,
          user_id : reply.user_id,
          taskto : reply.taskto,
          userlist : reply.userlist
        })
        reply.taskto.map(function (val) {
          stateObj['panel'][val.id] = false
        })
        reply.taskby.map(function (val) {
          stateObj['panel'][val.id] = false
        })
        this.setState(stateObj)
      })
      

  },
  handleClick: function (e) {
    let stateObj = this.state
    stateObj['panel'][e.id] = !stateObj['panel'][e.id]
    this.setState(stateObj)
    console.log(this.state)
  },
  handleClose:function(e){
   let stateObj = this.state
    stateObj['panel'][e.id] = false
    this.setState(stateObj)
    console.log(this.state)
  }
  ,
  render: function () {
    const that = this
    if (!this.state || !this.state.panel) {
      return (    <div className='row'>
                    <br/>
                    <table className='data-tables'>
                      <thead>
                        <h1>Patience You Must Have My Young Padawan</h1>
                      </thead>
                    </table>
                  </div>
      )
    }

    return (
      <div className='row'>
        {this.state.taskto.map(function (val) {
           return (<div key={val.id} className="taskRows" >
                     <div class="taskNameRow" onClick={that.handleClick.bind(this, val)}>{val.title}</div>
                     <div class="person">Assigned By {that.state.userlist[val.taskby]}</div>
                     {that.state.panel[val.id] ? (<div><Panel data={val.id}/>        
                      <button onClick={that.handleClose.bind(this,val)} className="closeButton">Close</button>
                      </div>): null}
                   </div>)
         })}
         {this.state.taskby.map(function (val) {
           return (<div key={val.id} className="taskRows">
                     <div class="taskNameRow" onClick={that.handleClick.bind(this, val)}>{val.title}</div>
                     <div class="person">Assigned To {that.state.userlist[val.taskto]}</div> 
                     {that.state.panel[val.id] ? (<div><Panel data={val.id}/>        
                      <button onClick={that.handleClose.bind(this,val)} className="closeButton">Close</button>
                      </div>): null}
                   </div>)
         })}
      </div>
    )
  }
})

module.exports = Dashboard

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
import RaisedButton from 'material-ui/RaisedButton';
import UpArrow from 'material-ui/svg-icons/navigation/expand-less';
import Panel from 'TaskPanel' 
import {VelocityTransitionGroup} from 'velocity-react'


const Dashboard = React.createClass({
  componentWillMount: function () {
    let stateObj = {panel:{}}
    let that = this
    getJSON('/getdashboard')
      .then((reply) => {
        this.setState({
          taskby: reply.taskby,
          userid : reply.user_id,
          taskto : reply.taskto,
          userlist : reply.userlist,
          open:null
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
    console.log(e.id)
    if(this.state.open===e.id){
       this.setState({
      open:null
    })
    }else{
          this.setState({
      open:e.id
    })
    }
 
  },

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
       console.log(this.state)
    return (
      <div className='row'>
        {this.state.taskto.map(function (val) {
           return (<div key={val.id} ref={val.id} className="taskRows" className="taskRows" >
                    <div onClick={that.handleClick.bind(this, val)}>
                     <div className="taskName" >{val.title}</div>
                     <div className="dueDate">{val.duedate}</div>
                       <div style={{clear:'both'}}></div>
                      <div className="taskTo">{that.state.userlist[val.taskto]}</div>
                     <div className={"taskStatus "+val.status}>{val.status}</div>
                     </div>
                     <div style={{clear: 'both'}}>  </div>
                             <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>

                     {(that.state.open===val.id) ? (<Panel details={val.details} taskby={val.taskby} taskto={val.taskto} date={val.date} duedate={val.duedate} status={val.status} id={val.id} userlist={that.state.userlist} userid={that.state.userid}/>        
                    ): null}
                              </VelocityTransitionGroup>

                   </div>)
         })}
         {this.state.taskby.map(function (val) {
           return (<div key={val.id} className="taskRows" ref={val.id}>
                      <div onClick={that.handleClick.bind(this, val)}>
                     <div className="taskName" >{val.title}</div>
                     <div className="dueDate">{val.duedate}</div> 
                     <div style={{clear:'both'}}></div>
                      <div className="taskTo">{that.state.userlist[val.taskto]}</div>
                     <div className={"taskStatus "+val.status}>{val.status}</div>
                     </div>
                     <div style={{clear: 'both'}}></div>
                       <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>

                     {(that.state.open===val.id) ? (<Panel details={val.details} taskby={val.taskby} taskto={val.taskto} date={val.date} duedate={val.duedate} status={val.status} id={val.id} userlist={that.state.userlist} userid={that.state.userid}/>        
                      ): null}
                              </VelocityTransitionGroup>

                   </div>)
         })}
      </div>
    )
  }
})

module.exports = Dashboard
 
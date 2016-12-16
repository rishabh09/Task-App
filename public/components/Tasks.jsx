import React from 'react'
import {getJSON} from 'io-square-browser'

const Tasks = React.createClass({
  componentWillMount:function(){
    getJSON('/getdashboard')
      .then((reply)=>{
        this.setState({
          taskby:reply.taskby,
          userlist:reply.userlist
        })
      })

  },

  render: function(){
    var that = this
    console.log(this.state)
    if (!this.state) {
        return (    <div className="row">
              <br/>
              <table className="data-tables">
          <thead>
            <tr>
            <h1>Patience You Must Have My Young Padawan</h1>
            </tr>
            </thead>
              </table>
        </div>
        )
    }


    return (
      <div className="row">
  <h4>Task Assigned by You</h4>
  <table className="data-tables">
  <thead>
  <tr>
  <th width="150">Task Name</th>
  <th width="250">Task Details</th>
  <th width="150">Assigned To</th>
  <th width="150">Assigned On</th>
  <th width="150">Due Date</th>
  <th width="150">Status</th>
  <th width="100">Action</th>
  </tr>
  </thead>
  <tbody>

    {  this.state.taskby.map(function(val) {
        return(
        <tr key={val.id}>
          <td width="150">{val.title}</td>
          <td width="250">{val.details}</td>
          <td width="150">{that.state.userlist[val.taskto]}</td>
          <td width="150">{val.date}</td>
          <td width="150">{val.duedate}</td>
          <td width="150">{val.status}</td>
          <td width="100"><a href={"/delete/"+val.id+"/"+val.taskby}>Delete</a></td>
          </tr>
        )
    })
    }
  </tbody>
  </table>
      </div>
    )
  }
  })

  module.exports = Tasks

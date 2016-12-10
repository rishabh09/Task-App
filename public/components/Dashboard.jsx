import React from 'react'
import IO from 'io-square-browser'

const Dashboard = React.createClass({
  componentWillMount:function(){
    IO.getJSON('/getdashboard')
      .then((reply)=>{
        this.setState({
          taskto:reply.taskto,
          taskby:reply.taskby,
          userlist:reply.userlist
        })
      })

  },

  render: function(){
    var that = this
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
        <h4>Task Assigned to You</h4>
        <table className="data-tables">
    <thead>
      <tr>
        <th width="150">Task Name</th>
        <th width="250">Task Details</th>
        <th width="150">Assigned By</th>
        <th width="150">Assigned On</th>
        <th width="150">Due Date</th>
        <th width="150">Status</th>
        <th width="100">Action</th>
      </tr>
    </thead>
    <tbody>

        {  this.state.taskto.map(function(val) {
            val = JSON.parse(val)
            return(
            <tr>
              <td width="150">{val.title}</td>
              <td width="250">{val.task_details}</td>
              <td width="150">{that.state.userlist[val.taskby_id]}</td>
              <td width="150">{val.date}</td>
              <td width="150">{val.duedate}</td>
              <td width="150">{val.status}</td>
              <td width="100">EDIT</td>
              </tr>
            )
        })
        }
    </tbody>
  </table>
<hr/>
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
        let valx = JSON.parse(val)
        return(
        <tr>
          <td width="150">{valx.title}</td>
          <td width="250">{valx.task_details}</td>
          <td width="150">{that.state.userlist[valx.taskto_id]}</td>
          <td width="150">{valx.date}</td>
          <td width="150">{valx.duedate}</td>
          <td width="150">{valx.status}</td>
          <td width="100">Delete</td>
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

module.exports = Dashboard

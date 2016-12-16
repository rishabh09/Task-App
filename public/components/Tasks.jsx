import React from 'react'
import {getJSON} from 'io-square-browser'
import Modal1 from 'react-modal'
import Chat from 'Chat'

const Tasks = React.createClass({
  componentWillMount:function(){
    getJSON('/usertasks')
      .then((reply)=>{
        this.setState({
          taskby:reply.taskby,
          userlist:reply.userlist,
          chats1:[]
                })
      })
      this.openModal1 = this.openModal1.bind(this);
      this.closeModal1 = this.closeModal1.bind(this);

  },
   openModal1:function(e) {
     console.log(this)
  console.log('open')
}
,
sendMessage1:function(){
  let chats1 = this.state.chats1
  chats1.push(this.refs.chatmessage.value)
  this.refs.chatmessage.value = "";
  this.setState({
    chats1:chats1
  })
}
,
 closeModal1:function() { this.setState({open1: false});
console.log('close')}
 ,
  render: function(){
    var that = this

    if (!this.state) {
        return (    <div className="row">
              <br/>
              <table className="data-tables">
          <thead>
            <h1>Patience You Must Have My Young Padawan</h1>
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
        <th width="150">Comments</th>
        <th width="100">Action</th>
      </tr>
    </thead>
    <tbody>

        {  this.state.taskby.map(function(val) {
            return(
            <tr key = {val.id}>
              <td width="150">{val.title}</td>
              <td width="250">{val.details}</td>
              <td width="150">{that.state.userlist[val.taskby]}</td>
              <td width="150">{val.date}</td>
              <td width="150">{val.duedate}</td>
              <td width="150">{val.status}</td>
              <td width="150"><a href="#" onClick={that.openModal1.bind(this,val)}>Comments</a></td>
              <td width="100">EDIT</td>
              </tr>
            )
        })
        }
    </tbody>
  </table>
      <Modal1 className="ModalClass" shouldCloseOnOverlayClick="true"
            overlayClassName="OverlayClass" onRequestClose={this.closeModal1} isOpen={this.state.open1}>
            <div id="chatheader">
              {this.state.chattitle1}
              <button id="closebtn" onClick={this.closeModal1}>X</button>
            </div>
            <div ref="messages" id="messages">
              <Chat chats={this.state.chats1}/>
            </div>
            <form id="chatform" action="" onSubmit={this.sendMessage1}>
              <input type="text" ref="chatmessage" id="m" autocomplete="off" required/>
              <input type="submit" value="submit" />
            </form>
        </Modal1>
      </div>
    )
  }
})

module.exports = Tasks

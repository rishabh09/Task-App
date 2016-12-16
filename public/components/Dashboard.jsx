import React from 'react'
import {getJSON} from 'io-square-browser'
import Modal from 'react-modal'
import io from 'Socket'
const socket = io();

const Chat=React.createClass ({
  getInitialState:function(){
    return {
      chats:this.props.chats
    }
  },
  render:function(){
    return(<div>
      {
        this.state.chats.map(function(chat){
          return <h2>{chat}</h2>
        })
      }
</div>)
  }
})
const Dashboard = React.createClass({
  componentWillMount:function(){
    getJSON('/getdashboard')
      .then((reply)=>{
        this.setState({
          taskto:reply.taskto,
          userlist:reply.userlist,
          chats:[]
        })
      })
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);

  },
   openModal:function(e) {
   this.setState({
     chattitle:e.title,
     open: true});
}
,
sendMessage:function(){
  let chats = this.state.chats
  socket.emit('chat message', this.refs.chatmessage.value);
  chats.push(this.refs.chatmessage.value)
  this.refs.chatmessage.value = "";
  this.setState({
    chats:chats
  })
}
,
 closeModal:function() { this.setState({open: false}); }
 ,
  render: function(){
    var that = this

    console.log(this.state)
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

        {  this.state.taskto.map(function(val) {
            return(
            <tr key = {val.id}>
              <td width="150">{val.title}</td>
              <td width="250">{val.details}</td>
              <td width="150">{that.state.userlist[val.taskby]}</td>
              <td width="150">{val.date}</td>
              <td width="150">{val.duedate}</td>
              <td width="150">{val.status}</td>
              <td width="150"><a href="#" onClick={that.openModal.bind(this,val)}>Comments</a></td>
              <td width="100">EDIT</td>
              </tr>
            )
        })
        }
    </tbody>
  </table>
      <Modal className="ModalClass" shouldCloseOnOverlayClick="true"
            overlayClassName="OverlayClass" onRequestClose={this.closeModal} isOpen={this.state.open}>
            <div id="chatheader">
              {this.state.chattitle}
              <button id="closebtn" onClick={this.closeModal}>X</button>
            </div>
            <div ref="messages" id="messages">
              <Chat chats={this.state.chats}/>
            </div>
            <form id="chatform" action="" onSubmit={this.sendMessage}>
              <input type="text" ref="chatmessage" id="m" autocomplete="off" required/>
              <input type="submit" value="submit" />
            </form>
  </Modal>
      </div>
    )
  }
})

module.exports = Dashboard

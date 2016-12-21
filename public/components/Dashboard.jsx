import React from 'react'
import { getJSON } from 'io-square-browser'
import Modal from 'react-modal'
import io from 'Socket'
const socket = io()
import Chat from 'Chat'
import moment from 'moment'

const Dashboard = React.createClass({
  componentWillMount: function () {
    getJSON('/getdashboard')
      .then((reply) => {
        this.setState({
          taskto: reply.taskto,
          userlist: reply.userlist,
          chats: []
        })
      })
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  },
  openModal: function (e) {
    let that = this
    this.setState({
      chattitle: e.title,
      open: true,
      userid: this.state.userlist[e.taskto],
      chatid: e.id
    })
    socket.emit('join', {chatroom: e.id,user: this.state.userlist[e.taskto]})
    socket.on('recieved-chats', function (data) {
      let chats = that.state.chats
      chats.push(data)
      console.log(data)
      that.setState({
        chats: chats
      })
    })
  },
  sendMessage: function () {
    let time = moment().format('HH:mm:ss DD-MM-YY')
    socket.emit('chat message', {chatroom: this.state.chatid,username: this.state.userid,message: this.refs.chatmessage.value,time: time})
    this.refs.chatmessage.value = ''
  },
  closeModal: function () {
    socket.emit('leave', {chatroom: this.state.chatid,username: this.state.userid})
    this.setState({open: false,
      chats: []
    }
    )
  },
  render: function () {
    var that = this
    if (!this.state) {
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
        <h4>Task Assigned to You</h4>
        <table className='data-tables'>
          <thead>
            <tr>
              <th width='150'>
                Task Name
              </th>
              <th width='250'>
                Task Details
              </th>
              <th width='200'>
                Assigned By
              </th>
              <th width='150'>
                Assigned On
              </th>
              <th width='150'>
                Due Date
              </th>
              <th width='150'>
                Status
              </th>
              <th width='150'>
                Comments
              </th>
              <th width='100'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.taskto.map(function (val) {
               return (
                 <tr key={val.id}>
                   <td width='150'>
                     {val.title}
                   </td>
                   <td width='250'>
                     {val.details}
                   </td>
                   <td width='200'>
                     {that.state.userlist[val.taskby]}
                   </td>
                   <td width='150'>
                     {val.date}
                   </td>
                   <td width='150'>
                     {val.duedate}
                   </td>
                   <td width='150' className={val.status}>
                     {val.status}
                   </td>
                   <td width='150'>
                     <button className='CommentBtn' onClick={that.openModal.bind(this, val)}>
                       Comments
                     </button>
                   </td>
                   <td width='100'>
                     <a href={'/updatetask/' + val.id + '/' + val.taskto + '/' + val.status}>EDIT</a>
                   </td>
                 </tr>
               )
             })}
          </tbody>
        </table>
        <Modal
          className='ModalClass'
          shouldCloseOnOverlayClick='true'
          overlayClassName='OverlayClass'
          onRequestClose={this.closeModal}
          isOpen={this.state.open}>
          <div id='chatheader'>
            {this.state.chattitle}
            <button id='closebtn' onClick={this.closeModal}>
              X
            </button>
          </div>
          <div ref='messages' id='messages'>
            <Chat chats={this.state.chats} chatid={this.state.chatid}/>
          </div>
          <form id='chatform' action='' onSubmit={this.sendMessage}>
            <input
              type='text'
              ref='chatmessage'
              id='m'
              autocomplete='off'
              required/>
            <input type='submit' value='submit' />
          </form>
        </Modal>
      </div>
    )
  }
})

module.exports = Dashboard

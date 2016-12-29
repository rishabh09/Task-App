import React from 'react'
import { getJSON } from 'io-square-browser'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import moment from 'moment'

const Chat = React.createClass({

  componentWillMount: function () {
    getJSON('/oldchats/' + this.props.chatid).then((reply) => {
      this.setState({
         user_id: this.props.user_id,
        userlist: this.props.userlist,
        oldchats: reply
      })
    })
  },
sendMessage: function () {
    let time = moment().format('HH:mm:ss DD-MM-YY')
    socket.emit('chat message', {chatroom: this.state.chatid,username: this.state.userid,uid: this.state.uid,message: this.refs.chatmessage.value,time: time})
    this.refs.chatmessage.value = ''
  },


  render: function () {
    let that = this
      if (!this.state) {
        return (<div ref="chatlist">
             ....Please Wait....
              </div>)
      }
        return (<div className='chatPanel'>
              <div className='chatList'>
              {this.state.oldchats.map(function (chat) {
                 let chatx = JSON.parse(chat)
                 return (<div className='chats right'>
                           <div className='data'>
                               {chatx.message}
                             </div>
                           
                           <div className='details'>
                            <div className='name'>
                             {chatx.username}
                           </div>
                             <div className='time'>
                               {chatx.time}
                             </div>
                           </div>
                         </div>)
                  }
              )}
              </div>
              <div className="chatForm">
              <form id='chatform'  onSubmit={this.sendMessage}>
               <TextField style={{width:'80%'}} />
                <RaisedButton label="Primary" primary={true} style={{width:'20%', float:'right'}}/>
               </form>
               </div>
            </div>)
  }
})


module.exports = Chat

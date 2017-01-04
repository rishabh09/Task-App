import React from 'react'
import { getJSON } from 'io-square-browser'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import moment from 'moment'
import ChatList from 'ChatList'
import io from 'Socket'
const socket = io()

const Chat = React.createClass({
getInitialState:function(){
  return({
        chats:[]
  })
},
  componentWillMount: function () {
    getJSON('/oldchats/' + this.props.chatid).then((reply) => {
      console.log(this.props.userlist[this.props.userid])
      console.log(this.props.userid)
      this.setState({
         user_id: this.props.userid,
        userlist: this.props.userlist,
        username: this.props.userlist[this.props.userid],
        oldchats: reply
            })
    })
   socket.emit('join', {chatroom: this.props.chatid,user: this.props.userlist[this.props.userid]})
  },
sendMessage: function () {
    let time = moment().format('HH:mm DD-MM-YY')
    socket.emit('chat message', {chatroom: this.props.chatid,username: this.state.username,userid:this.props.userid,message: this.refs.chatmessage.input.value,time: time})
    this.refs.chatmessage.input.value = ''
  },

componentDidMount:function(){
let that = this
 let chats = this.state.chats
  socket.on('recieved-chats', function (data) {
  chats.push(data)
  that.setState({
    chats: chats
   })
})
},
  render: function () {
    let that = this
      if (!this.state.oldchats) {
        return (<div ref="chatlist">
             ....Please Wait....
              </div>)
      }
        return (<div className='chatPanel'>
              <ChatList chatid={this.props.chatid} userid={this.props.userid} oldchats={this.state.oldchats} chats={this.state.chats}/>    
              <div className="chatForm">
              <form id='chatform'  onSubmit={this.sendMessage}>
               <TextField ref='chatmessage' style={{width:'80%'}} />
                <RaisedButton type="submit" label="Primary" primary={true} style={{width:'20%', float:'right'}}/>
               </form>
               </div>
               </div>
          )
  }
})


module.exports = Chat

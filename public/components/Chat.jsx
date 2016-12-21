import React from 'react'
import { getJSON } from 'io-square-browser'


const Chat=React.createClass ({
  getInitialState:function(){
    return {
      chats:this.props.chats
    }
  },
  componentWillMount:function(){
    getJSON('/oldchats/'+this.props.chatid).then((reply)=>{
      this.setState({
        oldchats:reply
      })
    })
  },



  render:function(){
    let chats = [...new Set(this.state.chats)];
    if(!this.state.oldchats){
      return (<div>....Please Wait....</div>)
    }
    return(<div>
     {  
        this.state.oldchats.map(function(chat){
          let chatx = JSON.parse(chat)
          console.log(chatx)
          return <div>{chatx.username+" : "+chatx.message+"  "+chatx.time}</div>
        })
      }
      {
        chats.map(function(chat){
          return <div>{chat.username+" : "+chat.message+"  "+chat.time}</div>
        })
      }
</div>)
  }
})

module.exports = Chat

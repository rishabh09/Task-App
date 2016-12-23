import React from 'react'
import { getJSON } from 'io-square-browser'
import ReactDom from 'react-dom'

const Chat = React.createClass({
  getInitialState: function () {
    return {
      chats: this.props.chats,
      uid:this.props.uid
    }
  },
  componentWillMount: function () {
    getJSON('/oldchats/' + this.props.chatid).then((reply) => {
      this.setState({
        oldchats: reply
      })
    })
  },
  componentWillUpdate:function(){
      console.log(this.refs.chatlist.scrollTop,this.refs.chatlist.scrollHeight)
      this.refs.chatlist.scrollTop = this.refs.chatlist.scrollHeight
      console.log(this.refs.chatlist.scrollTop,this.refs.chatlist.scrollHeight)

  },

  render: function () {
    let that = this
    let chats = [...new Set(this.state.chats)]
      if (!this.state.oldchats) {
        return (<div ref="chatlist">
                ....Please Wait....
              </div>)
       }
    return (<div id="chatlist" ref="chatlist">
              {this.state.oldchats.map(function (chat) {
                 let chatx = JSON.parse(chat)
                 if(that.state.uid === chatx.uid){
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
                  else{
                    return (<div className='chats left'>
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
                 })}
              {chats.map(function (chat) {
                 if(that.state.uid === chat.uid){
                 return (
                   <div className='chats right'>
                     <div className='data'>
                       {chat.message}
                     </div>
                     <div className='details'>
                       <div className='name'>
                         {chat.username}
                       </div>
                       <div className='time'>
                         {chat.time}
                       </div>
                     </div>
                   </div>)
                 }else{
                    return (
                   <div className='chats left'>
                     <div className='data'>
                       {chat.message}
                     </div>
                     <div className='details'>
                       <div className='name'>
                         {chat.username}
                       </div>
                       <div className='time'>
                         {chat.time}
                       </div>
                     </div>
                   </div>)
                 }
               })}
            </div>)
  }
})

module.exports = Chat

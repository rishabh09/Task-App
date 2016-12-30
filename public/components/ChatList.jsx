import React from 'react'
import io from 'Socket'
const socket = io()

const ChatList = React.createClass({
getInitialState: function(){
    return ({
        oldchats:this.props.oldchats,
        chats:this.props.chats,
        blank: this.props.chatid+"blank",
        userid:this.props.userid
    })
},
componentDidUpdate:function(){
           this.refs[this.state.blank].scrollIntoView() 
},
  componentDidMount:function(){
           this.refs[this.state.blank].scrollIntoView() 
},
render: function(){
    let that = this
    console.log(this.props.chats)
    return ( <div className='chatList' >
            {this.state.oldchats.map(function (chat) {
                 let chatx = JSON.parse(chat)
                 if(that.state.userid === chatx.userid){
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
              {this.state.chats.map(function (chat) {
                 if(that.state.userid === chat.userid){
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
            <div ref={this.state.blank}></div>
              </div>)
}


})

module.exports = ChatList
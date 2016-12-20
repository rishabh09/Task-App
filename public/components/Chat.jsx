import React from 'react'

const Chat=React.createClass ({
  getInitialState:function(){
    return {
      chats:this.props.chats
    }
  },
  componentDidUpdate:function(){
    console.log(this.refs)
  this.refs.elem.scrollTo(0);
  },

  render:function(){
    let chats = [...new Set(this.state.chats)];
    return(<div refs="elem">
      {
        chats.map(function(chat){
          return <div>{chat.username+" : "+chat.message+"  "+chat.time}</div>
        })
      }
</div>)
  }
})

module.exports = Chat

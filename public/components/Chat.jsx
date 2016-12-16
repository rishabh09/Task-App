import React from 'react'

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

module.exports = Chat

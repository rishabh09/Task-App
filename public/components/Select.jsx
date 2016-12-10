import React from 'react'
import IO from IO
var indents = [];
const Select = React.createClass({
    axios.get('/getuserdata').then((reply)=>{
      for (let val in reply.data){
              console.log(val,reply.data[val])
              indents.push(<option value={val}>{reply.data[val]}</option>)
      }

    })
  render: function(){
    return (<div>
      {indents}
    </div>)
  }

})

module.exports = Select

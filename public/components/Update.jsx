import React from 'react'
import IO from 'io-square-browser'
const Update = React.createClass({
  componentWillMount: function(){
    IO.getJSON('/userdata').then((reply)=>{
      console.log(reply)

      this.setState({
        id: reply.id,
        Mobile: reply.Mobile,
        fname: reply.fname,
        lname: reply.lname,
        email: reply.email

      })
    })
  },
  render: function(){
    if (!this.state){
return <div><h1>Patience You Must Have My Young Padawan</h1></div>
      }
    return (
      <div>
        <form>
          <div className="row">
            First Name
            <input type="text" name="fname" className="small-6 columns" value={this.state.fname} />
              <br/>
            Last Name
            <input type="text" name="lname" className="small-6 columns" value={this.state.lname} />
              <br/>
            Email
            <input type="email" name="email" className="small-6 columns" value={this.state.email} />
            <br/>
            <button type="submit" className="success button">Submit</button>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = Update

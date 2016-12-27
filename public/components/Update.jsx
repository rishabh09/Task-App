import React from 'react'
import { getJSON } from 'io-square-browser'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Back from 'material-ui/svg-icons/content/reply'
import { IndexLink, Link } from 'react-router'
import TextField from 'material-ui/TextField'


const Update = React.createClass({
  componentWillMount: function () {
    getJSON('/userdata').then((reply) => {
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
  render: function () {
    if (!this.state) {
      return <div class='row'>
               <h1>Patience You Must Have My Young Padawan</h1>
             </div>
    }
    return (
      <div className='row'>
        <form name="Update-Form" method="post" action="/updateuser" >
          <div className='updateForm'>
           <div id="fname_div" className="formRows">
            <label>
              First Name
            </label>
            <TextField
            style={{float:'right'}}
             name='fname'
             defaultValue={this.state.fname}
             required
            />
            </div>
            <br/>
            <div id="lname_div" className="formRows">
            <label>
              Last Name
            </label>
            <TextField
            style={{float:'right'}}
             name='lname'
             defaultValue={this.state.lname}
             required
            />
            </div>
            <br/>
            <div id="email_div" className="formRows">
            <label>
              Email
            </label>
            <TextField
            style={{float:'right'}}
             name='email'
             defaultValue={this.state.email}
             required
            />
            </div>
            <button type='submit' className='success button'>
              Submit
            </button>
          </div>
        </form>
            <IndexLink to='/' activeClassName='active'>
        <FloatingActionButton style={{ position: 'fixed',bottom: '5%',right: '5%'}}>
          <Back />
        </FloatingActionButton>
        </IndexLink>
      </div>
    )
  }
})

module.exports = Update

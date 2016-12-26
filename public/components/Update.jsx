import React from 'react'
import { getJSON } from 'io-square-browser'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Back from 'material-ui/svg-icons/content/reply'
import { IndexLink, Link } from 'react-router'

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
        <form>
          <div className='updateForm'>
            <label for='fname'>
              First Name
            </label>
            <input type='text' name='fname' value={this.state.fname} />
            <label for='lname'>
              Last Name
            </label>
            <input type='text' name='lname' value={this.state.lname} />
            <br/>
            <label for='email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={this.state.email} />
            <br/>
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

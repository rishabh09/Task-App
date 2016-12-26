import React from 'react'
import { getJSON } from 'io-square-browser'
import 'style!css!react-datepicker/dist/react-datepicker.css'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import DatePicker from 'material-ui/DatePicker'
import Back from 'material-ui/svg-icons/content/reply'
import { IndexLink, Link } from 'react-router'
import areIntlLocalesSupported from 'intl-locales-supported'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
let DateTimeFormat;


const minDate = new Date();

if (areIntlLocalesSupported(['en-IN'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/en-IN');
}

const Create = React.createClass({

 handleChange :function(event, index, value){
    this.setState({
      select: value})
      console.log(value)
 },
  
  componentWillMount: function () {
    getJSON('/getuserdata').then((reply) => {
      this.setState({
        select:0,
        data: reply})
    })

  },
  render: function () {
    console.log(minDate);
    if (!this.state) {
      return <div class='row'>
               <h1>Patience You Must Have My Young Padawan</h1>
             </div>
    }
    return (
      <div className='row'>
        <form name='taskform' method="post" action="/formsubmit">
          <div className='taskform'>
            <div id="taskto_id_div" className="formRows">
            <label>
              Assigned To
            </label>
              <select style={{float:'right'}} required name='taskto_id'>
              <option value='' disabled selected>
                User
              </option>
              {this.state.data.map(function (val) {
                 return (
                   <option key={val.id} value={val.id}>
                     {val.fname +" "+val.lname}
                   </option>
                 )
               })}
            </select>
            </div>
              <br/>
            <div id="task_name_div" className="formRows">
          
            <label>
              Task Name
            </label>
            <TextField
            style={{float:'right'}}
             name='task_name'
             required
            />
            </div>
            <br />
            <div id="task_details_div" className="formRows">
            <label>
              Task Details
            </label>
             <TextField
             style={{float:'right'}}
              name='task_details'
              multiLine={true}
              rows={1}
              rowsMax={4}
              required
              />
              </div>
              <br />
              <div id="duedate_div" className="formRows">
           <label>Due Date</label>
  <DatePicker locale="en-IN" style={{float:'right'}}
                  minDate = {minDate}
                  DateTimeFormat={DateTimeFormat}
                  formatDate={new DateTimeFormat('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }).format}
                  name="duedate"
                  hintText="Due Date" 
                  required/>
              </div>
            <br/>
            <div id="submit_div" className="formRows">
            <button type='submit' className='success button'>
              Submit
            </button>
            </div>
            <br/>
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

module.exports = Create

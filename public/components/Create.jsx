import React from 'react'
import {getJSON} from 'io-square-browser'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'style!css!react-datepicker/dist/react-datepicker.css';
const Create = React.createClass({

    handleChange: function(date) {
        this.setState({startDate: date});
    },
    dateChange: function(date) {
        this.setState({dueDate: date});
    },
    componentWillMount: function() {
        getJSON('/getuserdata').then((reply) => {
            this.setState({data: reply, startDate: moment(), dueDate: moment()})
        })
    },
    render: function() {
        if (!this.state) {
            return <div class="row">
                <h1>Patience You Must Have My Young Padawan</h1>
            </div>
        }
        return (
            <div className="row">
                <form name="taskform" method="post" action="/formsubmit">
                    <div className="taskform">
                        <label>Assigned To</label>
                        <select required name="taskto_id">
                            <option value="" disabled selected>User</option>
                            {this.state.data.map(function(val) {
                                return (
                                    <option key={val.id} value={val.id}>{val.fname} {val.lname}</option>
                                )
                            })
                            }
                        </select>
                        <br/>
                        <label>Task Name</label>
                        <input type="text" name="task_name" className="small-6 columns" required/>
                        <br/>
                        <label>Task Details</label>
                        <input type="text" name="task_details" className="small-6 columns" required/>
                        <br/>
                        <label>Task Date</label>
                        <DatePicker name="date" className="small-6 columns" selected={this.state.startDate} dateFormat="DD/MM/YYYY" onChange={this.handleChange.bind(this)} required/>
                        <br/>
                        <label>Due Date</label>
                        <DatePicker name="duedate" className="small-6 columns" selected={this.state.dueDate} dateFormat="DD/MM/YYYY" onChange={this.dateChange.bind(this)} required/>
                        <br/>
                        <button type="submit" className="success button">Submit</button>
                        <br/>
                    </div>
                </form>
            </div>
        )
    }
})

//
// method="post" action="http://localhost:3000/formdata"
module.exports = Create

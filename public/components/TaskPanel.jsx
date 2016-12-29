import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { VelocityTransitionGroup } from 'velocity-react'
import Chat from 'Chat'

const Panel = React.createClass({
  componentWillMount: function () {
    this.setState({
      panel: false
    })
  },

  handleClick: function (e) {
    this.setState({
      panel: !this.state.panel
    })
  },
  handleClose: function (e) {
    this.setState({
      panel: false
    })
  },
  render: function () {
    const buttonStyle = {
      marginLeft: '3%',
      marginBottom: '1%'
    }
    return (
      <div className='taskPannel'>
        <div style={{width:'63%',float: 'left',paddingTop:'0.5%'}}>
          <div className='taskDetails'>
            {this.props.details}
          </div>
          <div className='taskAction'>
            <RaisedButton label='Update Task' style={buttonStyle} primary={true} />
            {(this.props.taskby === this.props.userid) ? (<RaisedButton
                                                             style={buttonStyle}
                                                             backgroundColor='#FF5252'
                                                             labelColor='#ffffff'
                                                             label='Delete' />) : null}
            <RaisedButton
              onClick={this.handleClick}
              label='Comment'
              style={buttonStyle}
              backgroundColor='#006064'
              labelColor='#ffffff' />
          </div>
        </div>
        <div className='taskPersons'>
          <em>Assigned By</em> <strong>{this.props.userlist[this.props.taskby]}</strong>
          <br />
          <br/>
          <em>Assigned To</em> <strong>{this.props.userlist[this.props.taskto]}</strong>
          <br />
          <br/>
          <em>Assigned On</em> <strong>{this.props.date}</strong>
          <br />
          <br/>
          <em>Due Date</em> <strong>{this.props.duedate}</strong>
               <br/> <br/>
          <em>Status</em> <strong className={this.props.status}>{this.props.status}</strong>
        </div>
        <div style={{clear: 'both'}}></div>
        <VelocityTransitionGroup enter={{animation: 'slideDown'}} leave={{animation: 'slideUp'}}>
          {this.state.panel ? <Chat chatid={this.props.id} userid={this.state.userid} userlist={this.props.userlist}/> : null}
        </VelocityTransitionGroup>
      </div>
    )
  }
})
module.exports = Panel

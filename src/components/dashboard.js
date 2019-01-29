import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, focus } from 'redux-form'
import requiresLogin from './requires-login'
import { fetchProtectedData } from '../actions/protected-data'

export class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { guess: null }
  }
  componentDidMount() {
    this.props.dispatch(fetchProtectedData())
  }
  handleSubmit = e => {
    e.preventDefault()
  }
  handleChange = e => {
    this.setState({ guess: e.target.value })
  }
  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-username">: {this.props.username}</div>

        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              value={this.state.guess}
              onChange={this.handleChange}
              type="text"
              name="guess"
              placeholder="enter the translation"
            />
            <button value="Submit" type="submit">
              ENTER
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data
  }
}

export default requiresLogin()(connect(mapStateToProps)(Dashboard))

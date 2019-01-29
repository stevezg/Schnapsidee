import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, focus } from 'redux-form'
import requiresLogin from './requires-login'
import {fetchWord} from '../actions/words';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { guess: null }
  }
  componentDidMount() {
    this.props.dispatch(fetchWord());
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
        <div className="dashboard-username">
          Hello, welcome {this.props.username}!
        </div>
        <div>
          <p>{this.props.currentWord}</p>
        </div>
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

const mapStateToProps = state => ({
  currentWord: state.word.currentWord,
  currentTranslation: state.word.currentTranslation
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard))

import React from 'react'
import { connect } from 'react-redux'

import requiresLogin from './requires-login'
import { fetchWord } from '../actions/words'

export class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { guess: '' }
  }
  componentDidMount() {
    this.props.dispatch(fetchWord())
  }
  handleSubmit = e => {
    e.preventDefault()
    e.currentTarget.reset() //not working
    console.log(e.currentTarget)
    if (this.state.guess === this.props.currentTranslation) {
      console.log('guess was correct')
      this.props.dispatch(fetchWord())
    } else {
      console.log(
        `guess was not correct, the correct answer is ${
          this.props.currentTranslation
        }`
      )
    }
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
          <p>Guess the English translation of this German Word: </p>
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
})

export default requiresLogin()(connect(mapStateToProps)(Dashboard))

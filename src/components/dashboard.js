import React from 'react'
import { connect } from 'react-redux'

import requiresLogin from './requires-login'
import { fetchWord, submitAnswer } from '../actions/words'

export class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { guess: '', sumbittedGuess: false, correct: false }
  }
  componentDidMount() {
    this.props.dispatch(fetchWord())
  }
  handleSubmit = e => {
    e.preventDefault()
    e.currentTarget.reset() //not working
    console.log(e.currentTarget)
    this.setState({ sumbittedGuess: true })
    if (this.state.guess === this.props.currentTranslation) {
      this.props.dispatch(submitAnswer(this.props.currentM * 2))
      console.log('guess was correct')
      this.setState({ correct: true })
    } else {
      this.props.dispatch(submitAnswer(1))
      console.log(
        `guess was not correct, the correct answer is ${
          this.props.currentTranslation
        }`
      )
      this.setState({ correct: false })
      console.log()
    }
  }
  handleChange = e => {
    this.setState({ guess: e.target.value })
  }
  handleClick = () => {
    this.setState({ sumbittedGuess: false })
    this.props.dispatch(fetchWord())
  }
  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Hello, welcome {this.props.username}!
        </div>

        {this.state.correct && this.state.sumbittedGuess && (
          <div className="success">guess was correct</div>
        )}
        {this.state.correct === false && this.state.sumbittedGuess && (
          <div className="error">{`guess was not correct, the correct answer is ${
            this.props.currentTranslation
          }`}</div>
        )}

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
        {this.state.sumbittedGuess && (
          <div>
            <button onClick={this.handleClick}>NEXT</button>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentWord: state.word.currentWord,
  currentTranslation: state.word.currentTranslation,
  currentM: state.word.currentM
})

export default requiresLogin()(connect(mapStateToProps)(Dashboard))

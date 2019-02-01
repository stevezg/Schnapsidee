import React from 'react'
import { connect } from 'react-redux'

import requiresLogin from './requires-login'
import { fetchWord, submitAnswer, fetchProgress } from '../actions/words'

// import './dashboard.css'

export class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      guess: '',
      sumbittedGuess: false,
      correct: false,
      progress: false
    }
  }
  componentDidMount() {
    this.props.dispatch(fetchWord())
  }
  handleSubmit = e => {
    e.preventDefault()
    e.currentTarget.reset() //not working
    console.log(e.currentTarget)
    this.setState({ sumbittedGuess: true, progress: false })
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
  handleProgress() {
    this.setState({ progress: !this.state.progress })
    this.props.dispatch(fetchProgress())
  }
  render() {
    let progressButtonText = 'View your progress'
    if (this.state.progress) progressButtonText = 'Hide your progress'
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
        <div className="buttonGroup">
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

          {this.state.sumbittedGuess && (
            <div>
              <button onClick={this.handleClick}>NEXT</button>
            </div>
          )}
        </div>
        {this.state.sumbittedGuess && (
          <div>
            <button onClick={this.handleClick}>NEXT</button>
          </div>
        )}
        {this.state.progress && (
          <div className="progress">{`You have mastered ${
            this.props.countCompleted
          } words out of ${this.props.countTotal}.`}</div>
        )}
        <button onClick={() => this.handleProgress()}>
          {progressButtonText}
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentWord: state.word.currentWord,
  currentTranslation: state.word.currentTranslation,
  currentM: state.word.currentM,
  countCompleted: state.word.countCompleted,
  countTotal: state.word.countTotal
})

export default requiresLogin()(connect(mapStateToProps)(Dashboard))

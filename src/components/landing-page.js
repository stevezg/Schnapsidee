import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import LoginForm from './login-form'

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="home">
      <div className="inner">
        <h2 className="header">Welcome to Schnapsidee</h2>
        <p>
          Learn German fast! We use a spaced repetition algorithm to provide
          efficient learning to overcome the 'forgetting curve.' Come learn with
          us, it'll be fantastisch!
        </p>
        <LoginForm />
        <Link to="/register">
          <button className="button">Register</button>
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(LandingPage)

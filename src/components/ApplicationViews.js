import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from './login/Login'

export default class ApplicationViews extends Component {

  isAuthenticated = () => sessionStorage.getItem("valid") !== null

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/login" render={props => {
            return <Login />
            // Remove null and return the component which will handle authentication
          }}
        />

        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/events" render={props => {
            return null
            // Remove null and return the component which will show the user's events
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}

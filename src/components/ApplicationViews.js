import { Route } from "react-router-dom";
import React, { Component } from "react";
import TaskList from './Tasks/TaskList'
import TaskManager from '../modules/TaskManager'


export default class ApplicationViews extends Component {

  state = {
    events: [],
    tasks: [],
    news: [],
    messages: [],
    friends: []
  }

  componentDidMount () {
    const newState = {}
    TaskManager.getAll()
    .then(tasks => newState.tasks = tasks)
    .then(() => this.setState(newState))
  }
  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/login" render={props => {
            return null
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
            return <TaskList tasks={this.state.tasks}
            />
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}

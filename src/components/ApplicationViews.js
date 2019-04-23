import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import TaskList from './Tasks/TaskList'
import TaskManager from '../modules/TaskManager'
import Login from './login/Login'
import ResourceManager from '../modules/ResourceManager'
import TaskForm from "./Tasks/TaskForm";
import EventForm from './events/EventForm'
import EventList from './events/EventList'
import Articles from "./articles/Articles"

export default class ApplicationViews extends Component {

  state = {
    users: [],
    messages: [],
    articles: [],
    friends: [],
    tasks: [],
    events: [],
    userId: "",
    friendsArticles: [],
    friendsEvents: []
  }

  componentDidMount() {
    let currentUserId = sessionStorage.getItem("userID")

    this.loadAllData(currentUserId)
  }

  loadAllData = (currentUserId) => {
    const newState = {

    }

    ResourceManager.getAll("messages", currentUserId)
      .then(messages => newState.messages = messages)
      .then(() => ResourceManager.getAll("articles", currentUserId))
      .then(articles => newState.articles = articles)
      .then(() => ResourceManager.getAll("friends", currentUserId))
      .then(friends => newState.friends = friends)
      .then(() => ResourceManager.getAll("tasks", currentUserId))
      .then(tasks => newState.tasks = tasks)
      .then(() => ResourceManager.getAll("events", currentUserId))
      .then(events => newState.events = events)
      .then(() => ResourceManager.getFriendsUserId(currentUserId))
      .then(r => r.map(entry => entry.user.id))
      .then(r => r.map(r => ResourceManager.getAll("articles", r)))
      .then(r => newState.friendsArticles = r)
      .then(() => ResourceManager.getFriendsUserId(currentUserId))
      .then(r => r.map(entry => entry.user.id))
      .then(r => r.map(r => ResourceManager.getAll("events", r)))
      .then(r => newState.friendsEvents = r)
      .then(() => this.setState(newState))
  }
addTask = task => TaskManager.post(task).then(() => this.loadAllData(sessionStorage.getItem("userID")))

onLogin = () => {
  this.setState({
    userId: sessionStorage.getItem("userID")
  })
  this.loadAllData(this.state.userId)
}

  isAuthenticated = () => sessionStorage.getItem("userID") !== null

  createEvent = (newEvent) => {
    return ResourceManager.postEntry(newEvent, "events")
      .then(() => ResourceManager.getAll("events", sessionStorage.getItem("userID")))
      .then(events => {
        this.setState({
          events: events
        })
      })
  }


  render() {
    console.log(this.state)
    return (
      <React.Fragment>

        <Route
          exact path="/login" render={props => {
            return <Login users={this.state.users}
              onLogin={this.onLogin} {...props} />
            // Remove null and return the component which will handle authentication
          }}
        />

        <Route
          exact path="/" render={props => {
            return <Articles articles={this.state.articles} friendsArticles={this.state.friendsArticles} />
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends" render={props => {
            if (this.isAuthenticated()) {
              return <div>Hello</div>
            } else {
              return <Redirect to="/login" />
            }
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          exact path="/events" render={props => {
            return <EventList {...props} events={this.state.events} />
          }}
        />
        <Route
          path="/events/new" render={props => {
            return <EventForm {...props} createEvent={this.createEvent} />
          }}
        />

        <Route
          exact path="/tasks" render={props => {
            return <TaskList {...props} tasks={this.state.tasks}
            />
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route path="/tasks/new" render={(props)=> {
          return <TaskForm {...props}
            addTask={this.addTask}
            />
        }} />
      </React.Fragment>
    );
  }
}

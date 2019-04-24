import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import TaskList from './Tasks/TaskList'
import TaskManager from '../modules/TaskManager'
import Login from './login/Login'
import ResourceManager from '../modules/ResourceManager'
import TaskForm from "./Tasks/TaskForm";
import Messages from "./messages/Messages"
import messageData from "./messages/messageManager"
import EditMessageForm from "./messages/MessageEditForm"
import EventForm from './events/EventForm'
import EventList from './events/EventList'
import Articles from "./articles/Articles"
import ArticleAddNewForm from "./articles/ArticleAddNewForm"
import TaskEditForm from './Tasks/TaskEditForm'
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

    messageData.getAllMessages()
      .then(messages => newState.messages = messages)
      .then(() => ResourceManager.getAll("articles", currentUserId))
      .then(articles => newState.articles = articles)
      .then(() => ResourceManager.getAll("friends", currentUserId))
      .then(friends => newState.friends = friends)
      .then(() => ResourceManager.getAll("tasks", currentUserId))
      .then(tasks => newState.tasks = tasks)
      .then(() => ResourceManager.getAll("events", currentUserId))
      .then(events => newState.events = events)
    ResourceManager.getAllUsers()
      .then(users => newState.users = users)
      .then(() => ResourceManager.getFriendsUserId(currentUserId))
      .then(r => r.map(entry => entry.user.id))
      .then(r => r.map(r => ResourceManager.getAll("articles", r)))
      .then(r => Promise.all(r))
      .then(r => newState.friendsArticles = r)
      .then(() => ResourceManager.getFriendsUserId(currentUserId))
      .then(r => r.map(entry => entry.user.id))
      .then(r => r.map(r => ResourceManager.getAll("events", r)))
      .then(r => Promise.all(r))
      .then(r => newState.friendsEvents = r)
      .then(() => this.setState(newState))
  }
addTask = task => TaskManager.post(task).then(() => this.loadAllData(sessionStorage.getItem("userID")))

updateTask = (editedTaskObject) => {
  return TaskManager.put(editedTaskObject).then(() => {
    this.loadAllData(sessionStorage.getItem("userID"))
  })
}
onLogin = () => {
  this.setState({
    userId: sessionStorage.getItem("userID")
  })
  this.loadAllData(this.state.userId)
}

  isAuthenticated = () => sessionStorage.getItem("userID") !== null

  constructNewMessage = (newMessage) => {
      return messageData.post(newMessage)
        .then(() => this.loadAllData(sessionStorage.getItem("userID")))
  }

  handleMessageUpdate = (editedMessage) => {
    
    messageData.update(editedMessage)
    .then(() => this.loadAllData())
}

//  getFriendsUserId = (userId) => {
//    ResourceManager.getFriendsUserId(userId)
//    .then(r => this.setState({
//      friendsUserId: r
//    }))
//  }
  
  createEvent = (newEvent) => {
    return ResourceManager.postEntry(newEvent, "events")
      .then(() => ResourceManager.getAll("events", sessionStorage.getItem("userID")))
      .then(events => {
        this.setState({
          events: events
        })
      })
  }


addItem = (path, object, currentUserId) => ResourceManager.postItem(path, object)
.then(() => ResourceManager.getAll(path, currentUserId))
.then(obj => {
  this.setState({[path]: obj})
})
  
  render() {
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
          exact path="/articles" render={props => {
            return <Articles articles={this.state.articles} friendsArticles={this.state.friendsArticles} {...props} addItem={this.addItem} />
            // Remove null and return the component which will show news articles
          }}
        />
        <Route path="/articles/new" render={(props) => {
          return <ArticleAddNewForm addItem={this.addItem} {...props} />
        }} />

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
          exact path="/messages" render={props => {
            if(this.isAuthenticated()){
              return <Messages {...props} messages={this.state.messages} users={this.state.users} sendMessage={this.constructNewMessage}/>
            } else {
                return <Redirect to="/login" />
            }
              
            
          }}
        />
        <Route
          exact path="/messages/:messageId(\d+)/edit" render={props => {
            if(this.isAuthenticated()){
              return <EditMessageForm {...props} messages={this.state.messages} users={this.state.users} handleMessageUpdate={this.handleMessageUpdate}/>
            } else {
              return <Redirect to="/login" />
            }
              
            
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

        <Route path="/tasks/:taskId(\d+)/edit" render={props => {
          return <TaskEditForm {...props} tasks={this.state.tasks} updateTask={this.updateTask} />
        }} />
      </React.Fragment>
    );
  }
}

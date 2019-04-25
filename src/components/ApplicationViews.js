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
import EventEditForm from './events/EventEditForm'
import EventList from './events/EventList'
import Articles from "./articles/Articles"
import ArticleAddNewForm from "./articles/ArticleAddNewForm"
import TaskEditForm from './Tasks/TaskEditForm'
import FriendsList from "./friends/FriendList"
import Register from "./login/Register"
import ArticleEditForm from "./articles/ArticleEditForm"

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
      .then(() => ResourceManager.getSortedArticles(currentUserId))
      .then(articles => newState.articles = articles)
      .then(() => ResourceManager.getFriendsUserId(currentUserId))
      .then(friends => newState.friends = friends)
      .then(() => TaskManager.getFalseTask(currentUserId))
      .then(tasks => newState.tasks = tasks)
      .then(() => ResourceManager.getAll("events", currentUserId))
      .then(events => newState.events = events)
      .then(() => ResourceManager.getAllUsers())
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

  onLogin = () => {
    this.setState({
      userId: sessionStorage.getItem("userID")
    })
    this.loadAllData(this.state.userId)
  }
updateTask = (editedTaskObject) => {
    return TaskManager.put(editedTaskObject).then(() => {
      this.loadAllData(editedTaskObject.userId)
    })
}

patchTask = (patchObject) => {
  return TaskManager.patchTask(patchObject).then(() => {
    this.loadAllData(patchObject.userId)
  })
}

onLogin = () => {
  this.setState({
    userId: sessionStorage.getItem("userID")
  })
  this.loadAllData(this.state.userId)
}

  isAuthenticated = () => sessionStorage.getItem("userID") !== null

  // Passed down as a prop to Messages component. This will post the new message to the database, then it will refresh state with the loadAllData function.

  constructNewMessage = (newMessage) => {
    return messageData.post(newMessage)
      .then(() => this.loadAllData(sessionStorage.getItem("userID")))
  }

  // Passed down to the MessageEditForm component. This will do a PUT request with the editedMessage, then call the loadAllData function to update the state with the updated data.

  handleMessageUpdate = (editedMessage) => {

    messageData.update(editedMessage)
      .then(() => this.loadAllData())
  }

  createEvent = (newEvent) => {
    return ResourceManager.postEntry(newEvent, "events")
      .then(() => ResourceManager.getAll("events", sessionStorage.getItem("userID")))
      .then(events => {
        this.setState({
          events: events
        })
      })
  }
  updateEvent = (eventToUpdate) => {
    return ResourceManager.updateEntry(eventToUpdate, "events")
      .then(() => ResourceManager.getAll("events", sessionStorage.getItem("userID")))
      .then(events => {
        this.setState({
          events: events
        })
      })
  }


  //function is called in ArticleAddNewForm. it performs a post request, then gets all updated data and setState to re render Articles with updated
  addItem = (path, object, currentUserId) => ResourceManager.postItem(path, object)
    .then(() => this.loadAllData(currentUserId))


  // The addFriend function is passed down to the userSearch component in the friends directory. It makes sure that the user isn't trying to add him/herself as a friend. Then it checks the current user's friends to make sure they aren't already friends. If they are friends, this process will not work and will alert the user. Then it will ask if the user is sure he/she wants to add this user as a friend. If so, we will create the newFriend object. The userId is the id of the user passed in as an argument. The currentUserId is grabbed from sessionStorage. Then we make a POST to the friends collection of our database.JSON. 

  // Next we get the updated list of the user's friends by doing a GET call. Then we take the promise value and update the local state with the response. This state will be used as a prop. If the username isn't found, it will alert the user.

  addFriend = (user) => {
    if (user.userName) {
      if (user.id === Number(sessionStorage.getItem("userID"))) {
        window.alert("You can't add yourself as a friend.")
      } else if (this.state.friends.find(friend => friend.user.userName.toLowerCase() === user.userName)) {
          window.alert("You already have this user as a friend.")
      } else {
        if (window.confirm(`Would you like to add ${user.userName} as a friend?`)) {
          const newFriend = {
            userId: user.id,
            currentUserId: Number(sessionStorage.getItem("userID"))
          }

          ResourceManager.postItem("friends", newFriend)
            .then(() => ResourceManager.getFriendsUserId(Number(sessionStorage.getItem("userID"))))
            .then(friends => this.setState({
              friends: friends
            }))
        } else {
          window.alert("Username not found")
        }
      }
    }
  }

  // The deleteFriend function is passed down to the Friends Component. This handles the functionality of making a DELETE call, and then loading all the updated data from the database with loadAllData. Then updating local state with the promise value.

  deleteFriend = (id) => {
    return ResourceManager.deleteItem("friends", id)
      .then(() => this.loadAllData(sessionStorage.getItem("userID")))
  }

  // The registerUser function is passed down as a prop to Register.js
  // It makes a POST to the users collection of our database.json. Then we GET the updated list of users, and pass in the promise value to local state.users.

  registerUser = (userToRegister) => {
    return ResourceManager.postEntry(userToRegister, "users")
      .then(() => ResourceManager.getAllUsers())
      .then(users => this.setState({
        users: users
      }))
  }

  //function is called when delete button is click, performs delete method, then re loads data with new state
  deleteItem = (path, id) => ResourceManager.deleteItem(path, id)
    .then(() => ResourceManager.getSortedArticles(sessionStorage.getItem("userID")))
    .then(r => {
      this.setState({
        [path]: r
      })
    })

  //function is called when edit form is saved. performs PUT method and re loads data with new state
  updateItem = (path, object) => ResourceManager.putItem(path, object)
    .then(() => ResourceManager.getSortedArticles(sessionStorage.getItem("userID")))
    .then(r => {
      this.setState({
        [path]: r
      })
    })

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/login" render={props => {
            return <Login users={this.state.users}
              onLogin={this.onLogin} {...props} />

          }}
        />
        <Route
          exact path="/register" render={props => {
            return <Register users={this.state.users}
              registerUser={this.registerUser} onLogin={this.onLogin} {...props} />

          }}
        />

        <Route exact path="/articles" render={props => {
          if (this.isAuthenticated()) {
            return <Articles articles={this.state.articles} friendsArticles={this.state.friendsArticles} {...props} addItem={this.addItem} deleteItem={this.deleteItem} users={this.state.users} />
          } else {
            return <Redirect to="/login" />
          }
        }} />

        <Route exact path="/articles/new" render={(props) => {
          return <ArticleAddNewForm addItem={this.addItem} {...props} />
        }} />

        <Route path="/articles/edit/:articleId(\d+)" render={(props) => {
          return <ArticleEditForm updateItem={this.updateItem} {...props} />
        }} />

        <Route
          path="/friends" render={props => {
            if (this.isAuthenticated()) {
              return <FriendsList {...props} friends={this.state.friends} addFriend={this.addFriend}
                deleteFriend={this.deleteFriend} />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          exact path="/messages" render={props => {
            if (this.isAuthenticated()) {
              return <Messages {...props} messages={this.state.messages} users={this.state.users} sendMessage={this.constructNewMessage} addFriend={this.addFriend}/>
            } else {
              return <Redirect to="/login" />
            }


          }}
        />
        <Route
          exact path="/messages/:messageId(\d+)/edit" render={props => {
            if (this.isAuthenticated()) {
              return <EditMessageForm {...props} messages={this.state.messages} users={this.state.users} handleMessageUpdate={this.handleMessageUpdate} />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />

        <Route
          exact path="/events" render={props => {
            return <EventList {...props} users={this.state.users} friendsEvents={this.state.friendsEvents} events={this.state.events} />
          }}
        />
        <Route
          path="/events/new" render={props => {
            return <EventForm {...props} createEvent={this.createEvent} />
          }}
        />

        <Route
          path="/events/:eventId(\d+)/edit" render={props => {
            return <EventEditForm {...props} updateEvent={this.updateEvent} />
          }}
        />

        <Route
          exact path="/tasks" render={props => {
            return <TaskList {...props} tasks={this.state.tasks} patchTask={this.patchTask}
            />
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route path="/tasks/new" render={(props) => {
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

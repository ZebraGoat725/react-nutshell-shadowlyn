import React, { Component } from 'react'
import TimeStamp from "./TimeStamp"

export default class ArticleAddNewForm extends Component {


  state = {
    title: "",
    synopsis: "",
    url: ""
  }

  //updates state as user types
  handleChange = event => {
    let newState = {}
    newState[event.target.id] = event.target.value
    this.setState(newState)
  }

  //function is called when user submit. creates object to POST and calls function to update state in application view and re routes user to /articles
  postNewItem = event => {

    event.preventDefault()

    const object = {
      title: this.state.title,
      synopsis: this.state.synopsis,
      url: this.state.url,
      userId: parseInt(sessionStorage.getItem("userID")),
      timeStamp: TimeStamp.getDate(new Date())
    }

    this.props.addItem("articles", object, sessionStorage.getItem("userID"))
      .then(() => this.props.history.push("/articles"))
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.postNewItem}>
          <div className="form-group">
            <label>New Title: </label>
            <input className="form-control" type="text" onChange={this.handleChange} id="title" placeholder="enter new title" />
          </div>
          <div className="form-group">
            <label>New Synopsis</label>
            <input className="form-control" type="text" onChange={this.handleChange} id="synopsis" placeholder="enter new synopsis" />
          </div>
          <div className="form-group">
            <label>URL</label>
            <input className="form-control" type="text" onChange={this.handleChange} id="url" placeholder="enter new URL" />
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>

      </React.Fragment>
    )
  }
}

// News title
// Synopsis
// URL
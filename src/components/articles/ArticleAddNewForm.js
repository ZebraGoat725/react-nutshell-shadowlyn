import React, { Component } from 'react'
import TimeStamp from "./TimeStamp"

export default class ArticleAddNewForm extends Component {


    state = {
        title: "",
        synopsis: "",
        url: ""
    }

    handleChange = event => {
        let newState = {}
        newState[event.target.id] = event.target.value
        this.setState(newState)
    }

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
          <label>New Title: </label>
          <input type="text" onChange={this.handleChange} id="title" />
          <label>New Synopsis</label>
          <input type="text" onChange={this.handleChange} id="synopsis" />
          <label>URL</label>
          <input type="text" onChange={this.handleChange} id="url" />
          <button type="submit">Submit</button>
        </form>
        
      </React.Fragment>
    )
  }
}

// News title
// Synopsis
// URL
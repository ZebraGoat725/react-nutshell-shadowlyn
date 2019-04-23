import React, { Component } from 'react'

export default class ArticleAddNewForm extends Component {
  getDate = (date) => {
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let hour = date.getHours()
    let minutes = date.getMinutes()
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year + " " + hour + ":" + minutes;
  }

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
            timeStamp: this.getDate(new Date())
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
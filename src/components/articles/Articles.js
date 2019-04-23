import React, { Component } from 'react'

export default class Articles extends Component {
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

  render() {
    // console.log(this.props.friendsArticles)
    return (
      <div>
        <u><h1>My Articles</h1></u>
        {
          this.props.articles.map(article =>
            <div key={article.id}>
              <h4>{article.title}</h4>
              <p>{article.synopisis}</p>
              <a href={article.url}>{article.url}</a>
              <p><strong>TimeStamp: </strong>{article.timeStamp}</p>
              <button onClick={() => this.props.history.push("/articles/edit")}>Edit</button>
              <button type="button" onClick={() => this.props.deleteItem("articles", article.id)}>Delete</button>
              <hr></hr>
            </div>
          )
        }
        <br></br>
        <u><h2>Friends Articles</h2></u>
        <br></br>
        {
          this.props.friendsArticles.map(entry =>
            <div key={entry[0].id}>
              <h4>{entry[0].title}</h4>
              <p>{entry[0].synopisis}</p>
              <a href={entry[0].url}>{entry[0].url}</a>
              <p><strong>TimeStamp: </strong>{entry[0].timeStamp}</p>
              <hr></hr>
            </div>
          )
        }
        
        <button onClick={() => this.props.history.push("/articles/new")}>Add New</button>
      </div>
    )
  }
}

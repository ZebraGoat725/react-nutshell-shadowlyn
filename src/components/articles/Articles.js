import React, { Component } from 'react'

export default class Articles extends Component {

//creates list of articles for user and user's friends
  render() {
    return (
      <div>
        <u><h1>My Articles</h1></u>
        {
          this.props.articles.map(article =>
            <div key={article.id}>
              <h4>{article.title}</h4>
              <p>{article.synopsis}</p>
              <a href={`http://${article.url}`} target="_blank">{article.url}</a>
              <p><strong>TimeStamp: </strong>{article.timeStamp}</p>
              <button onClick={() => this.props.history.push(`/articles/edit/${article.id}`)}>Edit</button>
              <button type="button" onClick={() => this.props.deleteItem("articles", article.id)}>Delete</button>
              <hr></hr>
            </div>
          )
        }
        <button onClick={() => this.props.history.push("/articles/new")}>Add New</button>
        <br></br>
        <br></br>
        <u><h2>Friends Articles</h2></u>
        <br></br>
        {
          this.props.friendsArticles.map(entry =>
            entry.map(entry => 
            <div key={entry.id}>
              <h4>{entry.title}</h4>
              <p>{entry.synopsis}</p>
              <a href={entry.url}>{entry.url}</a>
              <p><strong>TimeStamp: </strong>{entry.timeStamp}</p>
              <hr></hr>
            </div>     
              )
          )
        }
        
      </div>
    )
  }
}

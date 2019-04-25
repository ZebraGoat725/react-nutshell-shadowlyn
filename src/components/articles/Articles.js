import React, { Component } from 'react'
import "./article.css"

export default class Articles extends Component {
  //creates list of articles for user and user's friends
  render() {
    return (
      <div>
        <u><h1 className="card-header text-center">My Articles</h1></u>
        {
          this.props.articles.sort((a, b) => {
            const dateA = Date.parse(a.timeStamp)
            const dateB = Date.parse(b.timeStamp)
            return dateB - dateA
          }).map(article => 
            <div className="card text-center" key={article.id}>
              <div className="card-body divContainer">
                <h4 className="card-title">{article.title}</h4>
                <p className="card-text synopsisClass">{article.synopsis}</p>
                <a href={`http://${article.url}`} target="_blank">{article.url}</a>
                <p><strong>TimeStamp: </strong>{article.timeStamp}</p>
                <button className="btn btn-primary mr-1" onClick={() => this.props.history.push(`/articles/edit/${article.id}`)}>Edit</button>
                <button className="btn btn-primary" type="button" onClick={() => this.props.deleteItem("articles", article.id)}>Delete</button>
              </div>
            </div>
            )
        }
        {/* {
          this.props.articles.map(article =>
            <div className="card text-center" key={article.id}>
              <div className="card-body divContainer">
                <h4 className="card-title">{article.title}</h4>
                <p className="card-text synopsisClass">{article.synopsis}</p>
                <a href={`http://${article.url}`} target="_blank">{article.url}</a>
                <p><strong>TimeStamp: </strong>{article.timeStamp}</p>
                <button className="btn btn-primary mr-1" onClick={() => this.props.history.push(`/articles/edit/${article.id}`)}>Edit</button>
                <button className="btn btn-primary" type="button" onClick={() => this.props.deleteItem("articles", article.id)}>Delete</button>
              </div>
            </div>
          )
        } */}
        <div className="card-footer addNewButton">
          <button className="btn btn-primary btn-block buttonClass" onClick={() => this.props.history.push("/articles/new")}>Add New</button>
        </div>
        <br></br>
        <br></br>
        <u><h2 className="card-header text-center">Friends Articles</h2></u>
        <br></br>
        {
          this.props.friendsArticles.map(entry =>
            entry.map(entry =>
              <div className="card text-center" key={entry.id}>
                <div className="card-body divContainer friends-articles">
                  <h4 className="card-title">{entry.title}</h4>
                  <p className="card-text synopsisClass">{entry.synopsis}</p>
                  <a href={`http://${entry.url}`} target="_blank">{entry.url}</a>
                  <p><strong>TimeStamp: </strong>{entry.timeStamp}</p>
                  Created by User:{" "}
                  {this.props.users.find(user =>
                    user.id === entry.userId
                  ).userName}
                </div>
              </div>
            )
          )
        }

      </div>
    )
  }
}

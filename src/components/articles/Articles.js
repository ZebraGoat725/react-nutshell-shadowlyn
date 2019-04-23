import React, { Component } from 'react'

export default class Articles extends Component {
    // `${url}/friends?currentUserId=${userID}&_expand=user
    // getUserArticle = (userId) => {
    //     return fetch (`http://localhost:5002/friends?currentUserId=${userId}&_expand=user`)
    //     .then(r => r.json())
    //     .then(r => {
    //         return r})
    // }
  render() {
      console.log(this.props.friendsEvents)
    return (
      <div>
          <h1>My Articles</h1>
        {
            this.props.articles.map(article => 
                <div key={article.id}> 
                <h3>{article.title}</h3>
                <p>{article.date}</p>
                <p>{article.synopisis}</p>
                <hr></hr>
                </div>
                )
        }
      </div>
    )
  }
}

import React, { Component } from 'react'
import TimeStamp from "./TimeStamp"
import ResourceManager from "../../modules/ResourceManager"

export default class ArticleEditForm extends Component {


    state = {
        timeStamp: "",
        url: "",
        title: "",
        synopsis: "",
        userId: ""
    }

    //updates state as values are entered into input fields for edit form
    handleChange = event => {
        let newState = {}
        newState[event.target.id] = event.target.value
        this.setState(newState)
    }

    //function is called when submit button is clicked, creates object to be planted into a PUT method and calls function to re load data in application views
    updateArticle = (event) => {
        event.preventDefault()

        let object = {
            id: this.props.match.params.articleId,
            timeStamp: `Edited on: ${TimeStamp.getDate(new Date())}`,
            url: this.state.url,
            title: this.state.title,
            synopsis: this.state.synopsis,
            userId: parseInt(sessionStorage.getItem("userID"))
        }

        this.props.updateItem("articles", object)
            .then(() => this.props.history.push("/articles"))
    }

    //performs fetch call to pre fill the input fields with data
    componentDidMount() {
        ResourceManager.getOneEntry(this.props.match.params.articleId, "articles")
            .then(r => {
                this.setState({
                    url: r.url,
                    title: r.title,
                    synopsis: r.synopsis
                })
            })
    }

    //creates form
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.updateArticle}>
                    <div className="form-group">
                        <label>Article title: </label>
                        <input className="form-control" type="text" value={this.state.title} id="title" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Article synopsis: </label>
                        <input className="form-control" type="text" value={this.state.synopsis} id="synopsis" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Article URL: </label>
                        <input className="form-control" type="text" value={this.state.url} id="url" onChange={this.handleChange} />
                    </div>
                    <button className="btn btn-primary" type="submit">Save Changes</button>
                </form>

            </React.Fragment>
        )
    }
}

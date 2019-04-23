import React, { Component } from "react"
import messageData from "./messageManager"
import "./messages.css"



class Messages extends Component {

    state = {
        message: "",
        allMessages: []
    }

    handleChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }


    handleSubmit = (event) => {
        event.preventDefault();

            const message = {
                message: this.state.message,
                userId: Number(sessionStorage.getItem("userID"))
            }
            this.props.sendMessage(message)
                .then(() => this.setState({
                    message: "",
                    allMessages: this.props.messages
                }))
        
    }

    render() {
        return (
            <React.Fragment>
                <div className="card messages">
                    <div className="card-header">
                        Messages
                    </div>
                    <ul className="card-body message-list">
                        {this.props.messages.map(message => {
                            if (message.userId === Number(sessionStorage.getItem("userID"))) {
                                return <li className="card-text myMessages" key={message.id}>
                                    <div className="userName">
                                        {this.props.users.find(user => user.id === message.userId).userName}
                                        <button className="btn edit-button">
                                        Edit
                                        </button>
                                    </div>
                                    <div className="message">
                                        {message.message}
                                    </div>
                                </li>
                            } else {
                                return <li className="card-text otherMessages" key={message.id}>
                                <div className="userName">
                                    {this.props.users.find(user => user.id === message.userId).userName}
                                </div>
                                <div className="message">
                                    {message.message}
                                </div>
                            </li>
                            }
                        })}
                    </ul>
                    <form className="card-footer message-form">
                        <input onChange={this.handleChange}id="message" value={this.state.message} className="input mr-3"></input>
                        <button onClick={this.handleSubmit}className="btn btn-primary">Send</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Messages
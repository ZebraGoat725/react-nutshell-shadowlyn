import React, { Component } from "react"
import "./messages.css"

const userID = Number(sessionStorage.getItem("userID"))

class Messages extends Component {

    state = {
        message: ""
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
                userId: userID
            }
            this.props.sendMessage(message)
                .then(() => this.setState({
                    message: ""
                }))
        
    }

    render() {
        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-header">
                        Messages
                    </div>
                    <ul className="card-body">
                        {this.props.messages.map(message => {
                            if (message.userId === userID) {
                                return <li className="card-text myMessages" key={message.id}>
                                    <div className="userName">
                                        {this.props.users.find(user => user.id === message.userId).userName}
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
                    <form className="card-footer">
                        <input onChange={this.handleChange}id="message" value={this.state.message} className="input mr-3"></input>
                        <button onClick={this.handleSubmit}className="btn btn-primary">Send</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Messages
// Messages Component
// Author: Chris Morgan
// The purpose of the Messages component is to build the structure of the chat room. It also contains functionality for sending/editing messages.

import React, { Component } from "react"
import "./messages.css"

class Messages extends Component {

    // Initial local state // state.message represents the input field
    // state.allMessages will contain all user messages.

    state = {
        message: "",
        allMessages: []
    }

    // Updates our state.message in real time for the input field. See Register.js for more detailed explanation on how this function works.

    handleChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // When the user clicks submit, we call the handleSubmit function
    
    // First, we prevent browser default refresh from occuring.
    
    // Next, we create a message object that will be used to make a POST.
    
    // The sendMessage function is a prop from ApplicationViews. The sendMessage function is called constructNewMessage in AV.js. It makes a POST, then calls the loadAllData function which updates the ApplicationViews state with the updated message.

    //Then, we update the local state of the Messages component. We set the state.message to be a blank string which clears the input field after the button is clicked, message is posted, and applicationviews state is updated and passed down as props. We pass in the updated props to the local state.allMessages in order to reflect the update.

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
                                        <button onClick={() => {
                                            this.props.history.push(`/messages/${message.id}/edit`)
                                        }}className="btn edit-button">
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
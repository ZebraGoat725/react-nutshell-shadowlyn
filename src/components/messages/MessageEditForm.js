// MessageEditForm Component
// Author: Chris Morgan

// The purpose of the MessageEditForm Component is to create the structure for the form used to edit a user's own message.

import React, { Component } from "react"
import resourceManager from "../../modules/ResourceManager"

class MessageEditForm extends Component {

    // Initial state of the message form is ""

    state = {
        message: ""
    }

    // Updates state based on what is in the input field

    handleChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleUpdate = (event) => {
        event.preventDefault();

        const editedMessage = {
        id: Number(this.props.match.params.messageId),
        message: this.state.message,
        userId: Number(sessionStorage.getItem("userID"))
        }

        this.props.handleMessageUpdate(editedMessage)
        this.props.history.push("/messages")
    }


    componentDidMount () {
        resourceManager.getOneEntry(Number(this.props.match.params.messageId), "messages").then(response => {
            this.setState({
                message: response.message
            })
        })
    }


    render(){
        return (
            <React.Fragment>
                <form>
                    <div>
                        <label htmlFor="message">Edit Message</label>
                        <input 
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                            id="message"
                            value={this.state.message}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={this.handleUpdate}
                        className="btn btn-primary mt-2"
                    >Submit
                    </button>
                </form>
            </React.Fragment>
        )
    }

}

export default MessageEditForm
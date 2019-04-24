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

    // When the user hits submit button, handleUpdate is called. We prevent browser default first. Then we create the editedMessage object with the id being the messageId from props.match.params. This will be the id of the message we are trying to edit. The message: will reflect the state.message / userinput. The userId is the userID from sessionStorage because a user can only edit his/her own messages.

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

    // componentDidMount is used to get the content of the message we are trying to edit and pass it in to our local state. This allows the form to be populated with the message already. 

    componentDidMount () {
        resourceManager.getOneEntry(Number(this.props.match.params.messageId), "messages").then(response => {
            this.setState({
                message: response.message
            })
        })
    }


    render(){
        return (
            <div className="card">
                <div className="card-header">Edit Message</div>
                <form>
                    <div className="card-body">
                        <input 
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                            id="message"
                            value={this.state.message}
                        />
                        <button
                        type="button"
                        onClick={this.handleUpdate}
                        className="btn btn-primary mt-2"
                    >Send
                    </button>
                    </div>
                    
                </form>
            </div>
        )
    }

}

export default MessageEditForm
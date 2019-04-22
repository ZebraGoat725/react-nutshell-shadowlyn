import React, { Component } from "react"

class Messages extends Component {
    
    
    render() {
        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-header">
                        Messages
                    </div>
                    <div className="card-body">
                        { this.props.messages.map(message => message.message)}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Messages
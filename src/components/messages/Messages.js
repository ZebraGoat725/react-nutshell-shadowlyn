import React, { Component } from "react"

const userID = Number(sessionStorage.getItem("userID"))

class Messages extends Component {
    
    render() {
        console.log(this.props.messages)
        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-header">
                        Messages
                    </div>
                    <div className="card-body">
                        { this.props.messages.map(message => {
                            if(message.userId === userID){
                              return <p className="card-text myMessages" key={message.id}>{message.message}</p>  
                            } else {
                               return <p className="card-text otherMessages" key={message.id}>{message.message}</p>
                            }
                        })}
                    </div>
                    <div className="card-footer">
                        <input className="input mr-3"></input>
                        <button className="btn btn-primary">Send</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Messages
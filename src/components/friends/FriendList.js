// FriendList Component
// Author: Chris Morgan

// The FriendList component is used to create the structure of the friends list section. It uses this.props.friends to display all of the current user's friends.

import React, {Component} from "react"
import UserSearch from "./UserSearch"


class FriendsList extends Component {

    

    render() {
        return (
            <div className="card">
                <h1 className="card-header">Friends List</h1>
                <div className="card-body">
                {
                    this.props.friends.map(friend => {
                    return  <div key={friend.user.id}>
                                <span><h4>{friend.user.userName}</h4>
                                <p>{friend.user.email}</p><button
                                id={friend.id} className="btn btn-danger btn-sm mb-2"
                                onClick={this.props.deleteFriend}
                                >Delete Friend</button></span>
                                
                            </div>
                        
                    })
                }
                </div>
                <div className="card-footer">
                    <UserSearch findFriend={this.props.findFriend}/>
                </div>
            </div>
        )
    }
}

export default FriendsList
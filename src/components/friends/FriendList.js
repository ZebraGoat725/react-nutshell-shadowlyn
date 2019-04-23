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
                                <h4>{friend.user.userName}</h4>
                                <p>{friend.user.email}</p>
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
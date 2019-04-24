// UserSearch Component
// Author: Chris Morgan

// The UserSearch component is meant to carry out the functionality and structure rendering of the search form within the FriendsList component.

import React, {Component} from "react"
import ResourceManager from "../../modules/ResourceManager"

class UserSearch extends Component {

    // Local initial state is set to blank. This reflects the user input of the search by username field.

    state = {
        searchBy: ""
    }

    // Updates local state based on changes of the search input

    handleChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    //  handleAddFriend is meant POST the new friends object to the database. It will grab the userlist before the POST, and find the user that matches the username in the search input. Then it will take that match, and call the addFriend function in order to carry out the POST. Check ApplicationViews.js to see the description of this function. After the POST is complete, we update the local state.searchBy to a blank string, which clears the input field.

    handleAddFriend = (event) => {
        event.preventDefault();

            
        ResourceManager.getAllUsers()
            .then(userList => userList.find(user => user.userName.toLowerCase() === this.state.searchBy.toLowerCase()))
            .then(match => this.props.addFriend(match))
            .then(() => this.setState({
                searchBy: ""
            }))
        
    }

    render() {
        return (
            <form className="form-group">
                <label>Add a New Friend</label>
                <input
                    type="text"
                    required
                    id="searchBy"
                    value={this.state.searchBy}
                    onChange={this.handleChange}
                    className="form-control userSearch"
                    placeholder="Search by Username"
                />
                <button 
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={this.handleAddFriend}
                    >Find User</button>
            </form>
        )
    }
}

export default UserSearch
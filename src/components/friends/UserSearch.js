import React, {Component} from "react"
import ResourceManager from "../../modules/ResourceManager"

class UserSearch extends Component {

    state = {
        searchBy: ""
    }

    handleChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    

    handleAddFriend = (event) => {
        event.preventDefault();

            
        ResourceManager.getAllUsers()
            .then(userList => userList.find(user => user.userName.toLowerCase() === this.state.searchBy.toLowerCase()))
            .then(match => this.props.findFriend(match))
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
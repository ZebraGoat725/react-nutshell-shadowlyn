//  Register Component
//  Author: Chris Morgan
//  The Purpose of the Register component is to build the structure of the regisitration form. It also has functionality for authentication as well as setting the userID to sessionStorage

import React, { Component } from "react"
import resourceManager from "../../modules/ResourceManager"

class Register extends Component {

    // Initial state.username and state.email is set to a blank string. The state is meant to reflect the value of the input fields within the form. The handleChange function will update the state instantly as the user types letters into the input fields.

    state = {
        username: "",
        email: ""
    }

    // handleChange creates an empty object that will be used to update the state of this component. Then, it dynamically create key / value pairs from the id and value from the input field handleChange is attached to. For example, when the user enters text into the username field, the handleChange function will update stateToChange = {  username: "userInput"}. It will then update local state.username with this new value.

    handleChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // the handleRegister function is attatched to the Register button on the registration form. 
    // First, it prevents the default refresh action.
    
    // Then, we make a call to the database to grab all the current users in the database (before register) 
    
    // Next we take the userList promise value, and call the find   method to see if an account exists with the username that the user input. We assign the returned value of the find method, which will either be undefined OR a user object from the database, to the variable isMatch. If isMatch isn't undefined, the user will get an alert that an account with that username already exists.
    
    // Then we do the same thing for validating email. The only difference is that we didn't assign the return value to a variable. The return value is now the conditional statement. 
    
    // Then we make sure that the current state of email and username, which reflects the value of the text field, is not blank. So if the input fields are blank, the app will alert the user that a field was left blank.
    
    // After cycling through all of the validation conditions, we create the newUser object with the current state of email/username. This object will be used to make a POST to our database in the users collection.

    // registerUser is passed down as a prop from ApplicationViews.js
    // The registerUser function executes the POST to the database, then INSIDE ApplicationViews.js, it makes a GET call to grab the updated list of users (containing the new one). It updates the ApplicationViews component's state.users with the response of the GET call. The state.users passed down from ApplicationViews as a prop.

    // After the new user is POSTed, we do a GET to grab the updated list of users. We call the find method on the response in order to isolate the user object that matches the data from our local state.

    // Then we take this matched user object and take the user.id and set it to sessionStorage "userID" in order to complete validation.

    // Then we call the onLogin function from ApplicationViews. This function will get the currentUserId from sessionStorage, and update the ApplicationViews state.userId with this id. Then the onLogin function calls the loadAllData passing in this id as an argument. It will update the ApplicationView state with all of the users data. The updated will be passed down as props to their respective components.

    handleRegister = (event) => {
        event.preventDefault()

        resourceManager.getAllUsers()
        .then(userList => {
            let isMatch = userList.find(user => user.userName.toLowerCase() === this.state.username.toLowerCase())
            if(isMatch){
                window.alert("This username already exists! Please go back to login page.")
            } else if (userList.find(user => user.email.toLowerCase() === this.state.email.toLowerCase())) {
                window.alert("This email already exists") 
            } else if(this.state.username === "" || this.state.email === ""){
                window.alert("You left a field blank!")
            } else {
                let newUser = {
                    userName: this.state.username,
                    email: this.state.email
                }
                this.props.registerUser(newUser)
                .then(() => resourceManager.getAllUsers())
                .then(r => r.find(user => user.userName === this.state.username))
                .then(matchedUserInfo => sessionStorage.setItem("userID", matchedUserInfo.id))
                .then(() => this.props.onLogin())
                .then(() => this.props.history.push("/articles"))
            }
        })
    }

    render() {
        return (
            <div className="card">
                <form>
                    <h1 className="card-header">Register New Account</h1>
                    <div className="card-body">
                        <label htmlFor="userName">Username: </label>
                        <input onChange={this.handleChange}           type="text"
                            id="username"
                            placeholder="Username"
                            required
                            autoFocus=""
                            className="form-control mb-2"
                        />
                        <label htmlFor="emailInput">Email: </label>
                        <input onChange={this.handleChange} type="email"
                        id="email"
                        placeholder="Email"
                        required
                        className="form-control"
                        />
                    </div>
                    <div className="card-footer login-button-div">
                        <button 
                        type="submit"
                        className="btn btn-primary btn-sm login-button"
                        onClick={this.handleRegister}
                        >
                        Register
                        </button>
                        <button 
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => this.props.history.push("/login")}
                        >
                        Go Back
                        </button>
                    </div>
                    
                    
                </form>
            </div>
        )
    }
}

export default Register
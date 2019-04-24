//  Register Component
//  Author: Chris Morgan
//  The Purpose of the Register component is to build the structure of the regisitration form. It also has functionality for authentication as well as setting the userID to sessionStorage

import React, { Component } from "react"
import resourceManager from "../../modules/ResourceManager"

class Register extends Component {

    state = {
        username: "",
        email: ""
    }

    handleChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

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
                console.log(isMatch)
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
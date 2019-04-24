import React, { Component } from 'react'
import "./login.css"

export default class Login extends Component {

    state = {
        userName: "",
        email: ""
    }

    //Sets ID to be "userName"/"email", and the value to be whatever
    //is typed in.
    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    }
    //prevent page reloading,
    //sets login key to "valid", 
    //converts userName/email to JSON
    handleLogin = (event) => {
        event.preventDefault();

        fetch("http://localhost:5002/users")
            .then(response => response.json())
            .then(userList => {
                let tempUserName = userList.find(element => element.userName.toLowerCase() === this.state.userName.toLowerCase() && element.email.toLowerCase() === this.state.email.toLowerCase())
                if (tempUserName) {
                    sessionStorage.setItem("userID", tempUserName.id)
                    this.props.onLogin();
                    this.props.history.push("/friends")
                } else {
                    window.alert("Invalid login information. Please try again or register a new account.")
                }
            })

    }

    render() {
        //Renders Login Form
        return (
            <div className="card">
                <form onSubmit={this.handleLogin}>
                    <h1 className="card-header">Sign In</h1>
                    <div className="card-body">
                        <label htmlFor="userNameInput">Username: </label>
                        <input onChange={this.handleFieldChange}           type="text"
                            id="userName"
                            placeholder="Username"
                            required
                            autoFocus=""
                            className="form-control mb-2"
                        />
                        <label htmlFor="emailInput">Email: </label>
                        <input onChange={this.handleFieldChange} type="email"
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
                        >
                        Sign In
                        </button>
                        <button 
                        type="button"
                        className="btn btn-info btn-sm login-button"
                        onClick={() => this.props.history.push("/register")}
                        >
                        Register New Account
                        </button>
                    </div>
                    
                    
                </form>
            </div>
        )
    }
}
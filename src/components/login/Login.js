import React, { Component } from 'react'

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

        sessionStorage.setItem(
            "valid",
            JSON.stringify({
                userName: this.state.userName,
                email: this.state.email
            })
        )
    }

    render() {
        //Renders Login Form
        return (
            <React.Fragment>
                <form onSubmit={this.handleLogin}>
                    <h1>Sign In</h1>
                    <label htmlFor="userNameInput">Username: </label>
                    <input onChange={this.handleFieldChange} type="text"
                        id="userName"
                        placeholder="Username"
                        required=""
                        autoFocus=""
                    />
                    <label htmlFor="emailInput">Email: </label>
                    <input onChange={this.handleFieldChange} type="email"
                        id="email"
                        placeholder="Email"
                        required=""
                    />
                    <button type="submit">
                        Sign In
                    </button>
                </form>
            </React.Fragment>
        )
    }
}
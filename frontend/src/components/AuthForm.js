import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { signup } from '../actions/account';
import fetchStates from '../reducers/fetchStates';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  updateUsername(event) {
    this.setState({ username: event.target.value });
  }

  updatePassword(event) {
    this.setState({ password: event.target.value });
  }

  login() {
    console.log('login:', this.state);
  }

  signup() {
    const { username, password } = this.state;
    this.props.signup({ username, password });
  }

  get Error() {
    if (this.props.account.status === fetchStates.error) {
        return <div>{this.props.account.message}</div>
    }
  }

  render() {
    return (
      <div>
        <h2>Dragon Stack</h2>

        <FormGroup>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="username"
            onChange={this.updateUsername}
          />
        </FormGroup>

        <FormGroup>
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.updatePassword}
          />
        </FormGroup>

        <div>
          <Button onClick={this.login}>Log In</Button>
          <span> or </span>
          <Button onClick={this.signup}>Sign Up</Button>
        </div>
        <br />
        {this.Error}
      </div>
    );
  }
}

export default connect(
    ({account}) => ({account}), { signup })
    (AuthForm);

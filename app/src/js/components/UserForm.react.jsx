'use strict';
import React from 'react';
import styles from '../../css/components/user-form.scss';

export default class UserForm extends React.Component {
    /**
     * React: propTypes
     */
    static propTypes = {
        user: React.PropTypes.shape({
            name: React.PropTypes.string,
            email: React.PropTypes.string,
            age: React.PropTypes.string,
        }),
        submitUser: React.PropTypes.func
    };

    /**
     * React: defaultProps
     */
    static defaultProps = {
        user: {
            name: '',
            email: '',
            age: ''
        }
    };

    /**
     * React: state
     */
    state = {
        user: {
            name: this.props.user.name,
            email: this.props.user.email,
            password: this.props.user.password,
            confirmPassword: this.props.user.confirmPassword
        }
    };

    render () {
        return (
            <div className="c--user-forms ui--grid__5 ui--grid__center">
                <h2>Register</h2>
                <form className="c--user-registration" onSubmit={this._submitRegisterUserForm}>
                    <input type="text" name="username" placeholder="User name" required
                           className="ui-input"
                           onChange={this._changeUserInputValue.bind(this, 'name')} />
                    <input type="email" name="email" placeholder="User email" required
                           className="ui-input"
                           onChange={this._changeUserInputValue.bind(this, 'email')} />
                    <input type="password" name="password" placeholder="User password" required
                           className="ui-input"
                           onChange={this._changeUserInputValue.bind(this, 'password')} />
                    <input type="password" name="confirmPassword" placeholder="Confirm password" required
                           className="ui-input"
                           onChange={this._changeUserInputValue.bind(this, 'confirmPassword')} />

                    <input type="submit" value='Register user' className="ui-button ui-button__red" />
                </form>
                <h5>or</h5>
                <h2>Login</h2>
                <form className="c--user-login" onSubmit={this._submitLoginUserForm}>
                    <input type="email" name="email" placeholder="User email" required
                           className="ui-input"
                           onChange={this._changeUserInputValue.bind(this, 'email')} />
                    <input type="password" name="password" placeholder="User password" required
                           className="ui-input"
                           onChange={this._changeUserInputValue.bind(this, 'password')} />

                    <input type="submit" value='Login user' className="ui-button ui-button__green"/>
                </form>
            </div>
        );
    }

    _changeUserInputValue = (name, event) => {
        let changeUser = this.state.user;
        changeUser[name] = event.target.value;

        // console.log(changeUser)

        this.setState({
            ...this.state,
            user: changeUser
        });
    };

    _submitRegisterUserForm = (event) => {
        event.preventDefault();

        // console.log('submit')
        if(typeof this.props.registerUser === 'function'){
            this.props.registerUser(this.state.user);
        }
    };

    _submitLoginUserForm = (event) => {
        event.preventDefault();

        // console.log('submit')
        if(typeof this.props.loginUser === 'function'){
            this.props.loginUser(this.state.user);
        }
    };
}
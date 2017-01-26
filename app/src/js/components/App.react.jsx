'use strict';
import React from 'react';
import MessageForm from './MessageForm.react.jsx';
import UserForm from './UserForm.react.jsx';
import MessageFeed from './MessageFeed.react.jsx';
import MessageRepliesContainer from '../containers/MessageRepliesContainer.react.jsx';
import styles from '../../css/components/app.scss';



export default class App extends React.Component {
    /**
     * React: propTypes
     */
    static propTypes = {
        user: React.PropTypes.shape({
            name: React.PropTypes.string,
            email: React.PropTypes.string,
        }),
        messages: React.PropTypes.array,
        // message functions
        onSubmitMessage: React.PropTypes.func,
        // user functions
        onRegisterUser: React.PropTypes.func,
        onLoginUser: React.PropTypes.func,
        onLogoutUser: React.PropTypes.func,
        onLoadComponent: React.PropTypes.func
    };

    render () {
        return this.props.user.email==='' ? (
                <div className="row">
                    <UserForm user={this.props.user} registerUser={this.props.onRegisterUser} loginUser={this.props.onLoginUser} />
                </div>
                ): (
                <div>
                    <header>
                        <div className="row">
                            <div className="ui--grid__12 column clearfix">
                                <h3 ><i className="fa fa-user-circle"/> {this.props.user.name}({this.props.user.email})</h3>
                                <input className="ui-button ui-button__blue" href="#" type="button" onClick={this.props.onLogoutUser.bind(event)} value="Logut" />
                            </div>
                        </div>
                    </header>

                    <div className="row">
                        <div className="ui--grid__12 column">
                            <MessageForm submitMessage={this.props.onSubmitMessage}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="ui--grid__6 column">
                            <MessageFeed messages={this.props.messages}
                                        likeMessage={this.props.likeMessage}
                                        dislikeMessage={this.props.likeMessage}/>
                        </div>
                        <div className="ui--grid__6 column">
                            <MessageRepliesContainer/>
                        </div>
                    </div>
                </div>
                );
    }
}
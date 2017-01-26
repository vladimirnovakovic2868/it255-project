import { connect } from 'react-redux'
import App from '../components/App.react.jsx';
import MessageActionCreators from '../actions/MessageActionCreators';
import UserActionCreators from '../actions/UserActionCreators';

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.UserReducer, state.MessageReducer);
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmitMessage: (message, userId) => {
            // console.log(message)
            dispatch(MessageActionCreators.submitMessage(message, userId));
        },
        onRegisterUser: (user) => {
            dispatch(UserActionCreators.registerUser(user));
        },
        onLoginUser: (user) => {
            dispatch(UserActionCreators.loginUser(user));
        },
        onLogoutUser: () => {
            dispatch(UserActionCreators.logoutUser());
        },
        onLoadComponent: () => {
            dispatch(UserActionCreators.checkUser());
        }
    }
};

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default FilterLink
import { connect } from 'react-redux'
import Message from '../components/Message.react.jsx';
import MessageActionCreators from '../actions/MessageActionCreators';

const mapStateToProps = (state, ownProps) => {
    // console.log(state.UserReducer.user.id, ownProps.messageId)
    return Object.assign({}, {
        message: state.MessageReducer.messages.filter(message => message.id==ownProps.messageId)[0],
        disableLike: (ownProps.message.likesList.indexOf(state.UserReducer.user.id)>-1)
    });
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        likeMessage: (messageID, userToken, userId) => {
            // console.log(messageID)
            dispatch(MessageActionCreators.likeMessage(messageID, userToken, userId));
        },
        showMessageReplies: (message) => {
            // console.log(message)
            dispatch(MessageActionCreators.showMessageReplies(message));
        }
    }
};

const MessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Message);

export default MessageContainer
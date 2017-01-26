import { connect } from 'react-redux'
import MessageReplies from '../components/MessageReplies.react.jsx';
import MessageActionCreators from '../actions/MessageActionCreators';

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.MessageReducer, {
        disableLike: state.MessageReducer.showReplyForMessage ? (state.MessageReducer.showReplyForMessage.likesList.indexOf(state.UserReducer.user.id)>-1) : false
    });
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitMessageReply: (message, userId, originalMessageId) => {
            dispatch(MessageActionCreators.submitReplyMessage(message, userId, originalMessageId));
        },
        likeMessage: (messageID, userToken, userId) => {
            // console.log(messageID)
            dispatch(MessageActionCreators.likeMessage(messageID, userToken, userId));
        },
    }
};

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageReplies);

export default FilterLink
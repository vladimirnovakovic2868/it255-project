<?php
include_once("config.php");
include_once("messages.php");

function getReplies($messageId)
{
    global $conn;
    $sql = "SELECT * FROM replies WHERE message_original_id=?";

    $query = $conn->prepare($sql);
    $query->bind_param('s',$messageId);
    $query->execute();
    $query->store_result();

    $returnvalue = 0;

    while ($query->fetch()) {
        $returnvalue++;
    }
    $query->free_result();
    $query->close();
    return $returnvalue;
}


function getReplyList($messageId){
    global $conn;
    $sql = "SELECT * FROM replies 
            JOIN messages on replies.message_content_id=messages.id
            JOIN users ON replies.user_id = users.id
            WHERE replies.message_original_id=?";
    $query = $conn->prepare($sql);
    $query->bind_param("s", $messageId);
    $query->execute();
    $query->store_result();
    $query->bind_result($replyId, $messageOriginalId, $messageContentId, $replyUserId, $messagesId, $userId, $text, $date, $userident, $useremail, $username, $usertoken, $userpassword);

    $messages = [];

    while ($query->fetch()) {
        $likes = getLikes($messageContentId);
        $likesNumber = getLikesNumber($messageContentId);
        $replies = getReplies($messageContentId);
        $messages[] = Array(
            "id" => $messageContentId,
            "text" => $text,
            "date" => $date,
            "user" => array(
                "id" => $userId,
                "username" => $username,
                "email" => $useremail
            ),
            "likes" => $likesNumber,
            "likesList" => $likes,
            "replies" => $replies
        );
    }

    return $messages;
    $query->close();
}

function addReply($message, $user, $originalMessageId){
    $userId = findUserByToken($user);
    $messageId = addMessageReturnId($message, $user);

    $insert = "INSERT INTO replies (user_id, message_original_id, message_content_id) VALUES (?,?,?)";
    global $conn;

    $query = $conn->prepare($insert);
    $query->bind_param('sss', $userId, $originalMessageId, $messageId);
    $query->execute();

    $query->close();
    return true;
}
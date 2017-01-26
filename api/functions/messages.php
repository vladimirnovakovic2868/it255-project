<?php
include_once("config.php");
include_once("user.php");
include_once("likes.php");
include_once("replies.php");

function addMessage($message, $token)
{
    $userId = findUserByToken($token);

    $insert = "INSERT INTO messages (user_id, text) VALUES (?,?)";
    global $conn;

    $query = $conn->prepare($insert);
    $query->bind_param('ss', $userId, $message);
    $query->execute();

    $query->close();
    return true;
}

function addMessageReturnId($message, $token)
{
    $userId = findUserByToken($token);

    if(addMessage($message, $token)){
        global $conn;
        $sql = "SELECT id FROM messages WHERE messages.text=? AND messages.user_id=?";
        $query = $conn->prepare($sql);
        $query->bind_param('ss', $message, $userId);
        $query->execute();
        $query->store_result();
        $query->bind_result($id);
        $query->fetch();

        return $id;
    }

    return false;
}

function listAllMessages(){
    global $conn;
    $sql = "SELECT * FROM messages JOIN users ON messages.user_id = users.id ORDER BY messages.date DESC";
    $query = $conn->prepare($sql);
    $query->execute();
    $query->store_result();
    $query->bind_result($id, $userId, $text, $date, $userident, $useremail, $username, $usertoken, $userpassword);

    $messages = [];

    while ($query->fetch()) {
        $likes = getLikes($id);
        $likesNumber = getLikesNumber($id);
        $replies = getReplies($id);
        $messages[] = Array(
            "id" => $id,
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

function getMessage($messageId){
    global $conn;
    $sql = "SELECT * FROM messages 
            JOIN users ON messages.user_id = users.id 
            WHERE messages.id=?";
    $query = $conn->prepare($sql);
    $query->bind_param('s', $messageId);
    $query->execute();
    $query->store_result();
    $query->bind_result($id, $userId, $text, $date, $userident, $useremail, $username, $usertoken, $userpassword);

    $messages = [];

    while ($query->fetch()) {
        $likes = getLikes($id);
        $likesNumber = getLikesNumber($id);
        $replies = getReplies($id);
        $replyList = getReplyList($id);
        $fullLikesList = getCompleteLikes($id);
        $messages[] = Array(
            "id" => $id,
            "text" => $text,
            "date" => $date,
            "user" => array(
                "id" => $userId,
                "username" => $username,
                "email" => $useremail
            ),
            "likes" => $likesNumber,
            "likesList" => $likes,
            "fullLikesList" => $fullLikesList,
            "replies" => $replies,
            "replyList" => $replyList
        );
    }

    return $messages;
    $query->close();
}
<?php
include_once("config.php");
include_once("user.php");

function getLikes($messageId)
{
    global $conn;
    $sql = "SELECT user_id FROM likes WHERE message_id=?";

    $query = $conn->prepare($sql);
    $query->bind_param('s',$messageId);
    $query->execute();
    $query->store_result();
    $query->bind_result($userId);

    $returnvalue = array();

    while ($query->fetch()) {
        $returnvalue[] = $userId;
    }
    $query->free_result();
    $query->close();
    return $returnvalue;
}

function getCompleteLikes($messageId)
{
    global $conn;
    $sql = "SELECT * FROM likes JOIN users ON likes.user_id=users.id WHERE message_id=?";

    $query = $conn->prepare($sql);
    $query->bind_param('s',$messageId);
    $query->execute();
    $query->store_result();
    $query->bind_result($likeId, $userId, $messageId, $date, $userId, $useremail, $username, $userPassword, $userToken);

    $returnvalue = array();

    while ($query->fetch()) {
        $returnvalue[] = array(
            "id" => $userId,
            "username" => $username
        );
    }
    $query->free_result();
    $query->close();
    return $returnvalue;
}

function getLikesNumber($messageId)
{
    global $conn;
    $sql = "SELECT user_id FROM likes WHERE message_id=?";

    $query = $conn->prepare($sql);
    $query->bind_param('s',$messageId);
    $query->execute();
    $query->store_result();
    $query->bind_result($userId);

    $returnvalue = 0;

    while ($query->fetch()) {
        $returnvalue++;
    }
    $query->free_result();
    $query->close();
    return $returnvalue;
}

function likeMessage($messageId, $userToken) {
    global $conn;
    $userId = findUserByToken($userToken);
    $sql = "INSERT INTO likes (user_id, message_id) VALUES (?,?)";

    $query = $conn->prepare($sql);
    $query->bind_param('ss', $userId, $messageId);
    $query->execute();

    $query->close();
    return true;
}
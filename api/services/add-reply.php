<?php
include_once('../functions/replies.php');

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    if (isset($obj['message']) && isset($obj['userToken']) && isset($obj['originalMessageId'])) {
        $message = $obj['message'];
        $userToken = $obj['userToken'];
        $originalMessageId = $obj['originalMessageId'];

        $result = null;
        if(addReply($message, $userToken, $originalMessageId)) {
            $result = array(
                "status" => "200",
                "originalMessageId" => $originalMessageId
            );
        }else {
            $result = array(
                "status" => "200",
                "error" => "There was a problem while writing to database"
            );
        }

        echo json_encode($result);
    }
}
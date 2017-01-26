<?php
include_once('../functions/messages.php');

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    if (isset($obj['message']) && isset($obj['userToken'])) {
        $message = $obj['message'];
        $userToken = $obj['userToken'];

        $result = null;
        $userId = addMessageReturnId($message, $userToken);
        if(addMessage($message, $userToken)) {
            $result = array(
                "status" => "200"
            );
        }else {
            $result = array(
                "status" => "500",
                "error" => "There was a problem while writing to database"
            );
        }

        echo json_encode($result);
    }
}
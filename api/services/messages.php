<?php
include_once('../functions/messages.php');

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if(isset($_GET['messageId'])){
        $messageId = $_GET['messageId'];
        $messages = getMessage($messageId);
        echo json_encode($messages);
    }else {
        $messages = listAllMessages();
        echo json_encode($messages);
    }
}
<?php
include_once('../functions/user.php');

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    if (isset($obj['email']) && isset($obj['password'])) {

        $email = $obj['email'];
        $password = $obj['password'];

        echo login($email, $password);
    } else {
        echo json_encode(array(
            "status" => "500",
            "error" => "Bad user data"
        ));
    }
}
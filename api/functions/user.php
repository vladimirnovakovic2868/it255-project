<?php
include_once("config.php");

function addUser($email, $username, $password)
{
    global $conn;
    $errors = "";

    if(checkIfUserExists($email)) {
        $errors .= "Username already exists\r\n";
    }
    if(strlen($email) < 5){
        $errors .= "Username must have at least 5 characters\r\n";
    }
    if(strlen($password) < 5){
        $errors .= "Password must have at least 5 characters\r\n";
    }
    if(strlen($username) < 3){
        $errors .= "Username name must have at least 3 characters\r\n";
    }

    if ($errors == "") {
        $md5Password = md5($password);
        $insert = "INSERT INTO users (email, username, password) VALUES (?,?,?)";
        $query = $conn->prepare($insert);
        $query->bind_param('sss', $email, $username, $md5Password);
        $executed = $query->execute();
        if($executed){
            $id = sha1(uniqid());
            $result2 = mysqli_query($conn,"UPDATE users SET token='$id' WHERE email='email'");
            $rarray['id'] = getIdForEmail($username);
            $rarray['token'] = $id;
            $rarray['username'] = $username;
            $rarray['email'] = $email;
        }else{
            $rarray['error'] = $query->error;
        }
        $query->close();
    } else {
        $rarray['error'] = json_encode($errors);
    }

    return json_encode($rarray);
}

function login($username, $password){
    global $conn;
    $rarray = array();
    if(checkLogin($username,$password)){
        $id = sha1(uniqid());
        $result2 = mysqli_query($conn,"UPDATE users SET token='$id' WHERE email='$username'");
        $rarray['id'] = getIdForEmail($username);
        $rarray['token'] = $id;
        $rarray['username'] =  getNameForEmail($username);
        $rarray['email'] =  $username;
    } else{
        $rarray['error'] = "Invalid username/password";
    }
    return json_encode($rarray);
}

function checkIfLoggedIn(){
    global $conn;
    if(isset($_SERVER['HTTP_TOKEN'])){
        $token = $_SERVER['HTTP_TOKEN'];
        $result = mysqli_query($conn, "SELECT * FROM users WHERE token='$token'");
        $num_rows = mysqli_num_rows($result);
        if($num_rows > 0)
        {
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

function checkLogin($username, $password){
    global $conn;
    $username = mysqli_real_escape_string($conn,$username);
    $password = md5(mysqli_real_escape_string($conn,$password));
    $result = mysqli_query($conn, "SELECT * FROM users WHERE email='$username' AND password='$password'");
    $num_rows = mysqli_num_rows($result);
    if($num_rows > 0)
    {
        return true;
    }
    else{
        return false;
    }
}

function checkIfUserExists($username){
    global $conn;
    $sql = "SELECT * FROM users WHERE email=?";

    $query = $conn->prepare($sql);
    $query->bind_param('s',$username);
    $query->execute();
    $query->store_result();

    if ($query->num_rows > 0) {
        return true;
    } else{
        return false;
    }

    $query->close();
}

function checkUser($username, $password){
    global $conn;
    $sql = "SELECT * FROM users WHERE email=? AND password=?";
    $md5Password = md5($password);

    $query = $conn->prepare($sql);
    $query->bind_param('ss',$username,$md5Password);
    $query->execute();
    $query->store_result();

    if ($query->num_rows > 0) {
        return true;
    } else{
        return false;
    }
    $query->close();
}

function getNameForEmail($email){
    global $conn;
    $sql = "SELECT username FROM users WHERE email=?";

    $query = $conn->prepare($sql);
    $query->bind_param('s',$email);
    $query->execute();
    $query->store_result();
    $query->bind_result($username);

    $returnvalue = "";

    while ($query->fetch()) {
        $returnvalue = $username;
    }
    $query->free_result();
    $query->close();
    return $returnvalue;
}

function getIdForEmail($email){
    global $conn;
    $sql = "SELECT id FROM users WHERE email=?";

    $query = $conn->prepare($sql);
    $query->bind_param('s',$email);
    $query->execute();
    $query->store_result();
    $query->bind_result($username);

    $returnvalue = "";

    while ($query->fetch()) {
        $returnvalue = $username;
    }
    $query->free_result();
    $query->close();
    return $returnvalue;
}

function findUserByToken($token){
    global $conn;
    $sql = "SELECT id FROM users WHERE token=?";

    $query = $conn->prepare($sql);
    $query->bind_param('s',$token);
    $query->execute();
    $query->store_result();
    $query->bind_result($userId);

    $returnvalue = "";

    while ($query->fetch()) {
        $returnvalue = $userId;
    }
    $query->free_result();
    $query->close();
    return $returnvalue;
}
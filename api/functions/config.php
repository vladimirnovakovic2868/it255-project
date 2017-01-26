<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "it255_project";

$conn = mysqli_connect($servername, $username, $password);

if (!$conn) {
    die("Konekcija ima grešku" . mysqli_connect_error());
}

mysqli_select_db($conn,$database);

?>
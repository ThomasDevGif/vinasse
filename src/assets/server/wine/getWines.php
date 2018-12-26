<?php
// get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

$statement=$db->prepare("SELECT * FROM wine ORDER BY type");
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);
echo $json;
?>

<?php
// get database connection
include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// get posted data
$data = json_decode(file_get_contents("php://input"));
$id = $data;

$stmt=$db->prepare("DELETE FROM wine WHERE id=:id");
$stmt->bindParam(':id', $id);

if ($stmt->execute()) {
    http_response_code(200);
} else {
    http_response_code(500);
}
?>

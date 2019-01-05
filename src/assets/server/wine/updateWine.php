<?php
// get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set wine property values
$id = $data->id;
$type = $data->type;
$year = $data->year;
$preservationTime = $data->preservationTime;
$designation = $data->designation;
$producer = $data->producer;
$quantity = $data->quantity;
$comment = $data->comment;

// UPDATE table
// SET nom_colonne_1 = 'nouvelle valeur'
// WHERE condition

$stmt = $db->prepare("UPDATE wine
SET type = :type,
    year = :year,
    preservationTime = :preservationTime,
    designation = :designation,
    producer = :producer,
    quantity = :quantity,
    comment = :comment
WHERE id = :id");

$stmt->bindParam(":type", $type);
$stmt->bindParam(":year", $year);
$stmt->bindParam(":preservationTime", $preservationTime);
$stmt->bindParam(":designation", $designation);
$stmt->bindParam(":producer", $producer);
$stmt->bindParam(":quantity", $quantity);
$stmt->bindParam(":comment", $comment);
$stmt->bindParam(":id", $id);

// create the wine
if ($stmt->execute()) {
  http_response_code(200);
} else {
  http_response_code(500);
}
?>

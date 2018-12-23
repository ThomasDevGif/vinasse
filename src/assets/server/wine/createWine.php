<?php
// get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set wine property values
$type = $data->type;
$year = $data->year;
$designation = $data->designation;
$producer = $data->producer;
$quantity = $data->quantity;
$comment = $data->comment;

$stmt = $db->prepare("INSERT INTO wine (
  type,
  year,
  designation,
  producer,
  quantity,
  comment
)
VALUES (
  :type,
  :year,
  :designation,
  :producer,
  :quantity,
  :comment
)");

$stmt->bindParam(":type", $type);
$stmt->bindParam(":year", $year);
$stmt->bindParam(":designation", $designation);
$stmt->bindParam(":producer", $producer);
$stmt->bindParam(":quantity", $quantity);
$stmt->bindParam(":comment", $comment);

// create the wine
if ($stmt->execute()) {
  http_response_code(200);
} else {
  http_response_code(500);
}
?>

<?php
// get database connection
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// instantiate wine object
include_once './wine.php';
$wine = new wine($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set wine property values
$wine->type = $data->type;
$wine->year = $data->year;
$wine->designation = $data->designation;
$wine->producer = $data->producer;
$wine->quantity = $data->quantity;
$wine->comment = $data->comment;

// create the wine
if ($wine->create()) {
  http_response_code(200);
} else {
  http_response_code(500);
}
?>

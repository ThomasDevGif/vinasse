<?php
class Item {
	private $conn;

	public $id;
	public $type;
	public $year;
	public $designation;
    public $producer;
    public $quantity;
    public $comment;

	public function __construct($db) {
		$this->conn = $db;
	}

	// create item
	public function create() {
		$stmt = $this->conn->prepare("INSERT INTO wine (
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

		$stmt->bindParam(":type", $this->type);
		$stmt->bindParam(":year", $this->year);
		$stmt->bindParam(":designation", $this->designation);
        $stmt->bindParam(":producer", $this->producer);
        $stmt->bindParam(":quantity", $this->quantity);
        $stmt->bindParam(":comment", $this->comment);

		// Insertion
		if ($stmt->execute()) {
			return true;
		} else {
			echo "<pre>";
			print_r($stmt->errorInfo());
			echo "</pre>";

			return false;
		}
	}

}
?>

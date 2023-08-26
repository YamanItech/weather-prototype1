<?php
	// Setting variables
	$hostname = "localhost";
	$username = "root";
	$password = "";
	$dbname = "weather_db";

	// Connection
	$conn = mysqli_connect($hostname, $username, $password, $dbname);
// If connection failed
if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
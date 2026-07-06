<?php
error_reporting(0);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    exit(0);
}

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "GET":
        // Explode the URI path to check if a specific ID is being requested (e.g., /api/users/15)
        $path = explode('/', $_SERVER['REQUEST_URI']);
        
        // Check if an ID exists in the URL path and is numeric
        if(isset($path[3]) && is_numeric($path[3])) {
            // Fetch Single User details for the Edit form filling
            // We use "Id AS id" so React receives the lowercase 'id' key it expects
            $sql = "SELECT Id AS id, name, email, mobile FROM users WHERE Id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($user);
        } else {
            // Fetch All Users for the main dashboard list
            // We use "Id AS id" here too so the table action links map cleanly
            $sql = "SELECT Id AS id, name, email, mobile FROM users";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($users);
        }
        break;

    case "POST":
        // Handle creating a new user record
        $user = json_decode(file_get_contents('php://input'));
        
        $sql = "INSERT INTO users(Id, name, email, mobile, created_at) VALUES(null, :name, :email, :mobile, :created_at);";
        $stmt = $conn->prepare($sql);
        
        $created_at = date('Y-m-d H:i:s');
       
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':created_at', $created_at);
        
        if($stmt->execute()){
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        // Handle updating an existing user record
        $user = json_decode(file_get_contents('php://input'));
        
        // We target the database's uppercase "Id" column while using the lowercase data property from React
        $sql = "UPDATE users SET name = :name, email = :email, mobile = :mobile WHERE Id = :id";
        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam(':id', $user->id); 
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;
        case "DELETE":
            // Explode the path to find the target record ID (e.g., /api/users/15/delete)
            $path = explode('/', $_SERVER['REQUEST_URI']);
            
            if(isset($path[3]) && is_numeric($path[3])) {
                $sql = "DELETE FROM users WHERE Id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[3]);

                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                }
                echo json_encode($response);
            }
            break;
    }
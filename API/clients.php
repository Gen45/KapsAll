<?php
// Allow requests from any origin
header('Access-Control-Allow-Origin: *');

// Allow specific HTTP methods
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

// Allow specific HTTP headers
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Perform any necessary data retrieval or processing
    // $data = ['message' => 'Hello, this is your API response!'];
    $file = "./clients.json";
    $data =  json_decode(file_get_contents($file), true);
    // echo $data;

    // Set the response headers to indicate JSON content type
    header('Content-Type: application/json');

    // Encode the response data as JSON and echo it
    echo json_encode($data);
} else {
    // Handle other request methods or return an error for unsupported methods
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Unsupported request method']);
}
?>

<?php

declare(strict_types=1);

spl_autoload_register(function ($class) {
    require __DIR__ . "/src/$class.php";
});

set_error_handler("ErrorHandler::handleError");
set_exception_handler("ErrorHandler::handleException");

// Allow requests from any origin
header('Access-Control-Allow-Origin: *');

// // Allow specific HTTP methods
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

// // Allow specific HTTP headers
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header("Content-Type: application/json; charset=UTF-8");

$parts = explode("/", $_SERVER['REQUEST_URI']);

$id = $parts[5] ?? NULL;

$servername = "localhost";
$dbname = "kapsalldb";
$username = "mwxadm";
$password = "tH9!k~}8CCc0";

$database = new Database($servername, $dbname, $username, $password);

switch ($parts[4]) {
    case "products":
        $productGateway = new ProductGateway($database);
        $productController = new ProductController($productGateway);
        $productController->processRequest($_SERVER['REQUEST_METHOD'], $id);
        break;

    case "clients":
        $clientGateway = new ClientGateway($database);
        $clientController = new ClientController($clientGateway);
        $clientController->processRequest($_SERVER['REQUEST_METHOD'], $id);
        break;

    case "templates":
        $templateGateway = new TemplateGateway($database);
        $templateController = new TemplateController($templateGateway);
        $templateController->processRequest($_SERVER['REQUEST_METHOD'], $id);
        break;

    case "template":
        // TODO: IMPROVE THIS
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $template = $parts[5];
            $file = "./resources/$template.html";
            $data = file_get_contents($file);
            header('Content-Type: text/html');
            echo $data;
        } else {
            http_response_code(405); // Method Not Allowed
        }

    default:
        http_response_code(404);
        exit;
}
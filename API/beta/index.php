<?php

declare(strict_types=1);


spl_autoload_register(function ($class) {
  require __DIR__ . "/src/$class.php";
});
(new DotEnv(__DIR__ . '/.env'))->load();

set_error_handler("ErrorHandler::handleError");
set_exception_handler("ErrorHandler::handleException");

header("Access-Control-Allow-Headers: Origin, Content-Type, x-requested-with, X-Auth-Token");
header("Access-Control-Allow-Origin: *");
header("Cross-Origin-Resource-Policy: cross-origin: different domains");
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE');
header("Content-Type: application/json; charset=UTF-8");

$parts = explode("/", $_SERVER['REQUEST_URI']);

$id = $parts[5] ?? NULL;

$servername = $_ENV['SERVERNAME'];
$dbname = $_ENV['DBNAME'];
$username = $_ENV['USERNAME'];
$password = $_ENV['PASSWORD'];

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

  case "templatex":
    $templateGateway = new TemplateGateway($database);
    $templateController = new TemplateController($templateGateway);
    $templateController->processRequest($_SERVER['REQUEST_METHOD'], $id);
    break;

  case "campaigns":
    $campaignGateway = new CampaignGateway($database);
    $campaignController = new CampaignController($campaignGateway);
    $campaignController->processRequest($_SERVER['REQUEST_METHOD'], $id);
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

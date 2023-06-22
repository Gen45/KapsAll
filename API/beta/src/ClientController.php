<?php

class ClientController
{

    public function __construct(private ClientGateway $clientGateway)
    {

    }
    public function processRequest(string $method, ?string $id): void
    {
        if ($id) {
            $this->processResourceRequest($method, $id);
        } else {
            $this->processCollectionRequest($method);
        }
    }

    private function processResourceRequest(string $method, string $id): void
    {
        $client = $this->clientGateway->get($id);

        if (!$client) {
            http_response_code(404);
            echo json_encode([
                "message" => "Client not found"
            ]);
            return;
        }

        switch ($method) {
            case "GET":
                echo json_encode($client);
                break;

            case "PATCH":
                $data = (array) json_decode(file_get_contents("php://input"), true);

                $errors = $this->getValidationErrors($data, false);

                if (!empty($errors)) {
                    http_response_code(422);
                    echo json_encode([
                        "errors" => $errors
                    ]);
                    break;
                }

                $rows = $this->clientGateway->update($client, $data);

                echo json_encode([
                    "message" => "Client $id updated successfully",
                    "rows" => $rows
                ]);
                break;
            
                case "DELETE":
                    $rows = $this->clientGateway->delete($id);

                    echo json_encode([
                        "message" => "Client $id deleted successfully",
                        "rows" => $rows
                    ]);
                    break;
                
                    default:
                        http_response_code(405);
                        header("Allow: GET, PATCH, DELETE");
                
        }

    }

    private function processCollectionRequest(string $method): void
    {
        switch ($method) {
            case "GET":
                echo json_encode($this->clientGateway->getAll());
                break;

            case "POST":
                $data = (array) json_decode(file_get_contents("php://input"), true);

                $errors = $this->getValidationErrors($data);

                if (!empty($errors)) {
                    http_response_code(422);
                    echo json_encode([
                        "errors" => $errors
                    ]);
                    break;
                }

                $id = $this->clientGateway->create($data);

                http_response_code(201);
                echo json_encode([
                    "id" => $id,
                    "message" => "Client created successfully"
                ]);
                break;

            default:
                http_response_code(405);
                header("Allow: GET, POST");
        }
    }

    private function getValidationErrors(array $data, bool $is_new = true): array
    {
        $errors = [];

        if ($is_new && empty($data["first"])) {
            $errors[] = "First name is required";
        }

        if ($is_new && empty($data["last"])) {
            $errors[] = "Last name is required";
        }

        if ($is_new && empty($data["email"])) {
            $errors[] = "Email is required";
        }

        return $errors;
    }
}
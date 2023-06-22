<?php

class TemplateController
{

    public function __construct(private TemplateGateway $templateGateway)
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
        $template = $this->templateGateway->get($id);

        if (!$template) {
            http_response_code(404);
            echo json_encode([
                "message" => "template not found"
            ]);
            return;
        }

        switch ($method) {
            case "GET":
                echo json_encode($template);
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

                $rows = $this->templateGateway->update($template, $data);

                echo json_encode([
                    "message" => "template $id updated successfully",
                    "rows" => $rows
                ]);
                break;
            
                case "DELETE":
                    $rows = $this->templateGateway->delete($id);

                    echo json_encode([
                        "message" => "template $id deleted successfully",
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
                echo json_encode($this->templateGateway->getAll());
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

                $id = $this->templateGateway->create($data);

                http_response_code(201);
                echo json_encode([
                    "id" => $id,
                    "message" => "template created successfully"
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

        if ($is_new && empty($data["name"])) {
            $errors[] = "Name is required";
        }

        if ($is_new && empty($data["file"])) {
            $errors[] = "File is required";
        }

        return $errors;
    }
}
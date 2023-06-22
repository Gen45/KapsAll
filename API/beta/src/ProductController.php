<?php

class ProductController
{

    public function __construct(private ProductGateway $productGateway)
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
        $product = $this->productGateway->get($id);

        if (!$product) {
            http_response_code(404);
            echo json_encode([
                "message" => "Product not found"
            ]);
            return;
        }

        switch ($method) {
            case "GET":
                echo json_encode($product);
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

                $rows = $this->productGateway->update($product, $data);

                echo json_encode([
                    "message" => "Product $id updated successfully",
                    "rows" => $rows
                ]);
                break;
            
                case "DELETE":
                    $rows = $this->productGateway->delete($id);

                    echo json_encode([
                        "message" => "Product $id deleted successfully",
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
                echo json_encode($this->productGateway->getAll());
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

                $id = $this->productGateway->create($data);

                http_response_code(201);
                echo json_encode([
                    "id" => $id,
                    "message" => "Product created successfully"
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

        if ($is_new && empty($data["model"])) {
            $errors[] = "Model is required";
        }

        if ($is_new && empty($data["category"])) {
            $errors[] = "Category is required";
        }

        return $errors;
    }
}
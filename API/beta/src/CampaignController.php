<?php

class CampaignController
{

    public function __construct(private CampaignGateway $campaignGateway)
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
        $campaign = $this->campaignGateway->get($id);

        if (!$campaign) {
            http_response_code(404);
            echo json_encode([
                "message" => "campaign not found"
            ]);
            return;
        }

        switch ($method) {
            case "GET":
                echo json_encode($campaign);
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

                $rows = $this->campaignGateway->update($campaign, $data);

                echo json_encode([
                    "message" => "campaign $id updated successfully",
                    "rows" => $rows
                ]);
                break;
            
                case "DELETE":
                    $rows = $this->campaignGateway->delete($id);

                    echo json_encode([
                        "message" => "campaign $id deleted successfully",
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
                echo json_encode($this->campaignGateway->getAll());
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

                $id = $this->campaignGateway->create($data);

                http_response_code(201);
                echo json_encode([
                    "id" => $id,
                    "message" => "campaign created successfully"
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

        if ($is_new && empty($data["client"])) {
            $errors[] = "Client is required";
        }

        if ($is_new && empty($data["product"])) {
            $errors[] = "Product is required";
        }

        if ($is_new && empty($data["status"])) {
            $errors[] = "Status is required";
        }

        return $errors;
    }
}
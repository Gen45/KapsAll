<?php

class CampaignGateway
{
    private PDO $conn;
    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getAll(): array
    {
        $sql = "SELECT *
                FROM campaign";
        $stmt = $this->conn->query($sql);

        $data = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

            $data[] = $row;
        }

        return $data;
    }

    public function create(array $data): string
    {
        $sql = "INSERT INTO campaign (code, client, product, quote, status, start_date)
                VALUES (:code, :client, :product, :quote, :status, NOW())";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":code", $data["code"], PDO::PARAM_STR);
        $stmt->bindValue(":client", $data["client"], PDO::PARAM_INT);
        $stmt->bindValue(":product", $data["product"], PDO::PARAM_INT);
        $stmt->bindValue(":quote", $data["quote"], PDO::PARAM_INT);
        $stmt->bindValue(":status", $data["status"], PDO::PARAM_STR);
        $stmt->bindValue(":start_date", $data["start_date"], PDO::PARAM_STR);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }

    public function get(string $id): array | false
    {
        $sql = "SELECT *
                FROM campaign
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id, PDO::PARAM_INT);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        return $data;
    }

    public function update(array $current, array $new): int 
    {
        $sql = "UPDATE campaign
                SET code = :code,
                    client = :client,
                    product = :product,
                    quote = :quote,
                    status = :status,
                    start_date = :start_date
                WHERE id = :id";
        
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":code", $new["code"] ?? $current["code"], PDO::PARAM_STR);
        $stmt->bindValue(":client", $new["client"] ?? $current["client"], PDO::PARAM_INT);
        $stmt->bindValue(":product", $new["product"] ?? $current["product"], PDO::PARAM_INT);
        $stmt->bindValue(":quote", $new["quote"] ?? $current["quote"], PDO::PARAM_INT);
        $stmt->bindValue(":status", $new["status"] ?? $current["status"], PDO::PARAM_STR);
        $stmt->bindValue(":start_date", $new["start_date"] ?? $current["start_date"], PDO::PARAM_STR);
        
        $stmt->bindValue(":id", $current["id"], PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->rowCount();
    }

    public function delete(string $id): int 
    {
        $sql = "DELETE FROM campaign
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->rowCount();
    }
}
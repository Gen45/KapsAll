<?php

class ClientGateway
{
    private PDO $conn;
    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getAll(): array
    {
        $sql = "SELECT *
                FROM client";
        $stmt = $this->conn->query($sql);

        $data = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

            $data[] = $row;
        }

        return $data;
    }

    public function create(array $data): string
    {
        $sql = "INSERT INTO client (first, last, email)
                VALUES (:first, :last, :email)";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":first", $data["first"], PDO::PARAM_STR);
        $stmt->bindValue(":last", $data["last"], PDO::PARAM_STR);
        $stmt->bindValue(":email", $data["email"], PDO::PARAM_STR);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }

    public function get(string $id): array | false
    {
        $sql = "SELECT *
                FROM client
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id, PDO::PARAM_INT);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        return $data;
    }

    public function update(array $current, array $new): int 
    {
        $sql = "UPDATE client
                SET first = :first,
                    last = :last,
                    email = :email
                WHERE id = :id";
        
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":first", $new["first"] ?? $current["first"], PDO::PARAM_STR);
        $stmt->bindValue(":last", $new["last"] ?? $current["last"], PDO::PARAM_STR);
        $stmt->bindValue(":email", $new["email"] ?? $current["email"], PDO::PARAM_STR);
        
        $stmt->bindValue(":id", $current["id"], PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->rowCount();
    }

    public function delete(string $id): int 
    {
        $sql = "DELETE FROM client
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->rowCount();
    }
}
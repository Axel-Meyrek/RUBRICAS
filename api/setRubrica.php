<?php
    require "connectionDataBase.php";

    header("Content-Type: application/json");

    $params = json_decode(file_get_contents("php://input"), true);

    $titulo = $params["titulo"] ?? null;
    $descripcion = $params["descripcion"] ?? null;

    if (!$titulo || !$descripcion) {
        echo json_encode(["error" => "Faltan campos obligatorios"]);
        exit;
    }

    $stmt = $conexion->prepare("INSERT INTO Rubricas (titulo, descripcion) VALUES (?, ?)");
    $stmt->bind_param("ss", $titulo, $descripcion);

    if ($stmt->execute()) {
        $id_generado = $conexion->insert_id;
        echo json_encode([
            "success" => true,
            "id_rubrica" => $id_generado
        ]);
    } else {
        echo json_encode(["error" => "No se pudo insertar la rúbrica"]);
    }

    $stmt->close();
    $conexion->close();
?>

<?php
    require "connectionDataBase.php";

    header("Content-Type: application/json");

    // Recibimos los datos en JSON
    $params = json_decode(file_get_contents("php://input"), true);

    // Extraemos los valores
    $id_rubrica = $params["id_rubrica"] ?? null;
    $titulo = $params["titulo"] ?? null;
    $descripcion = $params["descripcion"] ?? null;

    // Validamos los datos mínimos
    if (!$id_rubrica || !$titulo || !$descripcion) {
        echo json_encode(["error" => "Faltan campos obligatorios"]);
        exit;
    }

    // Preparamos el update con parámetros seguros
    $stmt = $conexion->prepare("UPDATE Rubricas SET titulo = ?, descripcion = ? WHERE id = ?");
    $stmt->bind_param("ssi", $titulo, $descripcion, $id_rubrica);

    // Ejecutamos y respondemos
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "No se pudo actualizar la rúbrica"]);
    }

    $stmt->close();
    $conexion->close();
?>

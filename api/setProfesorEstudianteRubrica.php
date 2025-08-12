<?php
    require "connectionDataBase.php";
    header("Content-Type: application/json");

    // Recibimos el JSON desde JS
    $data = json_decode(file_get_contents("php://input"), true);

    if (!is_array($data) || !isset($data['id_profesor'], $data['id_estudiante'], $data['id_rubrica'])) {
        echo json_encode(["error" => "Datos incompletos o formato inválido."]);
        exit;
    }

    $id_profesor = $data['id_profesor'];
    $id_estudiante = $data['id_estudiante'];
    $id_rubrica = $data['id_rubrica'];

    // Preparamos la consulta
    $query = "INSERT INTO G_Profesor_Estudiante_Rubrica (id_profesor, id_estudiante, id_rubrica) VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE id_profesor = id_profesor";
    $stmt = $conexion->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "Error preparando la consulta: " . $conexion->error]);
        exit;
    }

    $stmt->bind_param("iii", $id_profesor, $id_estudiante, $id_rubrica);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Registro insertado o actualizado correctamente."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "error" => $stmt->error
        ]);
    }

    $stmt->close();
    $conexion->close();
?>

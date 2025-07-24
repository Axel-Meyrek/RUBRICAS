<?php
    require "connectionDataBase.php";

    header("Content-Type: application/json");

    $params = json_decode(file_get_contents("php://input"), true);

    if (!isset($params) || !is_array($params)) {
        echo json_encode(["error" => "No se recibieron criterios válidos"]);
        exit;
    }

    // Preparamos la consulta para reutilizarla
    $stmt = $conexion->prepare("
        UPDATE Criterios 
        SET titulo = ?, 
            ponderacion = ?, 
            descripcion_se = ?, 
            descripcion_e = ?, 
            descripcion_ae = ?, 
            descripcion_de = ?
        WHERE id = ?
    ");

    foreach ($params as $criterio) {
        $titulo = $criterio["titulo"] ?? '';
        $ponderacion = $criterio["ponderacion"] ?? 0;
        $descripcion_se = $criterio["descripcion_se"] ?? '';
        $descripcion_e = $criterio["descripcion_e"] ?? '';
        $descripcion_ae = $criterio["descripcion_ae"] ?? '';
        $descripcion_de = $criterio["descripcion_de"] ?? '';
        $id = $criterio["id"] ?? null;

        if (!$id) continue; // Saltar si no tiene ID

        $stmt->bind_param("sissssi", 
            $titulo, 
            $ponderacion, 
            $descripcion_se, 
            $descripcion_e, 
            $descripcion_ae, 
            $descripcion_de, 
            $id
        );

        $stmt->execute();
    }

    $stmt->close();
    $conexion->close();

    // Puedes devolver esto si quieres confirmar
    echo json_encode(["success" => true]);
?>

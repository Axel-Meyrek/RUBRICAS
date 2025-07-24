<?php
    require "connectionDataBase.php";

    header("Content-Type: application/json");

    $params = json_decode(file_get_contents("php://input"), true);

    if (!isset($params) || !is_array($params)) {
        echo json_encode(["error" => "No se recibieron criterios válidos"]);
        exit;
    }

    $stmt = $conexion->prepare("
        INSERT INTO Criterios 
        (titulo, ponderacion, id_rubrica, descripcion_se, descripcion_e, descripcion_ae, descripcion_de) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");

    foreach ($params as $criterio) {
        $titulo = $criterio["titulo"] ?? '';
        $ponderacion = $criterio["ponderacion"] ?? 0;
        $id_rubrica = $criterio["id_rubrica"] ?? 0;
        $descripcion_se = $criterio["descripcion_se"] ?? '';
        $descripcion_e = $criterio["descripcion_e"] ?? '';
        $descripcion_ae = $criterio["descripcion_ae"] ?? '';
        $descripcion_de = $criterio["descripcion_de"] ?? '';

        $stmt->bind_param("siissss", 
            $titulo, 
            $ponderacion, 
            $id_rubrica, 
            $descripcion_se, 
            $descripcion_e, 
            $descripcion_ae, 
            $descripcion_de
        );

        $stmt->execute();
    }

    $stmt->close();
    $conexion->close();
?>

<?php
require "connectionDataBase.php";
header("Content-Type: application/json");

// Recibimos el JSON desde JS
$evaluaciones = json_decode(file_get_contents("php://input"), true);

if (!is_array($evaluaciones)) {
    echo json_encode(["error" => "Se esperaba un arreglo de evaluaciones."]);
    exit;
}

// Preparar el insert (PK compuesta: id_criterio, id_rubrica, id_estudiante)
$query = "INSERT INTO G_Evaluaciones (id_criterio, id_rubrica, id_estudiante, calificacion) VALUES (?, ?, ?, ?) 
          ON DUPLICATE KEY UPDATE calificacion = VALUES(calificacion)";
$stmt = $conexion->prepare($query);

if (!$stmt) {
    echo json_encode(["error" => "Error preparando la consulta: " . $conexion->error]);
    exit;
}

$insertados = 0;
$errores = [];

foreach ($evaluaciones as $eval) {
    $id_criterio = $eval['id_criterio'] ?? null;
    $id_rubrica = $eval['id_rubrica'] ?? null;
    $id_estudiante = $eval['id_estudiante'] ?? null;
    $calificacion = $eval['evaluacion'] ?? null;

    if (!$id_criterio || !$id_rubrica || !$id_estudiante || $calificacion === null) {
        $errores[] = "Datos incompletos para evaluación: " . json_encode($eval);
        continue;
    }

    $stmt->bind_param("iiis", $id_criterio, $id_rubrica, $id_estudiante, $calificacion);

    if (!$stmt->execute()) {
        $errores[] = "Error insertando evaluación: " . $stmt->error . " Datos: " . json_encode($eval);
    } else {
        $insertados++;
    }
}

$stmt->close();
$conexion->close();

echo json_encode([
    "success" => true,
    "message" => "Proceso finalizado.",
    "insertados" => $insertados,
    "errores" => $errores
]);
?>

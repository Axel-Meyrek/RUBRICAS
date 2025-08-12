<?php
require "connectionDataBase.php";
header("Content-Type: application/json");

$estudiantes = json_decode(file_get_contents("php://input"), true);

if (!is_array($estudiantes)) {
    echo json_encode(["error" => "Se esperaba un arreglo de estudiantes."]);
    exit;
}

// 🔹 QUITAMOS IGNORE PARA VER ERRORES REALES
$query = "INSERT INTO G_Estudiantes (id, matricula, nombre, id_grupo) VALUES (?, ?, ?, ?)";
$stmt = $conexion->prepare($query);

$insertados = 0;
$errores = [];

foreach ($estudiantes as $estudiante) {
    $id = $estudiante['id'] ?? null;
    $matricula = $estudiante['matricula'] ?? null;
    $nombre = $estudiante['nombre'] ?? null;
    $id_grupo = $estudiante['id_grupo'] ?? null;

    if (!$id || !$matricula || !$nombre || !$id_grupo) {
        $errores[] = "Datos incompletos para ID: " . ($id ?? 'null');
        continue;
    }

    $stmt->bind_param("isss", $id, $matricula, $nombre, $id_grupo);

    if (!$stmt->execute()) {
        // Mostramos el error exacto de MySQL
        $errores[] = "Error insertando ID $id: " . $stmt->error;
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

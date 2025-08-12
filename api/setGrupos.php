<?php
require "connectionDataBase.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(["error" => "Datos inválidos"]);
    exit;
}

$sql = "INSERT INTO G_Grupos (id, periodo, id_profesor) VALUES (?, ?, ?)";
$stmt = $conexion->prepare($sql);

$insertados = 0;
$errores = [];

foreach ($data as $grupo) {
    $id = $grupo['id'] ?? null;
    $periodo = $grupo['periodo'] ?? null;
    $id_profesor = isset($grupo['id_profesor']) ? (int)$grupo['id_profesor'] : null;

    if (empty($id) || empty($periodo) || empty($id_profesor)) {
        $errores[] = "Datos incompletos para ID: " . ($id ?? 'sin ID');
        continue;
    }

    $stmt->bind_param("ssi", $id, $periodo, $id_profesor);
    if ($stmt->execute()) {
        $insertados++;
    } else {
        $errores[] = "Error al insertar ID: $id. " . $stmt->error;
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

<?php
require "connectionDataBase.php";
header("Content-Type: application/json");

// Obtenemos los datos desde el frontend
$profesores = json_decode(file_get_contents("php://input"), true);

// Verificamos que sea un arreglo
if (!is_array($profesores)) {
    echo json_encode(["error" => "Se esperaba un arreglo de profesores."]);
    exit;
}
$stmt = $conexion->prepare("INSERT IGNORE INTO G_Profesores (id, nombre, email, password) VALUES (?, ?, ?, ?)");
$password_default = "prof123";

$insertados = 0;
$errores = [];

foreach ($profesores as $profesor) {
    $id = $profesor["id"] ?? null;
    $nombre = $profesor["nombre"] ?? null;
    $email = $profesor["email"] ?? null;

    if (!$id || !$nombre || !$email) {
        $errores[] = "Datos incompletos para profesor con ID: " . ($id ?? 'null');
        continue;
    }

    $stmt->bind_param("isss", $id, $nombre, $email, $password_default);
    
    if (!$stmt->execute()) {
        $errores[] = "Error insertando ID $id: " . $stmt->error;
    } elseif ($stmt->affected_rows > 0) {
        $insertados++;
    }
}

$stmt->close();
$conexion->close();

echo json_encode([
    "success" => true,
    "message" => "Proceso finalizado.",
    "insertados" => $insertados,
    "ignorados" => count($profesores) - $insertados,
    "errores" => $errores
]);
?>

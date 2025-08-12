<?php
require "connectionDataBase.php";
header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(["error" => "Entrada inválida. Se esperaba un arreglo de objetos."]);
    exit;
}

$stmt = $conexion->prepare("INSERT INTO G_Rubrica_Estudiante (id_rubrica, id_estudiante) VALUES (?, ?)");

foreach ($input as $relacion) {
    $idRubrica = $relacion["id_rubrica"];
    $idEstudiante = $relacion["id_estudiante"];

    if (!$stmt->bind_param("ii", $idRubrica, $idEstudiante)) {
        echo json_encode(["error" => "Error al vincular parámetros"]);
        exit;
    }

    if (!$stmt->execute()) {
        echo json_encode(["error" => "Error al insertar relación", "detalle" => $stmt->error]);
        exit;
    }
}

echo json_encode(["mensaje" => "Relaciones insertadas correctamente"]);
$stmt->close();
$conexion->close();
?>

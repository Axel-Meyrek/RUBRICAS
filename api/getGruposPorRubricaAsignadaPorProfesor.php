<?php
require "connectionDataBase.php";

$params = json_decode(file_get_contents("php://input"), true);

$id_rubrica = $params["id_rubrica"] ?? null;
$id_profesor = $params["id_profesor"] ?? null;

if ($id_rubrica === null || $id_profesor === null) {
    die("Faltan parámetros: id_rubrica o id_profesor.");
}

$query = /* MySql */
    "SELECT DISTINCT g.*
     FROM G_Rubrica_Estudiante re
     JOIN G_Estudiantes e ON e.id = re.id_estudiante
     JOIN G_Grupos g ON e.id_grupo = g.id
     WHERE re.id_rubrica = ?
       AND g.id_profesor = ?";

$stmt = $conexion->prepare($query);
$stmt->bind_param("ii", $id_rubrica, $id_profesor);
$stmt->execute();
$resultado = $stmt->get_result();

$grupos = [];
while ($grupo = $resultado->fetch_object()) {
    $grupos[] = $grupo;
}

if ($grupos) {
    echo json_encode($grupos);
} else {
    echo json_encode(["error" => "Sin datos"]);
}

$stmt->close();
$conexion->close();
?>

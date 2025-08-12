<?php
require "connectionDataBase.php";

$params = json_decode(file_get_contents("php://input"), true);

$id_grupo = $params["id_grupo"] ?? null;
$id_rubrica = $params["id_rubrica"] ?? null;

if (!$id_grupo || !$id_rubrica) {
    echo json_encode(["error" => "Faltan parámetros id_grupo o id_rubrica"]);
    exit;
}

$query = /* MySQL */
    "SELECT e.*
     FROM G_Estudiantes e
     INNER JOIN G_Rubrica_Estudiante re ON e.id = re.id_estudiante AND re.id_rubrica = ?
     WHERE e.id_grupo = ?
       AND NOT EXISTS (
           SELECT 1 FROM G_Evaluaciones ev
           WHERE ev.id_estudiante = e.id
             AND ev.id_rubrica = re.id_rubrica
       )";

$stmt = $conexion->prepare($query);
$stmt->bind_param("is", $id_rubrica, $id_grupo);
$stmt->execute();

$resultado = $stmt->get_result();

$estudiantes = [];

while ($estudiante = $resultado->fetch_object()) {
    $estudiantes[] = $estudiante;
}

if ($estudiantes) echo json_encode($estudiantes);
else echo json_encode(["error" => "Sin datos"]);

$stmt->close();
$conexion->close();

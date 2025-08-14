<?php
require "connectionDataBase.php";
header("Content-Type: application/json");

$query = "
    SELECT 
        r.titulo AS rubrica,
        es.matricula,
        es.id AS id_estudiante,
        es.id_grupo AS nombre_curso,   -- Aquí usamos el id del grupo como nombre
        es.nombre AS nombre_estudiante,
        c.titulo AS criterio,
        ev.calificacion AS respuesta
    FROM G_Evaluaciones ev
    INNER JOIN G_Estudiantes es ON ev.id_estudiante = es.id
    INNER JOIN G_Rubricas r ON ev.id_rubrica = r.id
    INNER JOIN G_Criterios c ON ev.id_criterio = c.id
    ORDER BY r.titulo, es.matricula, c.titulo
";

$resultado = mysqli_query($conexion, $query);

if (!$resultado) {
    http_response_code(500);
    echo json_encode(["error" => "Error en la consulta: " . mysqli_error($conexion)]);
    exit;
}

$datos = [];

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila;
}

echo json_encode($datos);

mysqli_close($conexion);
?>

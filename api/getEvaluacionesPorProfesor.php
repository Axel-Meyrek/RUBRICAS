<?php
require "connectionDataBase.php";

// Leer parámetros JSON
$params = json_decode(file_get_contents("php://input"), true);
$id_profesor = $params["id_profesor"];

if ($id_profesor === null) {
    die(json_encode(["error" => "El ID del profesor no fue proporcionado."]));
}

// ==========================================
// Paso 0: eliminar tabla temporal si existe
// ==========================================
$conexion->query("DROP TEMPORARY TABLE IF EXISTS criterios");

// ==========================================
// Paso 1: crear tabla temporal enumerando criterios
// ==========================================
$createTemp = "
CREATE TEMPORARY TABLE criterios AS
SELECT 
    R.titulo AS Rubrica,
    E.matricula,
    E.id AS ID,
    E.nombre,
    C.titulo AS Criterio,
    EV.calificacion AS Calificacion,
    ROW_NUMBER() OVER (PARTITION BY R.id, E.id ORDER BY C.id) AS rn
FROM G_Profesor_Estudiante_Rubrica AS PER
JOIN G_Estudiantes AS E ON PER.id_estudiante = E.id
JOIN G_Rubricas AS R ON R.id = PER.id_rubrica
JOIN G_Evaluaciones AS EV ON EV.id_estudiante = E.id
JOIN G_Criterios AS C ON EV.id_Criterio = C.id
WHERE PER.id_profesor = '$id_profesor'
";

$conexion->query($createTemp);

// ==========================================
// Paso 2: generar dinámicamente columnas
// ==========================================
$res = $conexion->query("
    SELECT GROUP_CONCAT(
        CONCAT(
            'MAX(CASE WHEN rn = ', rn, ' THEN Criterio END) AS Criterio', rn, ', ',
            'MAX(CASE WHEN rn = ', rn, ' THEN Calificacion END) AS Calificacion', rn
        )
        ORDER BY rn
    ) AS sql_columns
    FROM (SELECT DISTINCT rn FROM criterios) t
");

$row = $res->fetch_object();
$sql_columns = $row->sql_columns;

// ==========================================
// Paso 3: armar consulta final
// ==========================================
$sql = "
SELECT Rubrica, Matricula, ID, Nombre, $sql_columns
FROM criterios
GROUP BY Rubrica, Matricula, ID, Nombre
";

$resultado = $conexion->query($sql);

// ==========================================
// Paso 4: construir objeto con arreglo de objetos
// ==========================================
$data = [];

while ($row = $resultado->fetch_object()) {
    $data[] = $row; // cada fila como objeto
}

// ==========================================
// Paso 5: salida JSON
// ==========================================
$response = new stdClass();
$response->status = "success";
$response->count = count($data);
$response->data = $data;

header('Content-Type: application/json');
echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

$conexion->close();
?>

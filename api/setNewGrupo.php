<?php
require "connectionDataBase.php";

// Recibe el contenido JSON del cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !is_array($data)) {
    echo json_encode(["error" => "Datos inválidos o vacíos"]);
    exit;
}

// Recorremos cada estudiante en el arreglo
foreach ($data as $item) {
    // Sanitizamos y extraemos los datos
    $id_alumno = $conexion->real_escape_string($item["ID ALUMNO"]);
    $matricula = $conexion->real_escape_string($item["MATRÍCULA"]);
    $nombre_alumno = $conexion->real_escape_string($item["NOMBRE COMPLETO ALUMNO"]);
    $clave_materia = $conexion->real_escape_string($item["CLAVE MATERIA"]);
    $grupo = $conexion->real_escape_string($item["GRUPO"]);
    $id_evaluador = $conexion->real_escape_string($item["ID EVALUADOR"]);
    $nombre_evaluador = $conexion->real_escape_string($item["NOMBRE EVALUADOR"]);
    $correo_evaluador = $conexion->real_escape_string($item["CORREO EVALUADOR"]);

    // INSERTAR o IGNORAR al profesor
    $query_profesor = "INSERT IGNORE INTO Profesores (id, nombre, email) VALUES ('$id_evaluador', '$nombre_evaluador', '$correo_evaluador')";
    $conexion->query($query_profesor);

    // INSERTAR o IGNORAR el grupo (si no existe ya)
    $query_grupo = "INSERT IGNORE INTO Grupos (nombre, id_profesor) VALUES ('$clave_materia', '$id_evaluador')";
    $conexion->query($query_grupo);

    // INSERTAR al estudiante
    $query_estudiante = "INSERT INTO Estudiantes (id, matricula, nombre, grupo) VALUES ('$id_alumno', '$matricula', '$nombre_alumno', '$grupo')
                         ON DUPLICATE KEY UPDATE nombre='$nombre_alumno'";
    $conexion->query($query_estudiante);
}

// Listo
echo json_encode(["success" => true, "message" => "Estudiantes importados correctamente"]);
?>

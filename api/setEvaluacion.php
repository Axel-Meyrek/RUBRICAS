<?php
require "connectionDataBase.php";

// Leer el contenido JSON del cuerpo del request
$contenido = file_get_contents("php://input");
$data = json_decode($contenido, true); // true para obtener un array asociativo

// Validar que se recibieron los datos necesarios
if (isset($data['id_profesor'], $data['id_rubrica'], $data['id_estudiante'], $data['puntaje'])) {
    $id_profesor = $data['id_profesor'];
    $id_estudiante = $data['id_estudiante'];
    $id_rubrica = $data['id_rubrica'];
    $puntaje = $data['puntaje'];

    $query = "INSERT INTO Evaluaciones (id_profesor, id_estudiante, id_rubrica, calificacion) VALUES (?, ?, ?, ?)";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("iiid", $id_profesor, $id_estudiante, $id_rubrica, $puntaje);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Evaluación guardada correctamente"]);
    } else {
        echo json_encode(["success" => false, "error" => "Error al guardar: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
}
?>

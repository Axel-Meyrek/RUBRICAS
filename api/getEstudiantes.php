<?php
    require "connectionDataBase.php";

    $params = json_decode(file_get_contents("php://input"), true);

    $id_grupo = $params["id_grupo"];

    $query = /* MySql */
        "SELECT *
        FROM G_Estudiantes
        WHERE id_grupo = '$id_grupo';";


    $resultado = mysqli_query($conexion, $query);

    $estudiantes = [];

    while($estudiante = mysqli_fetch_object($resultado)) {
        $estudiantes[] = $estudiante;
    }

    if ($estudiantes) echo json_encode($estudiantes);
    else echo json_encode(["error" => "Sin datos"]);
?>
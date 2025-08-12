<?php
    require "connectionDataBase.php";

    $params = json_decode(file_get_contents("php://input"), true);

    $id_rubrica = $params["id_rubrica"];

    if ($id_rubrica === null) {
        die("El ID de la rúbrica no fue proporcionado.");
    }


    $query = /* MySql */
        "SELECT DISTINCT G_Grupos.*
        FROM G_Rubrica_Estudiante
        JOIN G_Estudiantes ON G_Estudiantes.id = G_Rubrica_Estudiante.id_estudiante
        JOIN G_Grupos ON G_Estudiantes.id_grupo = G_Grupos.id
        WHERE G_Rubrica_Estudiante.id_rubrica = $id_rubrica;";


    $resultado = mysqli_query($conexion, $query);

    $grupos = [];

    while($grupo = mysqli_fetch_object($resultado)) {
        $grupos[] = $grupo;
    }

    if ($grupos) echo json_encode($grupos);
    else echo json_encode(["error" => "Sin datos"]);
?>
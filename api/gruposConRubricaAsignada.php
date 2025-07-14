<?php
    require "connectionDataBase.php";

    $params = json_decode(file_get_contents("php://input"), true);

    $id_rubrica = $params["id_rubrica"];

    $query = /* MySql */
        "SELECT DISTINCT Grupos.*
        FROM Rubrica_Estudiante
        JOIN Estudiantes ON Estudiantes.id = Rubrica_Estudiante.id_estudiante
        JOIN Grupos ON Estudiantes.id_grupo = Grupos.id
        WHERE Rubrica_Estudiante.id_rubrica = $id_rubrica;";


    $resultado = mysqli_query($conexion, $query);

    $grupos = [];

    while($grupo = mysqli_fetch_object($resultado)) {
        $grupos[] = $grupo;
    }

    if ($grupos) echo json_encode($grupos);
    else echo json_encode(["error" => "Sin datos"]);
?>
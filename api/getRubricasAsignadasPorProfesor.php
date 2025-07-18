<?php
    require "connectionDataBase.php";

    $params = json_decode(file_get_contents("php://input"), true);

    $id_profesor = $params["id_profesor"];

    $query = 
        "SELECT DISTINCT Rubricas.id, Rubricas.titulo, Rubricas.descripcion, Rubricas.fecha
        FROM Profesores
        JOIN Grupos ON Profesores.id = Grupos.id_profesor
        JOIN Estudiantes ON Grupos.id = Estudiantes.id_grupo
        JOIN Rubrica_Estudiante ON Estudiantes.id = Rubrica_Estudiante.id_estudiante
        JOIN Rubricas ON Rubrica_Estudiante.id_rubrica = Rubricas.id
        WHERE Profesores.id = $id_profesor;";

    $resultado = mysqli_query($conexion, $query);

    $rubricas = [];

    while($rubrica = mysqli_fetch_object($resultado)) {
        $rubricas[] = $rubrica;
    }

    if ($rubricas) echo json_encode($rubricas);
    else echo json_encode(["error" => "Sin datos"]);
?>
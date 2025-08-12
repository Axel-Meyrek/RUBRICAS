<?php
    require "connectionDataBase.php";

    $params = json_decode(file_get_contents("php://input"), true);

    $id_profesor = $params["id_profesor"];

    $query = 
        "SELECT DISTINCT G_Rubricas.id, G_Rubricas.titulo, G_Rubricas.descripcion, G_Rubricas.fecha
        FROM G_Profesores
        JOIN G_Grupos ON G_Profesores.id = G_Grupos.id_profesor
        JOIN G_Estudiantes ON G_Grupos.id = G_Estudiantes.id_grupo
        JOIN G_Rubrica_Estudiante ON G_Estudiantes.id = G_Rubrica_Estudiante.id_estudiante
        JOIN G_Rubricas ON G_Rubrica_Estudiante.id_rubrica = G_Rubricas.id
        WHERE G_Profesores.id = $id_profesor;";

    $resultado = mysqli_query($conexion, $query);

    $rubricas = [];

    while($rubrica = mysqli_fetch_object($resultado)) {
        $rubricas[] = $rubrica;
    }

    if ($rubricas) echo json_encode($rubricas);
    else echo json_encode(["error" => "Sin datos"]);
?>
<?php
    require "connectionDataBase.php";

    $params = json_decode(file_get_contents("php://input"), true);

    $id_profesor = $params["id_profesor"];

    $query = 
        "SELECT count(Estudiantes.id) AS 'Total_Estudiantes'
        FROM Estudiantes
        JOIN Grupos
        ON Estudiantes.id_grupo = Grupos.id
        WHERE Grupos.id_profesor = '$id_profesor';";

    $resultado = mysqli_query($conexion, $query);

    $totalEstudiantes = mysqli_fetch_object($resultado);

    if ($totalEstudiantes) echo json_encode($totalEstudiantes);
    else echo json_encode(["error" => "Sin datos"]);
?>
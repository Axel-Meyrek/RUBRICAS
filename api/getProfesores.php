<?php
    require "connectionDataBase.php";

    $query = "SELECT * FROM Profesores;";

    $resultado = mysqli_query($conexion, $query);

    $profesores = [];

    while($profesor = mysqli_fetch_object($resultado)) {
        $profesores[] = $profesor;
    }

    if ($profesores) echo json_encode($profesores);
    else echo json_encode(["error" => "Sin datos"]);
?>
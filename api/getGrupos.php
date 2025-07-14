<?php
    require "connectionDataBase.php";

    $query = "SELECT * FROM Grupos;";

    $resultado = mysqli_query($conexion, $query);

    $grupos = [];

    while($grupo = mysqli_fetch_object($resultado)) {
        $grupos[] = $grupo;
    }

    if ($grupos) echo json_encode($grupos);
    else echo json_encode(["error" => "Sin datos"]);
?>
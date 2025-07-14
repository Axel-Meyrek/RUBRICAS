<?php
    require "connectionDataBase.php";

    $query = "SELECT * FROM Rubricas;";

    $resultado = mysqli_query($conexion, $query);

    $rubricas = [];

    while($rubrica = mysqli_fetch_object($resultado)) {
        $rubricas[] = $rubrica;
    }

    if ($rubricas) echo json_encode($rubricas);
    else echo json_encode(["error" => "Sin datos"]);
?>
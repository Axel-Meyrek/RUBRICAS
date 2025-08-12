<?php
    require "connectionDataBase.php";

    $params = json_decode(file_get_contents("php://input"), true);

    $id_profesor = $params["id_profesor"];

    $query = "SELECT id, periodo FROM G_Grupos WHERE id_profesor = $id_profesor;";

    $resultado = mysqli_query($conexion, $query);

    $grupos = [];

    while($grupo = mysqli_fetch_object($resultado)) {
        $grupos[] = $grupo;
    }

    if ($grupos) echo json_encode($grupos);
    else echo json_encode(["error" => "Sin datos"]);
?>
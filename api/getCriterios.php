<?php
    require "connectionDataBase.php";

    $params = json_decode(file_get_contents("php://input"), true);

    $id_rubrica = $params["id_rubrica"];

    if ($id_rubrica === null) {
        die("El ID de la rúbrica no fue proporcionado.");
    }

    $query = /* MySql */
        "SELECT *
        FROM G_Criterios
        WHERE id_rubrica = '$id_rubrica'";


    $resultado = mysqli_query($conexion, $query);

    $criterios = [];

    while($criterio = mysqli_fetch_object($resultado)) {
        $criterios[] = $criterio;
    }

    if ($criterios) echo json_encode($criterios);
    else echo json_encode(["error" => "Sin datos"]);
?>
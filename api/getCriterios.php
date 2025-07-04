<?php
    require "connectionDataBase.php";

    $params = json_decode(file_get_contents("php://input"), true);

    $id_rubrica = $params["id_rubrica"];

    $query = /* MySql */
        "SELECT id, titulo, ponderacion, descripcion_de, descripcion_ae, descripcion_e, descripcion_se
        FROM Criterios
        WHERE id_rubrica = '$id_rubrica'";


    $resultado = mysqli_query($conexion, $query);

    $criterios = [];

    while($criterio = mysqli_fetch_object($resultado)) {
        $criterios[] = $criterio;
    }

    if ($criterios) echo json_encode($criterios);
    else echo json_encode(["error" => "Sin datos"]);
?>
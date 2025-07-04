<?php
    require "connectionDataBase.php";

    $params = json_decode(file_get_contents("php://input"), true);

    $id_profesor = $params['id_profesor'];
    $password = $params['password'];


    // 1. Verificar credenciales del profesor

    $query = 
        "SELECT id, nombre_completo, correo_electronico
        FROM Profesores
        WHERE id = '$id_profesor' AND password = '$password';";

    $resultado = mysqli_query($conexion, $query);
    $profesor = mysqli_fetch_assoc($resultado);

    if (!$profesor) {
        echo json_encode(["error" => "Credenciales incorrectas"]);
        exit;
    }


    // 2. Obtener grupos con su rúbrica asociada

    $queryGrupos = 
            "SELECT 
            G.id AS grupo_id,
            G.nombre AS grupo_nombre,
            G.periodo,
            R.id AS rubrica_id,
            R.titulo AS rubrica_titulo,
            R.descripcion AS rubrica_descripcion
        FROM Grupos G
        LEFT JOIN Rubricas R ON G.id_rubrica = R.id
        WHERE G.id_profesor = '$id_profesor'
        ORDER BY G.id;";

    $resultadoGrupos = mysqli_query($conexion, $queryGrupos);
    $grupos = [];

    while ($row = mysqli_fetch_assoc($resultadoGrupos)) {
        $grupo = [
            "id" => $row["grupo_id"],
            "nombre" => $row["grupo_nombre"],
            "periodo" => $row["periodo"],
            "rubrica" => null
        ];

        if ($row["rubrica_id"] !== null) {
            $grupo["rubrica"] = [
                "id" => $row["rubrica_id"],
                "titulo" => $row["rubrica_titulo"],
                "descripcion" => $row["rubrica_descripcion"]
            ];
        }

        $grupos[] = $grupo;
    }


    // 3. Armar respuesta final con profesor + grupos

    $response = [
        "profesor" => $profesor,
        "grupos" => $grupos
    ];

    echo json_encode($response);
?>

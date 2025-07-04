<?php
    require "connectionDataBase.php";

    $params = json_decode(file_get_contents("php://input"), true);

    $id = $params['id'];
    $password = $params['password'];

    // 1. Verificar si es ADMINISTRADOR

    $queryAdmin = "SELECT id, nombre_completo, correo_electronico
        FROM Administrador
        WHERE id = '$id' AND password = '$password';";

    $resultadoAdmin = mysqli_query($conexion, $queryAdmin);
    $admin = mysqli_fetch_assoc($resultadoAdmin);

    if ($admin) {
        echo json_encode([
            "tipo" => "administrador",
            "usuario" => $admin
        ]);
        exit;
    }

    // 2. Verificar si es PROFESOR

    $queryProf = "SELECT id, nombre_completo, correo_electronico
        FROM Profesores
        WHERE id = '$id' AND password = '$password';";

    $resultadoProf = mysqli_query($conexion, $queryProf);
    $profesor = mysqli_fetch_assoc($resultadoProf);

    if (!$profesor) {
        echo json_encode(["error" => "Credenciales incorrectas"]);
        exit;
    }

    // 3. Obtener los grupos del profesor con su rúbrica asociada

    $queryGrupos = "SELECT 
            G.id AS grupo_id,
            G.nombre AS grupo_nombre,
            G.periodo,
            R.id AS rubrica_id,
            R.titulo AS rubrica_titulo,
            R.descripcion AS rubrica_descripcion
        FROM Grupos G
        LEFT JOIN Rubricas R ON G.id_rubrica = R.id
        WHERE G.id_profesor = '$id'
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

    echo json_encode([
        "tipo" => "profesor",
        "usuario" => $profesor,
        "grupos" => $grupos
    ]);
?>

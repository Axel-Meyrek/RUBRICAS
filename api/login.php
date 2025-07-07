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

    if ($profesor) {
        echo json_encode([
            "tipo" => "profesor",
            "usuario" => $profesor
        ]);
    } else {
        echo json_encode(["error" => "Credenciales incorrectas"]);
    }
?>

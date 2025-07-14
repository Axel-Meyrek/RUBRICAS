<?php
    require "connectionDataBase.php";

    $params = json_decode(file_get_contents("php://input"), true);

    $id = $params['id'];
    $password = $params['password'];

    //VERIFICAR SI ES ADMINSIRADOR
    $queryAdmin = /* MySql */
        "SELECT id, nombre, email, password
        FROM Administradores
        WHERE id = '$id' and password = '$password';";

    $resultadoAdmin = mysqli_query($conexion, $queryAdmin);
    $admin = mysqli_fetch_assoc($resultadoAdmin);

    if ($admin) {
        echo json_encode([
            "tipo" => "administrador",
            "usuario" => $admin
        ]);
        exit;
    }

    //VERFICAR SI ES PROFESOR
    $queryProf = /* MySql */
        "SELECT id, nombre, email, password
        FROM Profesores
        WHERE id = '$id' and password = '$password';";

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
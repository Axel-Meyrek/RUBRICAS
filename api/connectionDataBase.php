<?php
    $host = "localhost";
    $user = "AxelMeyrek";
    $pass = "Galletas12345";
    $dbname = "RUBRICAS_UPAEP";
    
    $conexion = new mysqli($host, $user, $pass, $dbname);

    
    if ($conexion -> connect_error) {
        http_response_code(500);
        echo json_encode(["error" => "Error de conexión: " . $conexion -> connect_error]);
        exit();
    }
    $conexion -> set_charset("utf8");
?>
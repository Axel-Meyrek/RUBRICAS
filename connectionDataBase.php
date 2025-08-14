<?php
    $host = "92.249.45.29:3306";
    $dbname = "proydweb_v2025";
    $user = "proydweb_v2025";
    $pass = "D3sWeb_v2@25";
    
    $conexion = new mysqli($host, $user, $pass, $dbname);

    
    if ($conexion -> connect_error) {
        http_response_code(500);
        echo json_encode(["error" => "Error de conexión: " . $conexion -> connect_error]);
        exit();
    }
    $conexion -> set_charset("utf8");
?>
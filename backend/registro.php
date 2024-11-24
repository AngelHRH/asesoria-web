<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Configuración de la conexión a la base de datos
$host = 'localhost';
$dbname = 'proyecto_tutorias';
$username = 'root';
$password = 'Tu_mama2208';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["error" => "Conexión fallida: " . $e->getMessage()]));
}

// Verificar que la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $contraseña = $_POST['contraseña'] ?? '';
    $tipo_usuario = $_POST['tipo_usuario'] ?? 'alumno';
    $asignatura = $_POST['asignatura'] ?? null;
    $foto_perfil = null;

    // Manejar la subida de la foto de perfil
    if (isset($_FILES['foto_perfil']) && $_FILES['foto_perfil']['error'] === UPLOAD_ERR_OK) {
        $directorio_subida = 'uploads/';
        if (!is_dir($directorio_subida)) {
            mkdir($directorio_subida, 0755, true);
        }
        $nombre_archivo = uniqid() . '-' . basename($_FILES['foto_perfil']['name']);
        $ruta_archivo = $directorio_subida . $nombre_archivo;

        if (move_uploaded_file($_FILES['foto_perfil']['tmp_name'], $ruta_archivo)) {
            $foto_perfil = $ruta_archivo;
        }
    }

    // Encriptar la contraseña
    $hash_contraseña = password_hash($contraseña, PASSWORD_BCRYPT);

    try {
        $sql = "INSERT INTO usuarios (nombre, correo, contraseña, tipo_usuario, asignatura, foto_perfil)
                VALUES (:nombre, :correo, :contraseña, :tipo_usuario, :asignatura, :foto_perfil)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nombre' => $nombre,
            ':correo' => $correo,
            ':contraseña' => $hash_contraseña,
            ':tipo_usuario' => $tipo_usuario,
            ':asignatura' => $asignatura,
            ':foto_perfil' => $foto_perfil
        ]);

        echo json_encode(["success" => true, "message" => "Usuario registrado correctamente."]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al registrar usuario: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Método no permitido."]);
}
?>

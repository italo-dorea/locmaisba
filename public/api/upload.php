<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-User, X-Admin-Pass");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Function to validate credentials
function checkAuth() {
    $headers = apache_request_headers();
    $user = $_SERVER['HTTP_X_ADMIN_USER'] ?? $headers['x-admin-user'] ?? '';
    $pass = $_SERVER['HTTP_X_ADMIN_PASS'] ?? $headers['x-admin-pass'] ?? '';

    if ($user !== 'locmais' || $pass !== 'locmais2026') {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized. Invalid credentials."]);
        exit();
    }
}

checkAuth();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(["error" => "No image uploaded or upload error."]);
        exit();
    }

    $file = $_FILES['image'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    // Allowed extensions
    $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    
    if (!in_array($ext, $allowed)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid file extension. Allowed: jpg, jpeg, png, webp, gif."]);
        exit();
    }
    
    // Validate size (e.g. max 5MB)
    $maxSize = 5 * 1024 * 1024;
    if ($file['size'] > $maxSize) {
        http_response_code(400);
        echo json_encode(["error" => "File too large. Maximum 5MB."]);
        exit();
    }
    
    // Create directory if not exists
    $uploadDir = __DIR__ . '/../imagens/upload/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    // Generate unique name
    $newFileName = uniqid('prod_') . '.' . $ext;
    $destination = $uploadDir . $newFileName;
    
    if (move_uploaded_file($file['tmp_name'], $destination)) {
        http_response_code(200);
        // Return public URL relative to site root
        echo json_encode([
            "message" => "Upload successful",
            "url" => "/imagens/upload/" . $newFileName
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to move uploaded file."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-User, X-Admin-Pass");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Scan upload directory for images
$uploadDir = __DIR__ . '/../imagens/upload/';
$images = [];

if (is_dir($uploadDir)) {
    $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    $files = scandir($uploadDir, SCANDIR_SORT_DESCENDING);
    
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (in_array($ext, $allowed)) {
            $images[] = [
                'name' => $file,
                'url' => '/imagens/upload/' . $file,
            ];
        }
    }
}

echo json_encode($images);

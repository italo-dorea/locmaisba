<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-User, X-Admin-Pass");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$file_path = __DIR__ . '/products.json';

// Initialize file if not exists
if (!file_exists($file_path)) {
    file_put_contents($file_path, json_encode([]));
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

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Read products (public, no auth needed to read)
    $data = file_get_contents($file_path);
    echo $data;
    exit();
}

// All other methods require auth
checkAuth();

// Get JSON input
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
$products = json_decode(file_get_contents($file_path), TRUE);

if (!is_array($products)) {
    $products = [];
}

if ($method === 'POST') {
    // Create new product
    if (empty($input['id'])) {
        $input['id'] = (string)(time() . rand(100, 999));
    }
    
    // Add to top of array
    array_unshift($products, $input);
    
    if (file_put_contents($file_path, json_encode($products, JSON_PRETTY_PRINT))) {
        http_response_code(201);
        echo json_encode(["message" => "Product created successfully", "product" => $input]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save product."]);
    }
}
elseif ($method === 'PUT') {
    // Update product
    $id = $_GET['id'] ?? $input['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(["error" => "Missing product ID."]);
        exit();
    }
    
    $found = false;
    foreach ($products as $key => $product) {
        if ((string)$product['id'] === (string)$id) {
            $products[$key] = array_merge($product, $input);
            $found = true;
            $input = $products[$key];
            break;
        }
    }
    
    if ($found) {
        file_put_contents($file_path, json_encode($products, JSON_PRETTY_PRINT));
        echo json_encode(["message" => "Product updated successfully", "product" => $input]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Product not found."]);
    }
}
elseif ($method === 'DELETE') {
    // Delete product
    $id = $_GET['id'] ?? $input['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(["error" => "Missing product ID."]);
        exit();
    }
    
    $initialCount = count($products);
    $products = array_filter($products, function($p) use ($id) {
        return (string)$p['id'] !== (string)$id;
    });
    
    $products = array_values($products); // Re-index array
    
    if (count($products) < $initialCount) {
        file_put_contents($file_path, json_encode($products, JSON_PRETTY_PRINT));
        echo json_encode(["message" => "Product deleted successfully"]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Product not found."]);
    }
}
else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}

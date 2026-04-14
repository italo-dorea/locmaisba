<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Admin-User, X-Admin-Pass");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$file_path = __DIR__ . '/categories.json';

if (!file_exists($file_path)) {
    file_put_contents($file_path, json_encode([]));
}

function checkAuth() {
    $user = $_SERVER['HTTP_X_ADMIN_USER'] ?? '';
    $pass = $_SERVER['HTTP_X_ADMIN_PASS'] ?? '';
    if ($user !== 'locmais' || $pass !== 'locmais2026') {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized."]);
        exit();
    }
}

function slugify($text) {
    $text = mb_strtolower($text, 'UTF-8');
    $text = preg_replace('/[áàãâä]/u', 'a', $text);
    $text = preg_replace('/[éèêë]/u', 'e', $text);
    $text = preg_replace('/[íìîï]/u', 'i', $text);
    $text = preg_replace('/[óòõôö]/u', 'o', $text);
    $text = preg_replace('/[úùûü]/u', 'u', $text);
    $text = preg_replace('/[ç]/u', 'c', $text);
    $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
    $text = preg_replace('/[\s]+/', '-', trim($text));
    return $text;
}

$method = $_SERVER['REQUEST_METHOD'];
$categories = json_decode(file_get_contents($file_path), true);
if (!is_array($categories)) $categories = [];

if ($method === 'GET') {
    echo json_encode($categories);
    exit();
}

checkAuth();

$input = json_decode(file_get_contents('php://input'), true);

if ($method === 'POST') {
    if (empty($input['name'])) {
        http_response_code(400);
        echo json_encode(["error" => "Category name is required."]);
        exit();
    }
    $id = slugify($input['name']);
    // Check duplicate
    foreach ($categories as $cat) {
        if ($cat['id'] === $id) {
            http_response_code(409);
            echo json_encode(["error" => "Category already exists."]);
            exit();
        }
    }
    $newCat = ["id" => $id, "name" => $input['name']];
    $categories[] = $newCat;
    usort($categories, fn($a, $b) => strcmp($a['name'], $b['name']));
    file_put_contents($file_path, json_encode($categories, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    http_response_code(201);
    echo json_encode(["message" => "Category created.", "category" => $newCat]);
}
elseif ($method === 'PUT') {
    $id = $_GET['id'] ?? $input['id'] ?? null;
    if (!$id || empty($input['name'])) {
        http_response_code(400);
        echo json_encode(["error" => "ID and name are required."]);
        exit();
    }
    $found = false;
    foreach ($categories as &$cat) {
        if ($cat['id'] === $id) {
            $cat['name'] = $input['name'];
            $found = true;
            $updated = $cat;
            break;
        }
    }
    unset($cat);
    if ($found) {
        usort($categories, fn($a, $b) => strcmp($a['name'], $b['name']));
        file_put_contents($file_path, json_encode($categories, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(["message" => "Category updated.", "category" => $updated]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Category not found."]);
    }
}
elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? $input['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(["error" => "ID is required."]);
        exit();
    }
    $before = count($categories);
    $categories = array_values(array_filter($categories, fn($c) => $c['id'] !== $id));
    if (count($categories) < $before) {
        file_put_contents($file_path, json_encode($categories, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(["message" => "Category deleted."]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Category not found."]);
    }
}
else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);
}

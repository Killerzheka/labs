<?php
// ajax/deleteReservation.php
header('Content-Type: application/json; charset=utf-8');
require '../config.php';

// Перевіряємо, що прийшов id
if (empty($_POST['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing reservation id']);
    exit;
}

$id = (int)$_POST['id'];

// Виконуємо видалення
$stmt = $db->prepare("DELETE FROM reservations WHERE id = ?");
$stmt->execute([$id]);

echo json_encode(['success' => true]);
<?php
// ajax/getRooms.php
header('Content-Type: application/json; charset=utf-8');
require '../config.php';  // підключення до PDO $db

// Отримати всі кімнати
$stmt = $db->query("
  SELECT
    id,
    name,
    capacity,
    status
  FROM rooms
  ORDER BY id
");

$rooms = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    // DayPilot чекає властивість "text" для заголовка ресурсу
    $rooms[] = [
        'id'       => $row['id'],
        'name'     => $row['name'],
        'capacity' => (int)$row['capacity'],
        'status'   => $row['status']
    ];
}

echo json_encode($rooms);
<?php
// ajax/getReservations.php
header('Content-Type: application/json; charset=utf-8');
require '../config.php';

// Обираємо всі бронювання
$stmt = $db->query("
  SELECT
    r.id,
    r.name AS guest,
    r.start,
    r.end,
    r.room_id,
    r.status,
    r.paid
  FROM reservations AS r
  ORDER BY r.start
");

$events = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $events[] = [
        'id'       => $row['id'],
        'text'     => $row['guest'],        // підписи подій
        'start'    => $row['start'],        // ISO-рядок
        'end'      => $row['end'],
        'resource' => $row['room_id'],      // пов’язка на id кімнати
        'status'   => $row['status'],
        'paid'     => (int)$row['paid']
    ];
}

echo json_encode($events);
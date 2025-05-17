<?php
require "../config.php";
$stmt = $db->prepare("
  INSERT INTO reservations (name, start, end, room_id, status, paid)
  VALUES (?, ?, ?, ?, 'New', 0)
");
$stmt->execute([$_POST['name'], $_POST['start'], $_POST['end'], $_POST['room_id']]);
echo json_encode(['id' => $db->lastInsertId()]);
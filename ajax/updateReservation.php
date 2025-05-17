<?php
require "../config.php";
$stmt = $db->prepare("
  UPDATE reservations
  SET start = ?, end = ?, room_id = ?
  WHERE id = ?
");
$stmt->execute([$_POST['start'], $_POST['end'], $_POST['room_id'], $_POST['id']]);
echo "OK";
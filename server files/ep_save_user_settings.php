<?php
require '../credentials/pass.php';

$domain = $_SERVER['HTTP_ORIGIN'];

if (!in_array($domain, ['https://eyewire.org', 'https://beta.eyewire.org', 'https://chris.eyewire.org'])) {
  exit('incorrect domain');
}

session_start();
session_regenerate_id();

header('Access-Control-Allow-Origin: ' . $domain);
header('Access-Control-Allow-Credentials: true'); // source: https://stackoverflow.com/a/47993517


$pdo = new PDO(
  "mysql:host={$host};dbname={$dbname}", $user, $pass,
  [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
);

if (!$_POST['uname']) {
  exit();
}

if ($_SESSION['uip'] !== $_SERVER['REMOTE_ADDR']) {
  exit();
}

$uname = $_POST['uname'];
$uname = str_replace(array('"', "'"), '', $uname);

$uid = filter_input(INPUT_POST, 'uid', FILTER_VALIDATE_INT);
$notes = filter_input(INPUT_POST, 'notes', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$flag1 = filter_input(INPUT_POST, 'flag1', FILTER_VALIDATE_INT);
$flag2 = filter_input(INPUT_POST, 'flag2', FILTER_VALIDATE_INT);
$flag3 = filter_input(INPUT_POST, 'flag3', FILTER_VALIDATE_INT);
$deleteAvatar = filter_input(INPUT_POST, 'delete_avatar', FILTER_VALIDATE_BOOLEAN);

if ($uid !== $_SESSION['uid']) {
  exit();
}

$path = 'avatars/' . $uname . '.png';

$avatarExists = false;
if (isset($_FILES['avatar'])) {
  $avatar = $_FILES['avatar'];
  $avatarExists = true;
}

$hasAvatar = (int)!$deleteAvatar;

$sql = "INSERT INTO extended_profile (uname, notes, flag1, flag2, flag3, has_avatar)
  VALUES ('{$uname}', '{$notes}', {$flag1}, {$flag2}, {$flag3}, {$hasAvatar})
  ON DUPLICATE KEY UPDATE
  notes='{$notes}', flag1={$flag1}, flag2={$flag2}, flag3={$flag3}, has_avatar={$hasAvatar}";

$result = $pdo->query($sql);


if ($deleteAvatar) {
  if (file_exists($path)) {
    unlink($path);
  }
}

if ($avatarExists) {
  $img = imagecreatefromstring(file_get_contents($avatar['tmp_name']));
  $img = imagescale($img, 100, 100, IMG_BICUBIC);
  imagepng($img, $path);
}
echo 'done';

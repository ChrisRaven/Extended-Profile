<?php
require '../credentials/pass.php';

$domain = $_SERVER['HTTP_ORIGIN'];

if (!in_array($domain, ['https://eyewire.org', 'https://beta.eyewire.org', 'https://chris.eyewire.org', 'https://dev1.eyewire.org'])) {
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
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$notes = filter_input(INPUT_POST, 'notes', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$flag1 = filter_input(INPUT_POST, 'flag1', FILTER_VALIDATE_INT);
$flag2 = filter_input(INPUT_POST, 'flag2', FILTER_VALIDATE_INT);
$flag3 = filter_input(INPUT_POST, 'flag3', FILTER_VALIDATE_INT);
$avatarType = filter_input(INPUT_POST, 'avatarType', FILTER_VALIDATE_INT);
$avatarName = filter_input(INPUT_POST, 'avatarName', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$avatarName = str_replace(array('/', '\\'), '', $avatarName);

if ($uid !== $_SESSION['uid'] || $uname !== $_SESSION['uname']) {
  exit();
}

$customAvatarExists = false;
if ($avatarType === 2 && isset($_FILES['avatar'])) {
  $avatarFile = $_FILES['avatar'];
  $customAvatarExists = true;
}

if (is_null($avatarType)) {
  $avatarType = 0;
}

$sql = "INSERT INTO extended_profile (uname, contact, notes, flag1, flag2, flag3, avatarType, avatarName)
  VALUES ('{$uname}', '{$email}', '{$notes}', {$flag1}, {$flag2}, {$flag3}, {$avatarType}, '{$avatarName}')
  ON DUPLICATE KEY UPDATE
  contact='{$email}', notes='{$notes}', flag1={$flag1}, flag2={$flag2}, flag3={$flag3}, avatarType={$avatarType}, avatarName='{$avatarName}'";

$result = $pdo->query($sql);


$customPath = 'avatars/' . $uname . '.png';

if ($avatarType === 0 || $avatarType === 1) {
  if (file_exists($customPath)) {
    unlink($customPath);
  }
}

if ($customAvatarExists) {
  $img = imagecreatefromstring(file_get_contents($avatarFile['tmp_name']));
  $img = imagescale($img, 100, 100, IMG_BICUBIC);
  imagepng($img, $customPath);
}

echo 'done';

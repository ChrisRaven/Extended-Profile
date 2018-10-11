<?php
require '../credentials/pass.php';

$domain = $_SERVER['HTTP_ORIGIN'];

if (!in_array($domain, ['https://eyewire.org', 'https://beta.eyewire.org', 'https://chris.eyewire.org'])) {
  exit('incorrect domain');
}

header('Access-Control-Allow-Origin: ' . $domain);


$pdo = new PDO(
  "mysql:host={$host};dbname={$dbname}", $user, $pass,
  [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
);

if (!$_POST['uname']) {
  exit();
}

$uname = $_POST['uname'];
$uname = str_replace(array('"', "'"), '', $uname);

$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$notes = filter_input(INPUT_POST, 'notes', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$flag1 = filter_input(INPUT_POST, 'flag1', FILTER_VALIDATE_INT);
$flag2 = filter_input(INPUT_POST, 'flag2', FILTER_VALIDATE_INT);
$flag3 = filter_input(INPUT_POST, 'flag3', FILTER_VALIDATE_INT);
$deleteAvatar = filter_input(INPUT_POST, 'delete_avatar', FILTER_VALIDATE_BOOLEAN);

$path = 'avatars/' . $uname . '.png';

$avatarExists = false;
if (isset($_FILES['avatar'])) {
  $avatar = $_FILES['avatar'];
  $avatarExists = true;
}

$hasAvatar = (int)!$deleteAvatar;

$sql = "INSERT INTO extended_profile (uname, contact, notes, flag1, flag2, flag3, has_avatar)
  VALUES ('{$uname}', '{$email}', '{$notes}', {$flag1}, {$flag2}, {$flag3}, {$hasAvatar})
  ON DUPLICATE KEY UPDATE
  contact='{$email}', notes='{$notes}', flag1={$flag1}, flag2={$flag2}, flag3={$flag3}, has_avatar={$hasAvatar}";

$result = $pdo->query($sql);


if ($deleteAvatar) {
  if (file_exists($path)) {
    unlink($path);
  }
}

if ($avatarExists) {
  $img = imagecreatefromstring(file_get_contents($avatar['tmp_name']));
  $img = imagescale($img, 96, 96, IMG_BICUBIC);
  imagepng($img, $path);
}
echo 'done';

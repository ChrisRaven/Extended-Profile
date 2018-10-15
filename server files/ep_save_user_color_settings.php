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

if ($uid !== $_SESSION['uid']) {
  exit();
}

$settings = filter_input(INPUT_POST, 'settings', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

$sql = "INSERT INTO extended_profile (uname, settings) VALUES ('{$uname}', '{$settings}') ON DUPLICATE KEY UPDATE settings='{$settings}'";

$result = $pdo->query($sql);

echo 'done';

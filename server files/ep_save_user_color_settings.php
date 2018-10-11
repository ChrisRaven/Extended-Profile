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

$settings = filter_input(INPUT_POST, 'settings', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

$sql = "INSERT INTO extended_profile (uname, settings) VALUES ('{$uname}', '{$settings}') ON DUPLICATE KEY UPDATE settings='{$settings}'";

$result = $pdo->query($sql);

echo 'done';

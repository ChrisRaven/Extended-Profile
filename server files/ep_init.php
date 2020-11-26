<?php
require '../credentials/pass.php';

$pdo = new PDO(
  "mysql:host={$host};dbname={$dbname}", $user, $pass,
  [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
);

$domain = $_SERVER['HTTP_ORIGIN'];

if (!in_array($domain, ['https://eyewire.org', 'https://beta.eyewire.org', 'https://chris.eyewire.org', 'https://dev1.eyewire.org'])) {
  exit('incorrect domain');
}

session_start();

header('Access-Control-Allow-Origin: ' . $domain);
header('Access-Control-Allow-Credentials: true'); // source: https://stackoverflow.com/a/47993517

$uname = $_POST['uname'];
$uname = str_replace(array('"', "'"), '', $uname);

$uid = filter_input(INPUT_POST, 'uid', FILTER_VALIDATE_INT);
$_SESSION['uid'] = $uid;
$_SESSION['uip'] = $_SERVER['REMOTE_ADDR'];
$_SESSION['uname'] = $uname;

echo 'done';
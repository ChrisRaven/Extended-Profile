<?php
require '../credentials/pass.php';

$pdo = new PDO(
  "mysql:host={$host};dbname={$dbname}", $user, $pass,
  [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
);

$domain = $_SERVER['HTTP_ORIGIN'];

if (!in_array($domain, ['https://eyewire.org', 'https://beta.eyewire.org', 'https://chris.eyewire.org'])) {
  exit('incorrect domain');
}

header('Access-Control-Allow-Origin: ' . $domain);

$uname = $_GET['uname'];
$uname = str_replace(array('"', "'"), '', $uname);

$result = $pdo->query("SELECT * FROM extended_profile WHERE uname = '{$uname}'");

if ($result->rowCount()) {
  while ($row = $result->fetch()) {
    echo json_encode($row);
  }
}
else {
  echo '{"uname": null}';
}


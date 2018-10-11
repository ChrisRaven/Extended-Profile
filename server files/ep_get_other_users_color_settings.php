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

$result = $pdo->query("SELECT uname, settings FROM extended_profile");

$finalResult = [];
if ($result->rowCount()) {
  $rows = $result->fetchAll();
  for ($i = 0; $i < count($rows); $i++) {
    $finalResult[$rows[$i]['uname']] = htmlspecialchars_decode($rows[$i]['settings']);
  }
  echo json_encode($finalResult);
}
else {
  echo '{"settings": null}';
}

<?php

header('Content-type: application/json; charset=utf-8');

$data1 = $_GET['data1'];
$data2 = $_GET['data2'];

$url = "http://prog1.studio.pianolab.com.br/pedalai/bike_way_parks.php?latitudeFrom=-8.045769&longitudeFrom=-34.905022";
$dados = file_get_contents($url);

echo $dados;

?>
<?php

header('Content-type: application/json; charset=utf-8');

$data1 = $_GET['data1'];
$data2 = $_GET['data2'];

$url = "http://dados.recife.pe.gov.br/storage/f/2014-07-23T16%3A09%3A54.062Z/ciclo-faixa.geojson";
$dados = file_get_contents($url);

echo $dados;

?>
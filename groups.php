<?php

include_once "config.php";

$earthRadius = 6371000;
$query = mysql_query("SELECT * FROM groups LIMIT 20");
$latitudeFrom = floatval($_GET['latitudeFrom']);
$longitudeFrom = floatval($_GET['longitudeFrom']);
$parks_result = array();

while($lin=mysql_fetch_assoc($query)){
  $lin['lat'] = str_replace(',', '.', $lin['lat']);
  $lin['lon'] = str_replace(',', '.', $lin['lon']);
  $latitudeTo = floatval($lin['lat']);
  $longitudeTo = floatval($lin['lon']);


  $latFrom = deg2rad($latitudeFrom);
  $lonFrom = deg2rad($longitudeFrom);
  $latTo = deg2rad($latitudeTo);
  $lonTo = deg2rad($longitudeTo);
  $latDelta = $latTo - $latFrom;
  $lonDelta = $lonTo - $lonFrom;
  $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) + cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
  $km = (($angle * $earthRadius)/1000); // result in m

  $indice = number_format($km, 6, '.', '');
  $km = number_format($km, 1, '.', '');
  $ar = array(
    "id" => intval($lin['id']),
    "name" => utf8_encode($lin['name']),
    "distance" => $km,
    "schedule" => utf8_encode($lin['schedule']),
    "information" => utf8_encode($lin['description']),
    "car" => $lin['car'],
    "price" => $lin['price'],
    "level" => $lin['level'],
    "lat" => floatval($lin['lat']),
    "lon" => floatval($lin['lon']),
    );
  $parks_result[$indice] = $ar;
}
ksort($parks_result);
echo json_encode($parks_result);
?>
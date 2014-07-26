<?php
// http://prog1.studio.pianolab.com.br/pedalai/bike_way_parks.php/index?latitudeFrom=-8.0390280&longitudeFrom=-34.8707380
/*
* Calculates the great-circle distance between two points, with
* the Vincenty formula.
* @param float $latitudeFrom Latitude of start point in [deg decimal]
* @param float $longitudeFrom Longitude of start point in [deg decimal]
* @param float $latitudeTo Latitude of target point in [deg decimal]
* @param float $longitudeTo Longitude of target point in [deg decimal]
* @param float $earthRadius Mean earth radius in [m]
* @return float Distance between points in [m] (same as earthRadius)
*/

$ciclo_way = file_get_contents("http://dados.recife.pe.gov.br/storage/f/2014-07-23T16%3A09%3A54.062Z/ciclo-faixa.geojson");
$ciclo_way = json_decode($ciclo_way, true);

$earthRadius = 6371000;
$ciclo_way_result = array();

$latitudeFrom = $_GET['latitudeFrom'];
$longitudeFrom = $_GET['longitudeFrom'];

foreach ($ciclo_way['features'] as $key => $lin) {

$coord = reset($lin['geometry']['coordinates']);
$coord2 = end($lin['geometry']['coordinates']);

$coordinates = array(
  0 => array('lat' => $coord[1], 'lon' => $coord[0]),
  1 => array('lat' => $coord2[1], 'lon' => $coord2[0])
  );

$array = array();
foreach ($coordinates as $key => $coordinate) {
  $latitudeTo = $coordinate['lat'];
  $longitudeTo = $coordinate['lon'];
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
  $array[] = $km;
  $array['key'] = $indice;
}
if($array[0] > $array[1]){ // getting the shorter point
  $km = $array[1];
}
else{
  $km = $array[0];
}

$arr = array(
  'id' => intval($lin['id']),
  'name' => ucwords(strtolower($lin['properties']['Name'])),
  'type' => ucwords(strtolower($lin['properties']['Type'])),
  'distance' => $km,
  );
$ciclo_way_result[$array['key']] = $arr;
}
ksort($ciclo_way_result);

/* ------------------------------------------------------------------------------------------------------------- */

include_once "config.php";

$earthRadius = 6371000;
$query = mysql_query("SELECT * FROM parks WHERE nome_equip_urbano <> '' OR nome_equip_urbano <> null LIMIT 20");
$latitudeFrom = floatval($_GET['latitudeFrom']);
$longitudeFrom = floatval($_GET['longitudeFrom']);
$parks_result = array();

while($lin=mysql_fetch_assoc($query)){
  $lin['latitude'] = str_replace(',', '.', $lin['latitude']);
  $lin['longitude'] = str_replace(',', '.', $lin['longitude']);
  $latitudeTo = floatval($lin['latitude']);
  $longitudeTo = floatval($lin['longitude']);


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
    "name" => ucwords(strtolower(utf8_encode($lin['nome_equip_urbano']))),
    "type" => ucwords(strtolower(utf8_encode($lin['tipo_equip_urbano']))),
    "distance" => $km,
    );
  $parks_result[$indice] = $ar;
}
ksort($parks_result);

echo json_encode(array_merge($ciclo_way_result, $parks_result));
?>
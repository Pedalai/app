<?php
$config = array(
  "nome"    =>"PEDAL AÍ",
  "host"     =>"localhost",
  "user"     =>"root",
  "senha"    =>"root",
  "db"       =>"pedalai",
  "banco"    =>"mysql"
);


function sitei($string)
{
  global $config;
  return $config[$string];
}

$con_db = mysql_connect(sitei('host'),sitei('user'),sitei('senha'));
$sel_db = mysql_select_db(sitei('db'));

?>
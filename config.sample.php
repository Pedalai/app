<?php

$config = array(
  "nome"    =>"PEDALAÍ",
  "host"     =>"localhost",
  "user"     =>"root",
  "senha"    =>"",
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
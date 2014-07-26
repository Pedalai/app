<?php
$config = array(
  "nome"    =>"PEDAL AÍ",
  "host"     =>"pianolab.com.br",
  "user"     =>"prog1_rayann",
  "senha"    =>"rayannrag1",
  "db"       =>"prog1_pedalai",
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
<?php include('Constants.php'); ?>

<!doctype html>
<html xmlns:og="http://ogp.me/ns#" lang="pt-br">
<head>
	<meta charset="utf-8" />

	<title><?php echo _TITLE ?></title>

  <!-- Facebook  -->
  <meta property="og:type" content="business.business">
  <meta property="og:url" content="http://pedalai.com.br">
  <meta property="og:title" content="Pedalaí">
  <meta property="og:image" content="http://pedalai.com.br/img/pedalai-facebook.png">
  <meta property="og:description" content="WebApp desenvolvido para incentivar os ciclistas a pedalarem em grupo ou individual.">

  <!-- Twitter -->
  <meta name="twitter:card" value="summary">
  <meta name="twitter:creator" value="@pedalaiapp">
  <meta name="twitter:site" value="@pedalaiapp">

  <!-- Apple Touch Icon -->
  <link rel="apple-touch-icon" href="touch-icon@2x.png">
  <link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
  <link rel="apple-touch-icon" sizes="120x120" href="touch-icon@2x.png">
  <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad@2x.png">

  <!-- Humans -->
  <link type="text/plain" rel="author" href="http://pedalai.com.br/humans.txt" />

  <!-- CSS -->
  <link rel="stylesheet" href="dist/css/styles.combined.min.css">

</head>

<body data-ng-app="APP">
	<header>
		<h1><?php echo _TITLE ?></h1>
	</header>

	<ul class="menu">
		<li ng-class="{active: activeLink == '/'}"><a href="#/" title="Lista" class="icon-list"></a></li>
		<li ng-class="{active: activeLink == '/map'}"><a href="#/map" title="Mapa" class="icon-location"></a></li>
	</ul>

	<!-- view - start -->
	<div data-ng-view class="content"></div>
	<!-- view - end -->

	<!-- Scripts -->
	<script src="libs/angular/angular.min.js"></script>
	<script src="libs/angular-route/angular-route.min.js"></script>
	<script src='http://maps.googleapis.com/maps/api/js?sensor=false'></script>

	<script src="dist/js/scripts.combined.min.js"></script>
</body>
</html>
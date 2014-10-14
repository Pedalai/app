<?php include('inc/header.php') ?>

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

	<!-- libs - start -->
	<script src="libs/angular/angular.min.js"></script>
	<script src="libs/angular-route/angular-route.min.js"></script>
	<script src='http://maps.googleapis.com/maps/api/js?sensor=false'></script>
	<!-- libs - end -->

	<!-- development - start -->
	<script src="dist/js/scripts.combined.min.js"></script>
	<!-- development - end -->
</body>
</html>
<?php include('Constants.php'); ?>

<!doctype html>
<html xmlns:og="http://ogp.me/ns#" lang="pt-br">
<head>
	<meta charset="utf-8" />

	<title><?php echo _TITLE ?></title>

  <!-- META TAGS -->
  <meta name="viewport" content="width=device-width, initial-scale=0.9, maximum-scale=1.0, user-scalable=0">
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="apple-touch-fullscreen" content="yes" />
  <meta name="HandheldFriendly" content="true" />
  <meta name="format-detection" content="telephone=yes">
  <meta http-equiv="cleartype" content="on">

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
  <link rel="stylesheet" href="dist/css/style.min.css">

</head>

<body>
  <header id="header-primary" class="header-primary">
    <h1 class="logo">
      <a href="#" title="Pedalaí">Pedalaí</a>
    </h1>

    <nav class="nav-primary">
      <div class="legend-choose">
        <p>Vou pedalar</p>
        <h2>Sozinho</h2>
      </div>

      <div class="switch-choose">
      </div>
    </nav>
	</header>

	<main id="main" class="main">
	</main>

	<footer id="footer-primary" class="footer-primary">
    <aside class="details">
      <div>
        <figure class="ico-local">
          <img src="" alt="Ícone do local">
        </figure>
        <h3 class="title-local">Praça do Arsenal</h3>
        <address>Rua do Bom Jesus, Recife - PE</address>
      </div>

      <p class="distance">2,4km</p>
    </aside>

    <button class="go-route">Iniciar rota</button>
	</footer>


	<!-- Libs -->
	<script src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>

	<!-- JS -->
  <script src="dist/js/libs.min.js"></script>
  <script src="dist/js/scripts.min.js"></script>

	<!-- BrowserSync -->
  <script type='text/javascript'>//<![CDATA[
;document.write("<script defer src='//HOST:3000/socket.io/socket.io.js'><\/script><script defer src='//HOST:3001/client/browser-sync-client.0.9.1.js'><\/script>".replace(/HOST/g, location.hostname));
//]]></script>
</body>
</html>

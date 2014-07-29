<footer class="footer">
  <div class="center"></div>
</footer>


<script src="libs/js/jquery-2.1.1.min.js"></script>
<script src="libs/js/foundation.min.js"></script>
<script src="libs/js/foundation.offcanvas.js"></script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBaTdjugjXQ2DuUsARrnV8sb1dVoGtIqCI"></script>
<script src="libs/js/infobox_packed.js"></script>
<script src="dist/js/scripts.combined.min.js"></script>

<script>
$(document).foundation();
APP.iniciar();
</script>

<!-- REMOVER O SCRIPT ABAIXO ANTES DE ENVIAR PARA O AMBIENTE DE PRODUÇÃO -->
<script type='text/javascript'>//<![CDATA[
;document.write("<script defer src='//HOST:3000/socket.io/socket.io.js'><\/script><script defer src='//HOST:3001/client/browser-sync-client.0.9.1.js'><\/script>".replace(/HOST/g, location.hostname));
//]]></script>
</body>
</html>
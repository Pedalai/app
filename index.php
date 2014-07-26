<?php include("inc/header.php") ?>

	<div class="off-canvas-wrap" data-offcanvas>

	  <div class="inner-wrap">

	    <!-- nav -->
	    <nav class="tab-bar">
        <!-- btn left canvas -->
	      <section class="left-small">
	        <a class="left-off-canvas-toggle menu-icon" href="#">
	        	<span></span>
	        </a>
	      </section>

	      <section class="middle tab-bar-section">
	        <h1 class="title-primary">Quero Pedalar</h1>
	      </section>
      </nav>

      <!-- btn right canvas -->
      <section class="right-small">
        <a class="menu-icon" href="#"></a>
      </section>


	    <!-- menu esquerdo -->
	    <aside class="left-off-canvas-menu">
	      <ul class="off-canvas-list">
	        <li><label class="canvas-title">Quero Pedalar <span>mapa ></span></label></li>
	        <li class="canvas-list alone"><a class="alone" href="#">Sozinho</a></li>
	        <li class="canvas-list"><a class="group" href="#">Em Grupo</a></li>
	      </ul>

	     	<?php include('inc/legends.php') ?>
	    </aside>

	    <section id="main-section" class="main-section">
	    </section>

	  	<a class="exit-off-canvas"></a>

	  </div>

	 <div id="map"></div>

  </div>


<?php include("inc/footer.php") ?>
$(document).ready(function() {
    // Variáveis
    var height = window.innerHeight,
        x = 0, y = height / 2,
        curveX = 0,
        curveY = 0,
        targetX = 0,
        xitteration = 0,
        yitteration = 0,
        menuExpanded = false;
  
    // DOM element references
    var blob = $('#blob'),
        blobPath = $('#blob-path'),
        hamburger = $('.hamburger');
  
    // Event handler for mouse movement
    $(this).on('mousemove', function(e) {
      x = e.pageX;
      y = e.pageY;
    });
  
    // Event handlers for menu interaction
    $('.hamburger, .menu-inner').on('mouseenter', function() {
      $(this).parent().addClass('expanded');
      menuExpanded = true;
    });
  
    $('.menu-inner').on('mouseleave', function() {
      menuExpanded = false;
      $(this).parent().removeClass('expanded');
    });
  
    // Easing function for smooth animation
    function easeOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
      return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
    }
  
    // Constants for animation
    var hoverZone = 100;
    var expandAmount = 40;
  
    // Function to create SVG curve animation
    function svgCurve() {
      if ((curveX > x - 1) && (curveX < x + 1)) {
        xitteration = 0;
      } else {
        if (menuExpanded) {
          targetX = 0;
        } else {
          xitteration = 0;
          if (x > hoverZone) {
            targetX = 0;
          } else {
            targetX = -(((60 + expandAmount) / 100) * (x - hoverZone));
          }
        }
        xitteration++;
      }
  
      if ((curveY > y - 1) && (curveY < y + 1)) {
        yitteration = 0;
      } else {
        yitteration = 0;
        yitteration++;
      }
  
      // Calculate curve values
      curveX = easeOutExpo(xitteration, curveX, targetX - curveX, 60);
      curveY = easeOutExpo(yitteration, curveY, y - curveY, 60);
      var anchorDistance = 250;
      var curviness = anchorDistance - 60;
  
      // SVG path definition
      var newCurve2 = "M60," + height + "H0V0h60v" + (curveY - anchorDistance) + "c0," + curviness + "," + curveX + "," + curviness + "," + curveX + "," + anchorDistance + "S60," + (curveY) + ",60," + (curveY + (anchorDistance * 2)) + "V" + height + "z";
  
      // Apply changes to DOM elements
      blobPath.attr('d', newCurve2);
      blob.width(curveX + 60);
      hamburger.css('transform', 'translate(' + curveX + 'px, ' + curveY + 'px)');
      $('h2').css('transform', 'translateY(' + curveY + 'px)');
  
      // Animação contínua
      window.requestAnimationFrame(svgCurve);
    }
  
    // Chamada animação
    window.requestAnimationFrame(svgCurve);


   // Função para fechar o modal
function closeModal() {
  $('.modal').removeClass('open');
}

// Fechar o modal quando o botão dentro do modal é clicado
$('.close-button').on('click', function () {
  closeModal();
});

// Evento de clique nos links do menu para abrir os modais
$('.open-modal').on('click', function (e) {
  e.preventDefault();
  var modalId = $(this).data('modal-id');

  // Fechar o modal atual antes de abrir o novo
  closeModal();

  // Abrir o novo modal
  $('#' + modalId).addClass('open');
});


});
  
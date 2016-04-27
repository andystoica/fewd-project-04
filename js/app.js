/**
 * Assemble gallery and zoom element
 */

// Assemble the gallery from JSON data
var galleryHTML = '<ul class="gallery">';
$.each(galleryItems, function(index, item){
  galleryHTML += '<li class="gallery-item active ' + item.type + '">';
  galleryHTML += '<a href="' + item.location + '">';
  galleryHTML += '<img src="' + item.thumbnail + '" alt="' + item.title + '" title="' + item.caption + '">';
  galleryHTML += '</a>';
  galleryHTML += '</li>';

  // Preload target images as the gallery is built
  if (item.type === "image")
  {
    $('<img/>')[0].src = item.location;
  }
});
  galleryHTML += '</ul>';

// Assemble the zoom Lightbox
var zoomHTML  = '<div class="zoom">';
    zoomHTML += ' <div class="zoom-wrap">';
    zoomHTML += '   <a href="#" class="zoom-nav zoom-prev"></a>';
    zoomHTML += '   <div class="zoom-media">';
    zoomHTML += '     <img src="img/media-bg.png" alt="">';
    zoomHTML += '     <iframe src=""></iframe>';
    zoomHTML += '   </div>';
    zoomHTML += '   <a href="#" class="zoom-nav zoom-next"></a>';
    zoomHTML += '   <p class="zoom-caption"></p>';
    zoomHTML += ' </div>';
    zoomHTML += '</div>';

// Add gallery and zoomBox to the DOM
$('main').html(galleryHTML);
$('body').append(zoomHTML);

// Hooking variables
var $zoom = $('.zoom').hide();
var $imageFrame = $('.zoom img');
var $videoFrame = $('.zoom iframe').hide();
var $zoomPrev = $('.zoom-prev');
var $zoomNext = $('.zoom-next');
var $zoomMedia = $('.zoom-media');
var $zoomCaption = $('.zoom-caption');
var $curentPosition;
var $totalActive;


/**
 * Search Function
 */

// Search function sets the "active" class to filtered items and hides the rest
$('#search').keyup(function(){

  // Loop through all gallery items and search the title image attibute
  var searchWord = $('#search').val();
  $('.gallery-item').each(function(index, item){
      var searchTitle = $(item).children('a').children('img').attr('title');
        if (searchTitle.indexOf(searchWord) === -1)
        {
          $(item).fadeOut(300).removeClass('active');
        } else {
          $(item).fadeIn(300).addClass('active');
        }
  });

  // Add empty gallery units to keep the formatting tidy on 4 columns
  $('.empty').remove();
  var toAdd = 4 - $('.active').length % 4;
  for (var i = 0; i < toAdd; i++)
  {
    $('.gallery').append('<li class="empty"></li>');
  }
});



/**
 * Zoom function
 */

function loadZoomContent(item){

  $zoomCaption.animate({opacity: 0});
  $zoomMedia.animate({opacity: 0}, function(){

    // Read image information
    var elementURL = $(item).attr('href');
    var elementCaption = $(item).children().attr('title');

    // Add caption
    $zoomCaption.text(elementCaption);

    // Set information based on elementy type
    if ($(item).parent().hasClass('video'))
    {
      $imageFrame.attr('src', 'img/media-bg.png');
      $videoFrame.attr('src', elementURL).show();
    } else {
      $videoFrame.fadeOut();
      $imageFrame.attr('src', elementURL);
    }

    $zoomMedia.animate({opacity: 1});
    $zoomCaption.animate({opacity: 1});

  });


  // Disable arrow buttons if the end was reached
  curentPosition = $('.active').index($(item).parent());
  totalActive = $('.active').length;

  if (curentPosition === 0) {
    $zoomPrev.addClass('zoom-button-hide');
  } else {
    $zoomPrev.removeClass('zoom-button-hide');
  }

  if (curentPosition === totalActive - 1) {
    $zoomNext.addClass('zoom-button-hide');
  } else {
    $zoomNext.removeClass('zoom-button-hide');
  }
}



/**
* Prev Next button navigation
*/

$zoomPrev.click(function(){
  loadZoomContent($('.active').eq(curentPosition - 1).children('a'));
  return false;
});

$zoomNext.click(function(){
  loadZoomContent($('.active').eq(curentPosition + 1).children('a'));
  return false;
});



/**
* Keyboard navigation and event
*/

$(document).keydown(function(event){
  if (!$zoomPrev.hasClass('zoom-button-hide') && event.which === 37)
  {
    loadZoomContent($('.active').eq(curentPosition - 1).children('a'));
  }
  else if (!$zoomNext.hasClass('zoom-button-hide') && event.which === 39)
  {
    loadZoomContent($('.active').eq(curentPosition + 1).children('a'));
  }
  else if (event.which === 27)
  {
    hideZoom();
  }
});



/**
* Activate zoom
*/

// Show up the zoom box when clicking on a gallery item
$(".gallery-item a").click(function(event){
  event.preventDefault();
  $zoomMedia.animate({opacity: 0}, 0);
  $zoomCaption.animate({opacity: 0}, 0);
  loadZoomContent(this);
  $zoom.fadeIn(300);
});



/**
* Deactivate zoom
*/

function hideZoom(){
  $videoFrame.attr('src', '');
  $zoom.fadeOut(200);
}

$zoom.click(function(){
  hideZoom();
});

/**
 * Gallery Items in JSON format
 */

var galleryItems = [{
  type: "image",
  location: "img/01.jpg",
  thumbnail: "img/thumbnails/01.jpg",
  title: "Hay Bales",
  caption: "I love hay bales. Took this snap on a drive through the countryside past some straw fields."

  }, {
  type: "image",
  location: "img/02.jpg",
  thumbnail: "img/thumbnails/02.jpg",
  title: "Lake",
  caption: "The lake was so calm today. We had a great view of the snow on the mountains from here."

  }, {
  type: "image",
  location: "img/03.jpg",
  thumbnail: "img/thumbnails/03.jpg",
  title: "Canyon",
  caption: "I hiked to the top of the mountain and got this picture of the canyon and trees below."

  }, {
  type: "image",
  location: "img/04.jpg",
  thumbnail: "img/thumbnails/04.jpg",
  title: "Iceberg",
  caption: "It was amazing to see an iceberg up close, it was so cold but didn’t snow today."

  }, {
  type: "image",
  location: "img/05.jpg",
  thumbnail: "img/thumbnails/05.jpg",
  title: "Desert",
  caption: "The red cliffs were beautiful. It was really hot in the desert but we did a lot of walking through the canyons."

  }, {
  type: "image",
  location: "img/06.jpg",
  thumbnail: "img/thumbnails/06.jpg",
  title: "Fall",
  caption: "Fall is coming, I love when the leaves on the trees start to change color."

  }, {
  type: "image",
  location: "img/07.jpg",
  thumbnail: "img/thumbnails/07.jpg",
  title: "Plantation",
  caption: "I drove past this plantation yesterday, everything is so green!"

  }, {
  type: "image",
  location: "img/08.jpg",
  thumbnail: "img/thumbnails/08.jpg",
  title: "Dunes",
  caption: "My summer vacation to the Oregon Coast. I love the sandy dunes!"

  }, {
  type: "image",
  location: "img/09.jpg",
  thumbnail: "img/thumbnails/09.jpg",
  title: "Countryside Lane",
  caption: "We enjoyed a quiet stroll down this countryside lane."

  }, {
  type: "image",
  location: "img/10.jpg",
  thumbnail: "img/thumbnails/10.jpg",
  title: "Sunset",
  caption: "Sunset at the coast! The sky turned a lovely shade of orange."

  }, {
  type: "image",
  location: "img/11.jpg",
  thumbnail: "img/thumbnails/11.jpg",
  title: "Cave",
  caption: "I did a tour of a cave today and the view of the landscape below was breathtaking."

  }, {
  type: "image",
  location: "img/12.jpg",
  thumbnail: "img/thumbnails/12.jpg",
  title: "Bluebells",
  caption: "I walked through this meadow of bluebells and got a good view of the snow on the mountain before the fog came in."

  }, {
  type: "video",
  location: "https://www.youtube.com/embed/0OYt947_k-w?rel=0&amp;controls=0&amp;showinfo=0",
  thumbnail: "img/thumbnails/13.jpg",
  title: "Desert",
  caption: "Some great footage of The Dam and Horseshoe Bend. It was really hot in the desert but we did a lot of flying through the canyons."

  }, {
  type: "video",
  location: "https://www.youtube.com/embed/c8jPTY4KvSo?rel=0&amp;controls=0&amp;showinfo=0",
  thumbnail: "img/thumbnails/14.jpg",
  title: "Shoreline",
  caption: "I was given a wonderful boat excursion by friends during which we discovered incredible shoreline locations"

  }, {
  type: "video",
  location: "https://www.youtube.com/embed/q423j4UIugE?rel=0&amp;controls=0&amp;showinfo=0",
  thumbnail: "img/thumbnails/15.jpg",
  title: "New Zealand",
  caption: "Aerial footage in the country side. Starts of with the bealy bridge, goes to the viaduct at aurthers pass, castle hill and lake lyndon."

  }, {
  type: "video",
  location: "https://www.youtube.com/embed/WHnOTKUX_X0?rel=0&amp;controls=0&amp;showinfo=0",
  thumbnail: "img/thumbnails/16.jpg",
  title: "Aerial footage",
  caption: "Flying the new DJI Phantom 4 over the Indian Ocean in Mauritius Island. Some more breathtaking aerial footage for all to enjoy."
}];



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

// Tracking variables
var curentPosition;
var totalActive;



/**
 * Search Function
 */

// Search function sets the "active" class to filtered items and hides the rest
$('#search').keyup(function(){

  // Loop through all gallery items and search the title image attibute
  var searchWord = $('#search').val().toLowerCase();
  $('.gallery-item').each(function(index, item){
      var searchTitle  = $(item).children('a').children('img').attr('title').toLowerCase();
          searchTitle += $(item).children('a').children('img').attr('alt').toLowerCase();
        if (searchTitle.indexOf(searchWord) === -1)
        {
          $(item).fadeOut(600).removeClass('active');
        } else {
          $(item).fadeIn(600).addClass('active');
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
}



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
  $imageFrame.attr('src', 'img/media-bg.png');
  $videoFrame.attr('src', '');
  $zoom.fadeOut(200);
}

$zoom.click(function(){
  hideZoom();
});



/**
* Prev Next button navigation
*/

$zoomPrev.click(function(){
  if (!$(this).hasClass('zoom-button-hide'))
  {
    loadZoomContent($('.active').eq(curentPosition - 1).children('a'));
  }
  return false;
});

$zoomNext.click(function(){
  if (!$(this).hasClass('zoom-button-hide'))
  {
    loadZoomContent($('.active').eq(curentPosition + 1).children('a'));
  }
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

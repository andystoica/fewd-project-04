// Lightbox elements
var $lbx = $('<div class="lightbox"></div>');
var $lbxContent = $('<div class="lightbox-content"></div>');
var $prevBtn = $('<span><a href="#" class="prev"></a></span>');
var $nextBtn = $('<span><a href="#" class="next"></a></span>');
var $imgElement = $('<img>');
var $videoElement = $('<iframe frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
var $elementCaption = $('<p></p>');
var $currentElement;

// Assemble the Lightbox
$('body').append($lbx);
$lbx.append($lbxContent);
$lbxContent.append($prevBtn, $imgElement, $videoElement, $nextBtn, $elementCaption);



// Load Lightbox content
function loadContent($item) {
  $currentElement = $item;

  // Read the content attributes
  var $itemLink = $item.children('a').attr('href');
  var $itemCaption = $item.children('a').children('img').attr('title');

  // Hide all elements
  $elementCaption.hide();
  $imgElement.hide();
  $videoElement.hide();
  $videoElement.attr('src', '');

  // Assemble the image element based on element type
  if ($item.hasClass('video'))
  {
    $videoElement.attr('src', $itemLink);
    $videoElement.fadeIn(350);
  } else {
    $imgElement.attr('src', $itemLink);
    $imgElement.fadeIn(350);
  }
  $elementCaption.text($itemCaption);
  $elementCaption.fadeIn(350);

  // If there is a previous element, show the previous button
  if ($item.prev().length)
  {
    $('.prev').fadeIn(100);
  } else {
    $('.prev').fadeOut(100);
  }

  // If there is a next element, show next button
  if ($item.next().length)
  {
    $('.next').fadeIn(100);
  } else {
    $('.next').fadeOut(100);
  }
}

// Close the Lightbox
function closeLightbox(){
  $videoElement.attr('src', '');
  $(".lightbox").fadeOut(200);
}

// Show up the lightbox when clicking on a gallery item
$(".gallery-item a").click(function(event){
  event.preventDefault();
  loadContent($(this).parent());
  $lbx.fadeIn(200);
});

// Get previous element if PREV button is visible
$prevBtn.click(function(){
  if ($(this).children('a').is(':visible'))
  {
    loadContent($currentElement.prev());
  }
  return false;
});

// Get next element if NEXT button is visible
$nextBtn.click(function(){
  if ($(this).children('a').is(':visible'))
  {
    loadContent($currentElement.next());
  }
  return false;
});

// Left Arrow, Right Arrow and Escape keyboard behaviour
$(document).keydown(function(event){
  if ($nextBtn.children('a').is(':visible') && event.which === 39)
  {
    loadContent($currentElement.next());
  }
  else if ($prevBtn.children('a').is(':visible') && event.which === 37)
  {
    loadContent($currentElement.prev());
  } else if (event.which === 27) {
    closeLightbox();
  }
});

// Hide the lightbox
$(".lightbox").click(function(){
  closeLightbox();
});



// Search function
$('#search').keyup(function(){
  var searchWord = $('#search').val();

  $('.gallery-item').each(function(index, element){
      var searchTitle = $(element).children('a').children('img').attr('title');
        if (searchTitle.indexOf(searchWord) === -1)
        {
          $(element).hide();
        } else {
          $(element).show();
        }
  });
});

// Initial array
var topics = ['The Flash', 'Chicago Cubs', 'Batman', 'Supergirl', 'Professor X', 'Doctor Strange', 'Iron Man'];

	function renderButtons() {
		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
	$('#imagesView').empty();
	// Loops through the array of topics
	for (var i = 0; i < topics.length; i++){
		
		// Dynamicaly generates buttons for each topic in the array
	    var a = $('<button>')
	    a.addClass('topic btn btn-primary btn-large'); // Added a class 
	    a.attr('data-name', topics[i]); // Added a data-attribute
	    a.text(topics[i]); // Provided the initial button text
	    $('#imagesView').append(a); // Added the button to the HTML
	}
	// clear the input value
	$('#topic-input').val('');
}

// This function handles events where one button is clicked
$('#add-topic').on('click', function(){
	// Don't create blank buttons
	if ( $('#topic-input').val() != '' ) {
		// This line of code will grab the input from the textbox
		var topic = $('#topic-input').val().trim();

		// The topic from the textbox is then added to our array
		topics.push(topic);
		
		// Our array then runs which handles the processing of our topic array
		renderButtons();
			
	}
	// enable enter key and do nothing if topic is blank
	return false;
	
});

$(document).on('click', '.topic', function() {

    var p = $(this).data('name');

    $('#gifsDiv').empty();

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .done(function(response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $('<div class="item">')

                var rating = results[i].rating;

                var p = $('<p>').text("Rating: " + rating);

                var heroImage = $('<img>');
                heroImage.attr('src', results[i].images.fixed_height_still.url);
                heroImage.attr('data-still', results[i].images.fixed_height_still.url);
				heroImage.attr('data-animate', results[i].images.fixed_height.url);                    
				heroImage.attr('data-state', 'still');
                
                gifDiv.append(heroImage)
                gifDiv.append(p)

                $('#gifsDiv').prepend(gifDiv);
            }
        });
});

$(document).on('click', '.item img', function(){

    var state = $(this).attr('data-state');
    
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } 
    else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
    
});


renderButtons();
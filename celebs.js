
$(document).ready(function() {

  var topics = ["Emma Stone", "Jennifer Lawrence", "anna kendrick", "bill murray", "leonardo dicaprio", "kim kardashian", "Beyonce", "David Hasselhoff", "Obama", "steve carell", "will farrell"];	

  //  creates button for each topic 
  function renderButtons(){
    $('#celev-buttons').empty();

    for (var i = 0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('movie');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#celeb-buttons').append(a);
          }
        }    
        renderButtons();

//on button click
$(document).on('click', '.movie', function() {

    //new variable will log the text data from each button
    var celebrity = $(this).html(); 
    // console.log(martialArts);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celebrity + "&api_key=dc6zaTOxFJmzC&limit=10";
    // console.log(queryURL);

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      var results = response.data;
        //console.log(results);
        //empties the div before adding more gifs
        $('#celebs-view').empty();
        for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                        // console.log(imageView);  

        var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#celebs-view').prepend(gifImage);
                    gifImage.on('click', playGif);

        
  } // end for loop

}); // done response

        //function to stop and animate gifs
        function playGif() { 
                    var state = $(this).attr('data-state');
                    // console.log(state);
                 if (state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } //end of on click function

      }); //end of document on click 

          //adding new button to array
        $(document).on('click', '#add-movie', function(){
            if ($('#celeb-input').val().trim() == ''){
              alert('{Please enter a celebrity name}');
           }
           else {
            var movies = $('#celeb-input').val().trim();
            topics.push(movies);
            $('#celeb-input').val('');
            renderButtons();
            return false;

            }

        });
                      

        }); // end click function// JavaScript Document
 // Initial array of movies
 var movies = ["Cinderella", "The Little Mermaid", "The Lion King", "Mulan", "Peter Pan", "Beauty and the Beast", "Monsters, Inc.", "The Incredibles", "Wall-e","The Emperor's New Groove", "Lilo and Stitch","Bambi", "Finding Nemo", "Pinocchio", "Winnie the Pooh", "Alice in Wonderland" ];

 // displayMovieInfo function re-renders the HTML to display the appropriate content
 function displayMovieGif() {

     var movie = $(this).attr("data-name");
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie +
         "&api_key=S7N4zV82ub9Vv7Zw3iapPSxhQQbuI8uf&limit=20";
     // Creating an AJAX call for the specific movie button being clicked
     $.ajax({
         url: queryURL,
         method: "GET"
     }).then(function (response) {
         for (var i = 0; i < response.data.length; i++) {

             var movieDiv = $("<div class='movie'>");

             var rating = response.data[i].rating;
             var ratingLabel = $("<p>").text("Rating: " + rating);
             movieDiv.append(ratingLabel);


             var gifURL = response.data[i].images.fixed_height_still.url;
            //  var actionGif = response.data[i].images.fixed_height.url;
             var image = $("<img>").attr("src", gifURL);
            //  image.attr("data-state", "still");
            //  image.attr("data-name", movie);
            //  image.attr("data-still", gifURL);
            //  image.attr("data-animate", actionGif);


             // Appending the image
             movieDiv.append(image);

             // Putting the entire movie above the previous movies
             $("#movies-view").prepend(movieDiv);

         }




     });

 }

 // Function for displaying movie data
 function renderButtons() {

     // Deleting the movies prior to adding new movies
     // (this is necessary otherwise you will have repeat buttons)
     $("#buttons-view").empty();

     // Looping through the array of movies
     for (var i = 0; i < movies.length; i++) {

         // Then dynamicaly generating buttons for each movie in the array
         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
         var a = $("<button>");
         // Adding a class of movie-btn to our button
         a.addClass("movie-btn");
         // Adding a data-attribute
         a.attr("data-name", movies[i]);
         // Providing the initial button text
         a.text(movies[i]);
         // Adding the button to the buttons-view div
         $("#buttons-view").append(a);
     }
 }

 // This function handles events where a movie button is clicked
 $("#add-movie").on("click", function (event) {
     event.preventDefault();
     // This line grabs the input from the textbox
     var movie = $("#movie-input").val().trim();

     // Adding movie from the textbox to our array
     movies.push(movie);

     // Calling renderButtons which handles the processing of our movie array
     renderButtons();
 });

 // Adding a click event listener to all elements with a class of "movie-btn"
 $(document).on("click", ".movie-btn", displayMovieGif);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();


function gifAction(){

var state = $(this).attr("data-state");
if (state === "still") {
    var animate = $(this).attr("data-animate");
    $(this).attr("src", animate);
    $(this).attr("data-state", "animate");
} else {
    var still =  $(this).attr("data-still");
    $(this).attr("src", still);
    $(this).attr("data-state", "still");
}
};

$(".disney-movie").on("click", displayGifs)
$(".action").on("click",gifAction);

renderButton(); 


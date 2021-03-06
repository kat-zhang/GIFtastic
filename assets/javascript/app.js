 // Initial array of movies
 var disneyMovies = ["The Little Mermaid", "The Lion King", "Mulan", "Peter Pan","Monsters, Inc.", "Toy Story","The Emperor's New Groove","Bambi","Finding Nemo", "Pinocchio", "Winnie the Pooh"];

 // displayMovieInfo function re-renders the HTML to display the appropriate content
 function displayMovieGif() {

     var newMovie = $(this).attr("data-name");
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newMovie +
         "&api_key=S7N4zV82ub9Vv7Zw3iapPSxhQQbuI8uf&limit=20";
     // Creating an AJAX call for the specific movie button being clicked
     $.ajax({
         url: queryURL,
         method: "GET"
     }).then(function (response) {
        $("#movies-view").empty();
        for (var i = 0; i < response.data.length; i++) {
            
             var movieDiv = $("<div class='movie'>");

             var rating = response.data[i].rating;
             var ratingLabel = $("<p>").text("Rating: " + rating);
             movieDiv.append(ratingLabel);
             

             var gifURL = response.data[i].images.fixed_height_still.url;
             var actionGif = response.data[i].images.fixed_height.url;
             var image = $("<img>").attr("src", gifURL);
             image.addClass("action");
             image.attr("data-state", "still");     
             image.attr("data-name",newMovie);       
             image.attr("data-still", gifURL);     
             image.attr("data-animate", actionGif); 

             
             // Appending the image
             movieDiv.append(image);

             // Putting the entire gif above the previous gifs
             $("#movies-view").prepend(movieDiv);
            

        }

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
            
            
            $(".action").on("click",gifAction);



     });

}

 function renderButtons() {

     // Deleting the previously displayed gifs
     
     $("#buttons-view").empty();

     // Looping through the default array
     for (var i = 0; i < disneyMovies.length; i++) {

         // generate buttons for the default array
        
         var a = $("<button>");
         // Adding a class of movie-btn to each button
         a.addClass("movie-btn btn btn-warning btn-sm");
         // Adding a data-attribute
         a.attr("data-name", disneyMovies[i]);
         // Adding movie title as button text
         a.text(disneyMovies[i]);
         // Adding the button to their div
         $("#buttons-view").append(a);
     }
 }

 // what the #add-movie button will do when it's clicked
 $("#add-movie").on("click", function (event) {
     event.preventDefault();
     // This line grabs the input
     var newMovie = $("#movie-input").val().trim();

     // Adding movie from the input to our array
     disneyMovies.push(newMovie);

     // Calling renderButtons
     renderButtons();
 });

 
 $(document).on("click", ".movie-btn", displayMovieGif);

 // Calling the renderButtons function to display the buttons
 renderButtons();







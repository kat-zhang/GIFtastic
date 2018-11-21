// Default button choices //
var disneyMovies = ['Cinderella','The Little Mermaid','The Lion King', 'Mulan','Peter Pan', 'Monsters, Inc', 'Lilo and Stitch', 'Toy Story', 'Finding Nemo','The Incredibles', 'Wall-e', 'Ratatouille', 'Up'];

// new search by user
$("button").on("click", function() {

    var disneyMovie = $(this).attr("data-disney");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + disneyMovie + "&api_key=S7N4zV82ub9Vv7Zw3iapPSxhQQbuI8uf&limit=20";

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function(response){
        
   
    var results = response.data;

    for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div>");
        var rating  = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var movieGif = $("<img>");
        movieGif.attr("src", results[i].images.fixed_height.url);
        gifDiv.append(p);
        gifDiv.append(movieGif);
        $("#gif-holder").prepend(gifDiv);
    }
});

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < disneyMovies.length; i++); {

        var add = $("<buttons>");
        add.addClass("movie-btn");
        add.attr("data-title", disneyMovies[i]);
        add.text(disneyMovies[i]);

        $("#buttons-view").append(add);
        }
    }

    $("add-gif").on("click", function(event) {
        event.preventDefault();
        var disneyMovie = $("#disney-input").val().trim();
        disneyMovies.push(disneyMovie);
        renderButtons();
    });


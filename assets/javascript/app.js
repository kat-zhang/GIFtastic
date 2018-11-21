// Default button choices //
var movies = ['Cinderella','The Little Mermaid','The Lion King', 'Mulan','Peter Pan', 'Monsters, Inc', 'Lilo and Stitch', 'Toy Story', 'Finding Nemo','The Incredibles', 'Wall-e', 'Ratatouille', 'Up'];

function displayRating() {

    var movie = $(this).attr("data-disney");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=S7N4zV82ub9Vv7Zw3iapPSxhQQbuI8uf&limit=20";

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function(response){
        
        var movieDiv = response.data;

        for (var i = 0; i < movie.length; i++) {

            if (results[i].rating !=="r" && newMov[i].rating !== "pg-13") {

                var gifDiv = $("<div>");
                var rating = newMov[i].rating;

                var ratingLabel = $("<p>").text("Rating: " + rating);

                var movieGif = $("<img>");

                movieGif.attr("src", newMov[i].images.fixed_height.url);

                gifDiv.append(ratingLabel);
                gifDiv.append(movieGif);


                $("#gif-holder").prepend(gifDiv);
            }
        }
    });
};

function renderbuttons(){

    $("#buttons-view").empty();

    for (var i = 0; i < disneyMovs.length; i++); {

        var add = $("<button>");
        add.addClass("disney-btn");
        add.attr("data-title", disneyMovs[i]);
        add.text(disneyMovs[i]);
        $("#buttons-view").append(add);
    }  
}

$("add-gif").on("click", function(event) {
    event.preventDefault();

    var disneyMov = $("#disney-input").val().trim();

    disneyMovs.push(disneyMov);
    render
});
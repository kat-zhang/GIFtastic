// Default button choices //
var disneyMovies = ['Cinderella','The Little Mermaid','The Lion King', 'Mulan','Peter Pan', 'Monsters, Inc', 'Lilo and Stitch', 'Toy Story', 'Finding Nemo','The Incredibles', 'Wall-e', 'Ratatouille', 'Up'];

// create button on click new search by user

function renderButton (){
    $("#buttons-view").empty();
    for (var i = 0; i < disneyMovies.length; i++) {
        var addButton = $("<button>");
        addButton.addClass("disney-movie");
        addButton.attr("data-title", disneyMovies[i]);
        addButton.text(disneyMovies[i]);
        $("#buttons-view").append(addButton);
    }
   
}
    


$("add-movie").on("click", function (event) {

    event.preventDefault();
    var disneyMovie = $("#movie-input").val().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + disneyMovie +
    "&api_key=S7N4zV82ub9Vv7Zw3iapPSxhQQbuI8uf&limit=20";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        disneyMovies.push(disneyMovie);
        renderButton();
    });
});

function displayGifs () {
    var disneyMovie = $(this).attr("data-title");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + disneyMovie + "&api_key=S7N4zV82ub9Vv7Zw3iapPSxhQQbuI8uf&limit=20";

	$.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){

        $("#movies-view").empty();
        for (var i = 0; i < response.data.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            gifDiv.html("<p>").attr("#rated");
            $("#rated").text("Rating: " + response.data[i].rating);

            var gifGif = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
            gifGif.addClass(".gif");

            var image = $("<div>"); 
            image.addClass("action");
            image.attr("data-state", "still")
            image.attr("data-title", disneyMovie)
            image.attr("data-still", response.data[i].images.fixed_height_still.url);
            image.attr("data-animate", response.data[i].images.fixed_height.url)


            $(image).append(gifGif);
            $(gifDiv).append(image);
            $("#movies-view").append(gifDiv);
        }
    });
    

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

$(".disney-movie").on("click", displayGifs)
$(".action").on("click",gifAction);

renderButton(); 


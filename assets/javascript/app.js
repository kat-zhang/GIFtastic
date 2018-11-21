// Default button choices //
var disneyMovies = ['Cinderella','The Little Mermaid','The Lion King', 'Mulan','Peter Pan', 'Monsters, Inc', 'Lilo and Stitch', 'Toy Story', 'Finding Nemo','The Incredibles', 'Wall-e', 'Ratatouille', 'Up', "Winnie the Pooh", "The Emperor's New Groove"];

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
            // renderButton();
        });
    });


}
    

function displayGifs () {
    var disneyMovie = $(this).attr("data-title");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + disneyMovie + "&api_key=S7N4zV82ub9Vv7Zw3iapPSxhQQbuI8uf&limit=20";

	$.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){

        $("#movies-view").empty();
        for (var i = 0; i < response.data.length; i++) {
            
        }
    });
    

}

// function gifAction(){

// var state = $(this).attr("data-state");
// if (state === "still") {
//     var animate = $(this).attr("data-animate");
//     $(this).attr("src", animate);
//     $(this).attr("data-state", "animate");
// } else {
//     var still =  $(this).attr("data-still");
//     $(this).attr("src", still);
//     $(this).attr("data-state", "still");
// }
// };

// $(".disney-movie").on("click", displayGifs)
// $(".action").on("click",gifAction);

renderButton(); 


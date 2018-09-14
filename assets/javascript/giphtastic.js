

var nhlArr = [
  "Wild", "Ranger", "Devil", "Star", "Shark", "Duck", "Canadien", "Flame", "King", "Knight"
]


renderButtons = function() {

var buttonDiv = $("#button-box");

for ( i = 0; i < nhlArr.length; i++) {

  var myButton = $("<button class='btn-success m-1'>");

  myButton.text(nhlArr[i]);

  buttonDiv.append(myButton)

}
}

renderButtons()

$("button").on("click", function() {

  var buttonName = $(this).text();

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonName + "&api_key=lbIHWW6vw8V17hjV4qQJtYIw1pr93J1T&limit=10";

  $.ajax ({

    url: queryURL,
    method: "GET"
  })

  .then(function(giphyResponse) {

    $("#giphDump").empty();

    var results = giphyResponse.data;

    console.log(results);

    for ( i = 0; i<results.length; i++) {

      if (results[i].rating !=="r") {

        var resultDiv = $("<div class='giph'>");

        var rating = results[i].rating;

        var giphRating = $("<p>").text("Rating: " + rating);

        var giphImage = $("<img>");
        // set default src to still image, then toggle with on click event
        giphImage.attr("src", results[i].images.fixed_height.url);
        // add attributes for managing gif state. To be used for "pausing and playing" gif on click
        // .attr("data-pause", results[i].images.)
        // .attr("data-play", results[i].images.fixed_height.url)
        // .attr("data-state", "still")

        resultDiv.append(giphRating, giphImage);
      
        $("#giphDump").append(resultDiv);

      }

    }

    // for buttons that are dynamically created: $(document).on("click", "#btn", function(event) {
      // $(this)
    // }

  });

});

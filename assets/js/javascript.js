$(document).ready(function(){
	function itsGoTime(){
		var sports = ["Baseball", "Basketball", "Cricket", "Fishing", "Football",
									"Hockey", "Skiing", "Snowboarding", "Soccer", "Tennis"];

		//Displays the buttons for the sports
		function displayGifButtons(){
			var sports = $(this).attr("data-name");
			var gifURLbase = "https://api.giphy.com/v1/gifs/search?q=";
			var apiKey = "&api_key=dc6zaTOxFJmzC";
			var gifURL = gifURLbase + sports + apiKey;

			$.ajax({
				url: gifURL,
				method: "GET"
			}).done(function(response){
				// console.log(response);

				//removes the gifs each time you click a new button
				$("#stillGifOnPage").empty();
				$("#movingGifOnPage").empty();

				//Still & Animated Gif section begins
				var amountOfStillGifs = 10;
				for(i = 0; i < amountOfStillGifs; i++){
					function gifImage(){

						// still gifs
						var stillGifGenerator = ("<div> <img id = stillId'" + i + "' src = '"
																				+ response.data[i].images.fixed_height_still.url + "''>"
																				+ "<br>" + "Rating: " + response.data[i].rating
																				+ " ↑"
																				+ "<br>" + "</div>" );
						$("#stillGifOnPage").append(stillGifGenerator).show();

						// animated gifs
						var animatedGifGenerator = ("<div> <img id = moveId'" + i + "' src = '"
																				+ response.data[i].images.fixed_height.url + "''>"
																				+ "<br>" + "Rating: " + response.data[i].rating
																				+ " ↑"
																				+ "<br>" + "</div>" );
						$("#movingGifOnPage").append(animatedGifGenerator).hide();

					// This allows you to click the page to alternate between still and animated gifs.
						var stillStill = response.data[i].images.fixed_height_still.url;
						console.log(stillStill);
						// I haven't been able to figure out how to attach the stillGifGenerator variable
						// to the below code. It keeps registering an error and saying it's not a function.
						// I know it's not a function, but shouldn't I be able to pass that through so I can
						// reference each specific gif I click on?
						// TYLER: Don't quite understand where you're trying to attach the code to… Let's go
						// over this during office hours if you're dying to track this down.
						$("#stillGifOnPage").on("click", function(){

							$("#stillGifOnPage").hide();
							$("#movingGifOnPage").show();
						})

					// This allows you to click the page to alternate between still and animated gifs.
						$("#movingGifOnPage").on("click", function(){
							$("#movingGifOnPage").hide();
							$("#stillGifOnPage").show();
						})
					}
					gifImage();
				}
				//Still & Animated Gif section ends.
			});
		}

		function callButtons(){
			$("#buttons-view").empty();
			for (var i = 0; i < sports.length; i++){
				var a = $("<button>");
				a.addClass("sport");
				a.attr("data-name", sports[i]);
				a.text(sports[i]);
				$("#buttons-view").append(a);
			}
		}
		// This displays the buttons on the page by calling the function "callButtons"
		callButtons();


		//This is where you add new sports
		$("#add-sport").on("click", function(event){
			event.preventDefault();
			var sport = $("#sport-input").val().trim();
			sports.push(sport);
			$("#sport-input").val(""); //clears the value added to the array in the input field
			callButtons();
		});

		// This displays the actual Gifs on the page
		function showGif(){
			$(document).on("click", ".sport", displayGifButtons);
			// $("#stillGifOnPage").empty();
			// $("#movingGifOnPage").empty();
		}
		showGif();

	}
	itsGoTime();
})

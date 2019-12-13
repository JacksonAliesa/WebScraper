//on-click function for when the user clicks the scrape button
//this btns triggeres the websote to be scraped so that the articles can display for user to view
$("#scrapeBtn").on("click", function (event) {
  event.preventDefault();
  console.log("button was clicked")
  $.ajax({
    type: "GET",
    url: "/scrape"
  }).then(function(data) {
    console.log(data)
    location.reload();
  })
  
  
});

//on click function to save user's article to the saved page
// $("saveBtn")


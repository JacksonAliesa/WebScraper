//on-click function for when the user clicks the scrape button
//this btns triggeres the websote to be scraped so that the articles can display for user to view
$("#scrapeBtn").on("click", function (event) {
  event.preventDefault();
  console.log("button was clicked")
  $.ajax({
    type: "GET",
    url: "/scrape"
  }).then(function (data) {
    console.log(data)
    location.reload();
  })
});

//clear button to empty articles
$("#clearBtn").on("click", function (event) {
  event.preventDefault();
  console.log("Clear all button clicked.")
  $.ajax("/clear", {
    type: "DELETE"
  }).then(function () {
    location.reload();
  })
});

//save button that captures user's ID to store on their saved articles list
$(".saveBtn").on("click", function (event) {
  event.preventDefault();
  console.log("save button")
  var _id = $(this).attr("data-id")
  $.ajax( "/saved/" + _id, {
    type: "PUT",
    data: { saved: true }
      }).then (function() {
       
        location.reload();
      })
    });



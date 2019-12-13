//on-click function for when the user clicks the scrape button
//this btns triggeres the websote to be scraped so that the articles can display for user to view


$("#scrapeBtn").on("click", function() {
    console.log("button was clicked")
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/scrape",
        data: {
          title: $("#title").val(),
          link: $("#link").val(),
          
        }
      })
  
    .then(function(data) {
        // Log the response
        console.log(data);
        
        location.reload();
      });
      console.log("Scrape done")
  });


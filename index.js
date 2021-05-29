var corsProxy = "https://cors-anywhere.herokuapp.com/",
  url = corsProxy + "https://api.notion.com/v1/databases/",
  authorizationToken = "Bearer process.env.TOKEN_ID",
  databaseId = "DATABASE_ID";

$(document).ready(function() {
  $("button").click(function() {
    $.ajax({
      type: "POST",
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", authorizationToken);
      },
      url: url + databaseId + "/query",
      success: function(result) {
        var results = result.results;
        var videos = results.map(function(page) {
          return {
            id: page.id,
            title: page.properties.Name.title[0] ? 
            page.properties.Name.title[0].text.content : "Untitled",
            description: page.properties.Description.rich_text[0].text.content
          }
        })

        console.log(videos)
      }
    });
  });
});

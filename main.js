


var getData = function(keywords, callback) {
    var params = {
      api_key: "niqoyrl7dver15xzb6mp2c7e",
      includes: "Images,Shop"
    };

    if (!callback && typeof keywords === "function") {
      callback = keywords;
      keywords = null;
    }

    if (keywords && keywords.length) {
      params.keywords = keywords;
    }

    $.ajax("https://openapi.etsy.com/v2/listings/active.js", {
      data: params,
      dataType: "jsonp",
      success: callback
    });

  };

//function to truncate string and concatenate ...
var truncateString = function truncate(string){
   
   if (string.length > 29)
      return string.substring(0,29)+'...';
   else
  return string
};

//function to update the status at top of page with kw and using items.length for # of items
var updateStatus = function(items, keyword) {
    var statusText = '"' + keyword + '" ' + ' We found ' + items.length + ' items!';
    return $(".right-msg").text(statusText);

}
//build string of template for products
var etsyProductTemplate = _.template(
  "<div class='product'><div class='img-wrap'>" +
  "<a href='<%= url %>'><img src='<%= Images[0].url_570xN %>'></a></div>" +
  "<div class='prod-title'><%= truncateString(title) %></div>" + 
  "<div class='seller'><%= Shop.shop_name %></div>" + 
  "<div class='price'>$<%= price %> USD</div></div>"
);
//main search function
//grabs kw, passes into getData function to retrieve data
var search = function(keyword) {
  getData(keyword, function(data){
      
    var items = data.results;
    //assigns right-col div to productsDiv variable
    var productsDiv = $(".right-col");
    //empties whatever is in that div
    productsDiv.empty();
    //updates status - passing kw and items
    updateStatus(items, keyword);
    //for each item
    items.forEach(function(item){
      //append into productsDiv the template
      productsDiv.append(etsyProductTemplate(item));    
    
    });

  });
}


$(function(){
  //event listener on button
  $(".search-form").on("click", ".submit", function(event){
    //prevent form from submitting when clicked
    event.preventDefault();
    //get keywords user has entered into field
    var keywords = $(".search-field").val();
    //call search function
    search(keywords);

  });

  //call search function with "whiskey" - default, when page first loads
  search("whiskey");
});

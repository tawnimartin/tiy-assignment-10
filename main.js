


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


var truncateString = function truncate(string){
   
   if (string.length > 29)
      return string.substring(0,29)+'...';
   else
  return string
};


var updateStatus = function(items, keyword) {
    var statusText = '"' + keyword + '" ' + ' We found ' + items.length + ' items!';
    return $(".right-msg").text(statusText);

}

var etsyProductTemplate = _.template(
  "<div class='product'><div class='img-wrap'>" +
  "<a href='<%= url %>'><img src='<%= Images[0].url_570xN %>'></a></div>" +
  "<div class='prod-title'><%= truncateString(title) %></div>" + 
  "<div class='seller'><%= Shop.shop_name %></div>" + 
  "<div class='price'>$<%= price %> USD</div></div>"
);

var search = function(keyword) {
  getData(keyword, function(data){
      
    var items = data.results;

    console.log(items);

    var productsDiv = $(".right-col");

    productsDiv.empty();

    updateStatus(items, keyword);

    items.forEach(function(item){

    productsDiv.append(etsyProductTemplate(item));    
    
    });

  });
}


$(function(){

  $(".search-form").on("click", ".submit", function(event){
    
    event.preventDefault();
    var keywords = $(".search-field").val();

    search(keywords);

  });

  
  search("whiskey");
});

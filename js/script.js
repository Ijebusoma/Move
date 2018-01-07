
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var street = $('#street').val(); 
    var city = $('#city').val();
    var address = street + ", " + city;
   $greeting.text("So, you want to live at " + address + "?");
   var streetviewUrl = encodeURI('https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + ' ');
 $body.append('<img class="bgimg" src="'+streetviewUrl+'">');

   // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

//Load NYTimes data

var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "7cc821deaac044a7b70309bff886",
  'sort':"newest",
  'q':city
});


$.getJSON(url, function (data)
{
$nytHeaderElem.text("New York Times Articles about"  +  city);
articles = data.response.docs;
for(i=0;i<articles.length;i++)
{
var article = articles[i];
$nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
'<p>'+article.snippet+'</p>'+'</li>');
};

}).error(function (e)
{
alert("there was a problem fetching articles");
});




/**
$.ajax({
   url: url,
   data: {
      format: 'json'
   },
   success:function(data)
   {
   $nytHeaderElem.text("New York Times Articles about "  +  city);
articles = data.response.docs;
for(i=0;i<articles.length;i++)
{
var article = articles[i];
$nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
'<p>'+article.snippet+'</p>'+'</li>');
};
   },
   error: function() {
      $nytHeaderElem.text("Could not fetch articles from New York Times, check your connection");
   }
});
return false;

/**
 $.getJSON(url, function (data)
{
$nytHeaderElem.text("New York Times Articles about" + city);
articles = data.response.docs;
alert("get json function");



});

**/
return false;
}

$('#form-container').submit(loadData)



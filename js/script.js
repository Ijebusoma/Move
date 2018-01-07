
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
  'api-key': "7cc821deaac044a7b70309bff886336e",
  'sort':"newest",
  'q':city
});
var wikiUrl="http://en.wikipedia.org/w/api.php?action=opensearch&search="+city+
             "&format=json&callback=wikiCallback";

var wikiRequestTimeout = setTimeout(function()
{
$wikiElem.text("failed to get Wiki resources");
}, 8000);


$.getJSON(url, function (data)
{
$nytHeaderElem.text("New York Times Articles about "  +  city);
articles = data.response.docs;
for(i=0;i<articles.length;i++)
{
var article = articles[i];
$nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
'<p>'+article.snippet+'</p>'+'</li>');
};

}).error(function (e)
{
$nytElem.text("Could not load articles")
});


$.ajax({
  url:wikiUrl,
  dataType:"jsonp",
  success:(function(response)
  {
  var articleList = response[1];
  for(var i=0;i<articleList.length;i++)
  {
  articleStr = articleList[i];
  var url = "http://en.wikipedia.org/wiki/" +articleStr;
  $wikiElem.append('<li><a href="'+url+'">'+articleStr+'</li></a>');
  clearTimeout(wikiRequestTimeout);
  };

  })
});

return false;
}

$('#form-container').submit(loadData)



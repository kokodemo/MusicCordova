document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    (function($){
  $(function(){
    $('.sidenav').sidenav();
    $('.tabs').tabs({ "swipeable": true });
  });
})(jQuery);

$("#searchBand").click(function() {
  artist = $('#search').val();
  $.ajax({
    method: "GET",
    url: "https://musicbrainz.org/ws/2/artist?query="+artist,
    dataType: "json",
  }).done(function(message){
    callApi(message);
  }).fail(function(){
    alert("Error");
  });
});

function callApi(result) {
  $('.collection:first-of-type').empty();
  var music = result["artists"];
  for (let index = 0; index < music.length; index++) {
    const element = music[index];
    $('.collection:first-of-type').append('<li id="'+element["id"]+'" class="collection-item">'+element["name"]+'<a href="#!" class="secondary-content"><i class="material-icons">format_list_numbered</i></a></li>');
  }

  $('.secondary-content').click(function() {
    datos = $(this).parent();
    texto = datos.clone().children().remove().end().text();
    var tabs = document.getElementById("tabs");
    var instancia = M.Tabs.getInstance(tabs);
    instancia.select("test-swipe-2");
    $.ajax({
      method: "GET",
      url: "https://musicbrainz.org/ws/2/artist/"+datos.attr("id"),
      dataType: "json",
    }).done(function(message){
        details(message);
    }).fail(function(){
        alert("Error");
    });
  });

  function details(request) {
     console.log(request);
    $('#musiclist').empty();

    $('<li class="listamusica" style="border: 2px solid white;border-radius: 5px;width: 100%;border-collapse: collapse;">Name: '+request["name"]+'</li>').appendTo('#musiclist', '#nombre');
    $('<li class="listamusica" style="border: 2px solid white;border-radius: 5px;width: 100%;border-collapse: collapse;">Type: '+request["type"]+'</li>').appendTo('#musiclist', '#tipo');
    $('<li class="listamusica" style="border: 2px solid white;border-radius: 5px;width: 100%;border-collapse: collapse;">Country: '+request["area"]["name"]+"/"+request["country"]+'</li>').appendTo('#musiclist', '#pais');
    $('<li class="listamusica" style="border: 2px solid white;border-radius: 5px;width: 100%;border-collapse: collapse;">Country: '+request["life-span"]["begin"]+'</li>').appendTo('#musiclist', '#nacido');
    

  }
}
}
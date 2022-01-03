(function (doc) {
    
    doc.write("/../news_repo/cards.html");
    //var script = doc.createElement('script');
    //script.src = "/../news_repo/cards.html";
    //doc.body.appendChild(script);
    
    //$(doc).ready(function() {
    //    $('#myframe').attr('src', 'https://juhi2021.github.io/cards_medium.html');
    //});
    
    jQuery.get('https://juhi2021.github.io/cards_medium.html', function(data) {
        doc.write(data);
        //document.getElementById('msgDiv').innerHTML = data;
    });
    
}(this.document));

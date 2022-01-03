(function (doc) {
    
    document.write("Hello World!");
    var script = doc.createElement('script');
    script.src = "../news_repo/cards.html";
    doc.body.appendChild(script);
    
}(this.document));

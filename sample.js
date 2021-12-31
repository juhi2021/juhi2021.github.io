(function (doc) {
    
    document.write("Hello World!");
    var script = doc.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/juhi2021/juhi2021.github.io/sample1.js";
    doc.body.appendChild(script);
    
}(this.document));

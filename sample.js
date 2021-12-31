/* eslint no-alert: 0, no-console: 0 */

/*

For details, see http://www.bloggerspice.com/
*/

(function (doc) {
    var message = 'Make the message small';

    if (typeof console !== 'undefined') {
        console.error(message);
    }

    if (!doc) {
        return void alert(message);
    }
    
    //var container = document.getElementById("retainable-rss-embed");
    //if (container) {
        //var css = document.createElement('link');
        //css.href = "https://www.twilik.com/assets/retainable/rss-embed/retainable.css";
        //css.rel = "stylesheet"
        //document.getElementsByTagName('head')[0].appendChild(css);
        //var script = document.createElement('script');
        //script.src = "https://www.twilik.com/assets/retainable/rss-embed/retainable.js";
        //document.getElementsByTagName('body')[0].appendChild(script);
    //}

    var div   = doc.createElement('div');
    var style = div.style;
    
    div.innerHTML = message;

    style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    style.border = '5px solid #333';
    style.borderLeft = 'none';
    style.borderRight = 'none';
    style.color = '#fff';
    style.font = 'bold 26px/1.4 Helvetica, sans-serif';
    style.left = '0';
    style.padding = '1em';
    style.position = 'fixed';
    style.right = '0';
    style.top = '30%';
    style.zIndex = '9999';

    setTimeout(function () {
        doc.body.appendChild(div);
    }, 500);
    
    var script = document.createElement('script');
    script.src = "https://www.twilik.com/assets/retainable/rss-embed/retainable.js";
    document.getElementsByTagName('div')[0].appendChild(script);
    
}(this.document));

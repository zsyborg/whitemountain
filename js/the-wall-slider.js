// the Wall slider
window.addEvent("domready", function() {
    var imagewall = [
        ["the-wall/1.jpg", [
            ["the-wall/1.jpg", "Commercial / Stock"]
        ]],
        ["the-wall/2.jpg", [
            ["the-wall/2.jpg", "Beauty / Fashion"]
        ]],
        ["the-wall/3.jpg", [
            ["the-wall/3.jpg", "Life / Stories"]
        ]],
        ["the-wall/4.jpg", [
            ["the-wall/4.jpg", "People / Portraits"]
        ]],
        ["the-wall/5.jpg", [
            ["the-wall/5.jpg", "Editorials / Magazines"]
        ]],
        ["the-wall/6.jpg", [
            ["the-wall/6.jpg", "Commercial / Stock"]
        ]],
        ["the-wall/7.jpg", [
            ["the-wall/7.jpg", "Beauty / Fashion"]
        ]],
        ["the-wall/8.jpg", [
            ["the-wall/8.jpg", "Life / Stories"]
        ]],
        ["the-wall/9.jpg", [
            ["the-wall/9.jpg", "People / Portraits"]
        ]],
        ["the-wall/10.jpg", [
            ["the-wall/10.jpg", "Editorials / Magazines"]
        ]],
        ["the-wall/11.jpg", [
            ["the-wall/11.jpg", "Commercial / Stock"]
        ]],
        ["the-wall/12.jpg", [
            ["the-wall/12.jpg", "Beauty / Fashion"]
        ]],
        ["the-wall/13.jpg", [
            ["the-wall/1.jpg", "Life / Stories"],
            ["the-wall/2.jpg", "Item Name 2<br \/>\r\nLife / Stories"],
            ["the-wall/3.jpg", "Item Name 3<br \/>\r\nLife / Stories"]
        ]],
        ["the-wall/14.jpg", [
            ["the-wall/14.jpg", "People / Portraits"]
        ]],
        ["the-wall/15.jpg", [
            ["the-wall/15.jpg", "Editorials / Magazines"]
        ]],
        ["the-wall/16.jpg", [
            ["the-wall/16.jpg", "Commercial / Stock"]
        ]],
        ["the-wall/17.jpg", [
            ["the-wall/17.jpg", "Beauty / Fashion"]
        ]],
        ["the-wall/18.jpg", [
            ["the-wall/18.jpg", "Life / Stories"]
        ]],
        ["the-wall/19.jpg", [
            ["the-wall/19.jpg", "People / Portraits"]
        ]],
        ["the-wall/20.jpg", [
            ["the-wall/20.jpg", "Editorials / Magazines"]
        ]],
        ["the-wall/21.jpg", [
            ["the-wall/21.jpg", "Commercial / Stock"]
        ]],
        ["the-wall/22.jpg", [
            ["the-wall/22.jpg", "Beauty / Fashion"]
        ]],
        ["the-wall/23.jpg", [
            ["the-wall/23.jpg", "Life / Stories"]
        ]],
        ["the-wall/24.jpg", [
            ["the-wall/24.jpg", "People / Portraits"]
        ]],
        ["the-wall/25.jpg", [
            ["the-wall/25.jpg", "Editorials / Magazines"]
        ]],
        ["the-wall/plus-1.jpg", [
            ["the-wall/plus-1.jpg", "Beauty / Fashion"] // an extra image to compensate for the gap
        ]]
    ];
    var maxLength = 25;
    var wallFluid = new Wall("wall", {
        "draggable": true,
        "slideshow": true, // options: true, false
        "speed": 1000,
        "showDuration": 4000,
        "transition": Fx.Transitions.Quad.easeOut,
        "inertia": true,
        "autoposition": true,
        "width": 420,
        "height": 280,
        "rangex": [-100, 100],
        "rangey": [-100, 100],
        callOnUpdate: function(items) {
            var root = Math.ceil(Math.sqrt(maxLength));
            document.id("wall").setStyle("margin-left", 0);
            var i = 0;
            (function() {
                try {
                    var position = ((Math.abs(items[i].y) % root) * root) + (Math.abs(items[i].x) % root);
                    if (position > maxLength) {
                        position = Math.floor(Math.random() * maxLength);
                    }
                    var file = imagewall[position][0];
                    var img = new Element("img[src=" + file + "]");
                    img.inject(items[i].node).fade("hide").fade("in");
                    var list = new Element("ul");
                    list.setProperty("class", "slideshow")
                    for (var j = 0; j < imagewall[position][1].length; j++) {
                        var slide = new Element("li");
                        new Element("img", {
                            src: imagewall[position][1][j][0]
                        }).inject(slide);
                        var desc = new Element("span", {
                            html: imagewall[position][1][j][1]
                        });
                        var div = new Element("div");
                        div.setProperty("class", "wall-item-description");
                        desc.inject(div);
                        div.inject(slide);
                        slide.inject(list);
                    }
                    list.inject(items[i].node);
                    var stop = false;
                    var firstSlide = true;
                    items[i].node.addEvents({
                        mouseenter: function(event) {
                            list.getChildren("li").setStyles({
                                "visibility": "hidden",
                                "opacity": 0
                            });
                            stop = false;
                            if (imagewall[position][1].length) {
                                (function(item) {
                                    item.fade("in");
                                    if (firstSlide) {
                                        delay = 1000;
                                        firstSlide = false;
                                    } else {
                                        delay = 2000;
                                    }
                                    if (item.getNext("li") != null) {
                                        var tmpslide = arguments.callee;
                                        (function() {
                                            item.fade("out");
                                            if (!stop) tmpslide(item.getNext("li"));
                                        }).delay(delay);
                                    } else if (item.getSiblings("li").length > 0) {
                                        var tmpslide = arguments.callee;
                                        (function() {
                                            item.fade("out");
                                            if (!stop) tmpslide(item.getSiblings("li").pop());
                                        }).delay(delay);
                                    }
                                })(new Element(list.getFirst("li")));
                                img.fade("out");
                            }
                            return false;
                        },
                        mouseleave: function() {
                            stop = true;
                            firstSlide = true;
                            if (imagewall[position][1].length) {
                                list.getChildren("li").fade("out");
                                img.fade("in");
                            }
                        }
                    });
                    i++;
                    if (i < items.length) {
                        var tmp = arguments.callee;
                        (function() {
                            tmp();
                        }).delay(10);
                    } else {}
                } catch (e) {}
            })();
        }
    });
    window.setTimeout(function() {
        wallFluid.initWall();
    }, 500);
});
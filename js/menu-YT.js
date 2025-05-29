$(function() {
    "use strict";
	
	
    // menu YT
    $("#menu li a, #menu-mobile li a").on("click", function(e) {
        e.preventDefault();
        animateSlider(this.hash);
    });
    function animateSlider(hash) {
        if (!$("#containerOT div.open").length) {
            if (hash == "#news-video") {
                openPopup(hash);
            }
            if (hash == "#about-video") {
                openPopup(hash);
            }
            if (hash == "#services-video") {
                openPopup(hash);
            }
            if (hash == "#works-video") {
                openPopup(hash);
            }
        } else {
            if (hash == "#home-video") {
                openAndClose(hash)
            }
            if (hash == "#news-video") {
                openAndClose(hash)
            }
            if (hash == "#about-video") {
                openAndClose(hash)
            }
            if (hash == "#services-video") {
                openAndClose(hash)
            }
            if (hash == "#works-video") {
                openAndClose(hash)
            }
        }
    }
    function openPopup(hash) {
        $(hash + "-lifting-video").slideToggle().addClass("open");
    }
    function openAndClose(hash) {
        if ($(hash + "-lifting-video").hasClass("open")) {
            $($(hash + "-lifting-video")).slideToggle().removeClass();
        } else {
            $("#containerOT div.open").slideToggle().removeClass();
            $(hash + "-lifting-video").slideToggle().addClass("open");
        }
    }


});
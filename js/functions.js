
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
    // setup garden
	$loveHeart = $("#loveHeart");
	var offsetX = $loveHeart.width() / 2;
	var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
	
	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
			showMessages();
		} else {
			angle += 0.2;
		}
	}, interval);
}

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

const startDate = new Date("2022-06-09T00:00:00"); // Your real relationship start time

function timeElapse(date) {
    const now = new Date();

    // Get total difference in milliseconds
    let diff = now - date;

    // Copy start date to not modify original
    let tempDate = new Date(date.getTime());

    let years = 0;
    while (true) {
        let nextYear = new Date(tempDate);
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        if (nextYear <= now) {
            years++;
            tempDate = nextYear;
        } else {
            break;
        }
    }

    let days = Math.floor((now - tempDate) / (1000 * 60 * 60 * 24));
    tempDate.setDate(tempDate.getDate() + days);
    if (days == 365){
	    days = 0;
	    years = years +1;
    }

    let hours = now.getHours() - tempDate.getHours();
    if (hours ==24) {
	    hours = 0;
	    days = days +1;
    }

    let minutes = now.getMinutes() - tempDate.getMinutes();
    if (minutes ==60) {
        minutes = 0;
        horsurs = hours + 1;
    }

    let seconds = now.getSeconds() - tempDate.getSeconds();
    if (seconds >60) {
        seconds = 0;
        minutes = minutes + 1;
    }

    // Pad values
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    const result = 
        "<span class=\"digit\">" + years + "</span> years " +
        "<span class=\"digit\">" + days + "</span> days " +
        "<span class=\"digit\">" + hours + "</span> hours " +
        "<span class=\"digit\">" + minutes + "</span> minutes " +
        "<span class=\"digit\">" + seconds + "</span> seconds";

    document.getElementById("elapseClock").innerHTML = result;
}

setInterval(() => timeElapse(startDate), 1000);



function showMessages() {
	adjustWordsPosition();
	$('#messages').fadeIn(5000, function() {
		showLoveU();
	});
}

function adjustWordsPosition() {
	$('#words').css("position", "absolute");
	$('#words').css("top", $("#garden").position().top + 195);
	$('#words').css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
	$('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showLoveU() {
	$('#loveu').fadeIn(3000);
}

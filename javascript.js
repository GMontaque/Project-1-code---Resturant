/********************** NavBar minimise on scroll ************************************/

$(window).scroll(function () {
	let scrollTop = $(window).scrollTop();

	if (scrollTop >= 50) {
		$("#collapsibleNavbar").removeClass("show");
	}
});

/********************** close NavBar when nav link clicked************************************/
$(".navbar-collapse a").click(function () {
	$(".navbar-collapse").collapse("hide");
});

/**********************typewriter effect************************************/
class TxtType {
	constructor(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = "";
		this.tick();
		this.isDeleting = false;
	}
	tick() {
		let i = this.loopNum % this.toRotate.length;
		let fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

		let that = this;
		let delta = 200 - Math.random() * 100;

		if (this.isDeleting) {
			delta /= 2;
		}

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === "") {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(function () {
			that.tick();
		}, delta);
	}
}

window.onload = function () {
	let elements = document.getElementsByClassName("typewrite");
	for (let i = 0; i < elements.length; i++) {
		let toRotate = elements[i].getAttribute("data-type");
		let period = elements[i].getAttribute("data-period");
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
};

/**********************Scroll Animation ************************************/
$(document).ready(function () {
	let $animation_elements = $(".anim");
	let $window = $(window);

	function check_if_in_view() {
		let window_height = $window.height();
		let window_top_position = $window.scrollTop();
		let window_bottom_position = window_top_position + window_height;

		$.each($animation_elements, function () {
			let $element = $(this);
			let element_height = $element.outerHeight();
			let element_top_position = $element.offset().top;
			let element_bottom_position = element_top_position + element_height;

			//check to see if this current container is within viewport
			if (
				element_bottom_position >= window_top_position &&
				element_top_position <= window_bottom_position
			) {
				$element.addClass("animated");
			} else {
				$element.removeClass("animated");
			}
		});
	}

	$window.on("scroll resize", check_if_in_view);
	$window.trigger("scroll");
});

/**********************reset submitted form************************************/

function resetForms() {
	let emailFrom = document.getElementById("emailForm");
	if (emailFrom.checkValidity()) {
		setTimeout(function () {
			document.getElementById("userEmail").value = "";
			document.getElementById("subjectBar").value = "";
			document.getElementById("emailBody").value = "";
			document.getElementById("sumbit").disabled = false;
		}, 1000);
	} else {
		return;
	}
}

/**********************email form validation ************************************/

function manage(emailForm) {
	let email = document.getElementById("userEmail");
	let subject = document.getElementById("subjectBar");
	let body = document.getElementById("emailBody");
	var bt = document.getElementById("submit");
	if (email.value && subject.value && body.value != "") {
		bt.disabled = false;
	} else {
		bt.disabled = true;
	}
}

function emailAddress() {
	var input = document.getElementById("userEmail");
	input.oninvalid = function (event) {
		event.target.setCustomValidity(
			"Email address should be entered in the following format: email@tester.com"
		);
	};
}
emailAddress();

/**********************hide bottom footer text and correct colour on mobile ************************************/

$(window).scroll(function () {
	let scrollBottom = $(window).scrollTop() + $(window).height();

	if (scrollBottom >= 500) {
		$("#Github").removeClass("show");
		$("#email").removeClass("show");
		$("#phoneNumber").removeClass("show");
		document.getElementById("phoneLink").style.color = "white";
		document.getElementById("emailLink").style.color = "white";
		document.getElementById("githubLink").style.color = "white";
	}
});

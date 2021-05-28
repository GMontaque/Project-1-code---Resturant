// ******************************* making reservation *******************************

let objects = {};
let form = document.getElementById("form");
form.onsubmit = function (e) {
	let name = document.getElementById("name").value;
	let email = document.getElementById("email").value;
	let partySize = document.getElementById("partySize").value;
	let date = document.getElementById("date").value;
	let time = document.getElementById("time").value;
	let location = document.getElementById("location").value;
	let contactNumber = document.getElementById("contactNumber").value;
	let text = document.getElementById("my-textarea").value;

	let result = Math.random().toString().slice(2, 11);
	objects = {
		result: {
			name: name,
			email: email,
			partySize: partySize,
			date: date,
			time: time,
			location: location,
			contactNumber: contactNumber,
			text: text,
			reservation: result,
		},
	};
	console.log(JSON.stringify(objects));
	e.preventDefault();
};

// party size feild
$(function () {
	var $select = $("#partySize");
	for (i = 0; i <= 20; i++) {
		$select.append($("<option></option>").val(i).html(i));
	}
});

// ******************************* checking reservation *******************************
let refValue = document.querySelector(".todo-input");
let modal = document.querySelector(".todo-button");
modal.addEventListener("click", popUp);

function popUp() {
	Swal.fire(`${refValue.value}`);
	refValue.value = "";
}

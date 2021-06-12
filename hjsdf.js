// @media (max-width: 768px) {
// 	.formStyle {
// 		width: 80%;
// 		height: 84vh;
// 	}
// }

// @media (max-width: 426px) {
// 	.formStyle {
// 		width: 100%;
// 	}
// }

// @media (max-width: 768px) {
// 	.reservationTitle {
// 		margin-top: -1rem;
// 	}

// 	.reservationBackground {
// 		margin: 0rem;
// 	}

// 	.reservationTitle {
// 		font-size: 1.5rem;
// 	}

// 	#resSubmit {
// 		margin-top: 1.5rem !important;
// 		margin-bottom: 1rem;
// 		font-size: 1rem !important;
// 	}
// }

// ******************************* making reservation *******************************

let submitBtn = document.querySelector("#resSubmit");
submitBtn.addEventListener("click", confirmRev);

// let objects = {};

// function testingblack() {
// 	let name = document.getElementById("name").value;
// 	let email = document.getElementById("email").value;
// 	let partySize = document.getElementById("partySize").value;
// 	let date = document.getElementById("date").value;
// 	let time = document.getElementById("time").value;
// 	let location = document.getElementById("location").value;
// 	let contactNumber = document.getElementById("contactNumber").value;
// 	let text = document.getElementById("my-textarea").value;
// 	let result = Math.random().toString().slice(2, 11);

// 	objects = {
// 		result: {
// 			name: name,
// 			email: email,
// 			partySize: partySize,
// 			date: date,
// 			time: time,
// 			location: location,
// 			contactNumber: contactNumber,
// 			text: text,
// 			reservation: result,
// 		},
// 	};
// }

// function confirmationPopup() {
// 	Swal.fire({
// 		icon: "success",
// 		title: `Reservation Number: `,
// 		html: `Booking Name: ${name} <br> Group Size: ${partySize} <br>
//   Booking Date: ${date} <br> <input type="text" name="" id="inputText" placeholder="teser">`,
// 		showCancelButton: true,
// 		confirmButtonText: "Close",
// 		cancelButtonText: `<a
// 		style="color: white;"
// 		href="#collapseOne"
// 		>Make a Change</a
// 	>`,
// 		cancelButtonColor: "red",
// 		// backdrop: "lightgrey",
// 		// background: "grey",
// 	});
// }

// let objects = {};
// let form = document.getElementById("form");
// form.onsubmit = function (e) {
// 	let name = document.getElementById("name").value;
// 	let email = document.getElementById("email").value;
// 	let partySize = document.getElementById("partySize").value;
// 	let date = document.getElementById("date").value;
// 	let time = document.getElementById("time").value;
// 	let location = document.getElementById("location").value;
// 	let contactNumber = document.getElementById("contactNumber").value;
// 	let text = document.getElementById("my-textarea").value;

// 	let result = Math.random().toString().slice(2, 11);

// 	objects = {
// 		result: {
// 			name: name,
// 			email: email,
// 			partySize: partySize,
// 			date: date,
// 			time: time,
// 			location: location,
// 			contactNumber: contactNumber,
// 			text: text,
// 			reservation: result,
// 		},
// 	};
// 	console.log(JSON.stringify(objects));
// 	e.preventDefault();
// };

function confirmRev() {
	let name = document.getElementById("name").value;
	let email = document.getElementById("email").value;
	let party = document.getElementById("partySize").value;
	let date = document.getElementById("date").value;
	let time = document.getElementById("time").value;
	let location = document.getElementById("location").value;
	// let contactNumber = document.getElementById("contactNumber").value;
	// let text = document.getElementById("my-textarea").value;
	// let name = `${refValue.value}`;
	// let email = "test@test.com";
	// let party = 5;
	// let date = "23/07/2021";
	// let time = "13:20";
	// let location = "london";
	// let phoneNumber = "01733 3585417";
	// let textBox =
	// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, alias?";
	// let reservation = Math.floor(Math.random() * (1000 - 100) + 100);
	Swal.fire({
		icon: "success",
		title: `We are pleased to confim your reservation has been submitted.
		<br/>Reservation Number: ${reservation}`,
		html: `Summary Reservation Information:
		<br/>
		Booking Name: ${name} 
		<br/>
		Group Size: ${party} 
		<br/>
		Confirmation Email Address: ${email}
		<br/>
		Booking date and time: ${time} on ${date}
		<br/>
		Location: ${location}`,
		showCancelButton: true,
		confirmButtonText: "Close",
		cancelButtonText: `<a 
		style="color: white;"
		href="#collapseOne"
		>Make a Change</a
	>`,
		cancelButtonColor: "red",
	});
}

// party size feild
$(function () {
	var $select = $("#partySize");
	for (i = 0; i <= 20; i++) {
		$select.append($("<option></option>").val(i).html(i));
	}
});

// ******************************* checking reservation *******************************

const todoList = document.querySelector(".todo-list");

let refValue = document.querySelector(".resCheck-input");
let modal = document.querySelector(".resCheck-button");
modal.addEventListener("click", addTodo);

function addTodo(event) {
	// prevent form from submitting
	event.preventDefault();
	// Todo Div
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	// create Li
	const newTodo = document.createElement("li");
	newTodo.innerText = refValue.value;
	todoDiv.appendChild(newTodo);
	console.log(newTodo);
	// check mark button
	const completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
	// check trash button
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);

	// append to list
	todoList.appendChild(todoDiv);
	refValue.value = "";
	console.log(todoDiv);
}

// reservation change popup

let completebtn = document.querySelector(".complete-btn");

completebtn.addEventListener("click", popUp);

function popUp() {
	let name = `${refValue.value}`;
	let party = 5;
	let date = "23/07/2021";
	let reservation = Math.floor(Math.random() * (1000 - 100) + 100);
	Swal.fire({
		icon: "success",
		title: `Reservation Number: ${reservation}`,
		html: `Booking Name: ${name} <br> Group Size: ${party} <br>
  Booking Date: ${date} <br> <input type="text" value="haribo" name="" id="inputText" placeholder="teser">`,
		showCancelButton: true,
		confirmButtonText: "Close",
		cancelButtonText: `<a
		style="color: white;"
		href="#collapseOne"
		>Make a Change</a
	>`,
		cancelButtonColor: "red",
		// backdrop: "lightgrey",
		// background: "grey",
	}).then((result) => {
		if (!result.isConfirmed) {
			Swal.fire({
				icon: "info",
				title: "Rservation Alteration",
				html: `
				<label for="name">Name</label>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Name"
					class="form-control"
				/>

				<label for="">Email Address</label>
				<input
					type="email"
					class="form-control"
					name="email"
					id="email"
					aria-describedby="emailHelpId"
					placeholder="example@hotmail.co.uk"
				/>

				<label for="partySize">Party Size</label>
				<select
					name=""
					class="form-control"
					id="partySize"
				></select>

				<label for="date">Date</label>
				<input
					type="date"
					name="date"
					id="date"
					class="form-control"
				/>

				<label for="time">Time</label>
				<input
					type="time"
					name="time"
					id="time"
					class="form-control"
				/>

				<label for="location">location</label>
				<select
					name="location"
					class="location form-control"
					id="location"
				>
					<option value="">See Below</option>
					<option value="london">London</option>
					<option value="stamford">Stamford</option>
					<option value="glasgow">Glasgow</option>
					<option value="rome">Rome</option>
					<option value="oslo">Oslo</option>
				</select>

				<label for="contactNumber">Contact Number</label>
				<input
					type="tel"
					name="contactNumber"
					id="contactNumber"
					placeholder="020 5701 7892"
					class="form-control"
				/>

				<label for="my-textarea">Text</label>
				<textarea
					id="my-textarea"
					class="form-control"
					name="textarea"
					rows="3"
					class="form-control"
				></textarea>`,
			});
		}
	});
}

// ******************************* making a reservation *******************************

// submit button

let submitBtn = document.querySelector("#resSubmit");
submitBtn.addEventListener("click", reservationResult);

// look to have all inputs in one function and have them passed to the modal popup

// reservation fields

function reservationResult() {
	let glass = {
		name: document.getElementById("name").value,
		email: document.getElementById("email").value,
		party: document.getElementById("partySize").value,
		date: document.getElementById("date").value,
		time: document.getElementById("time").value,
		location: document.getElementById("location").value,
		// let contactNumber = document.getElementById("contactNumber").value;
		text: document.getElementById("my-textarea").value,
		reservation: Math.floor(Math.random() * 1000000000),
	};

	confirmRev(glass);
	saveLocalTodos(glass);
}

// confirmaiton reservation popup

function confirmRev(glass) {
	Swal.fire({
		icon: "success",
		title: `We are pleased to confim your reservation has been submitted.
		<br/>Reservation Number: ${glass.reservation}`,
		html: `Summary Reservation Information:
		<br/>
		Booking Name: ${glass.name} 
		<br/>
		Group Size: ${glass.party} 
		<br/>
		Confirmation Email Address: ${glass.email}
		<br/>
		Booking date and time: ${glass.time} on ${glass.date}
		<br/>
		Location: ${glass.location}
		<br/>
		Notes: ${glass.text}`,

		showCancelButton: true,
		confirmButtonText: "Close",
		cancelButtonText: `<a 
		style="color: white;"
		href="#collapseOne"
		>Make a Change</a
	>`,
		cancelButtonColor: "red",
	}).then((result) => {
		if (!result.isConfirmed) {
			let removed = document.getElementById("collapseOne");
			removed.classList.remove("show");

			let added = document.getElementById("collapseTwo");
			added.classList.add("show");
		}
	});

	setTimeout(reset, 10000);
}

// reset form after reservation completed

function reset() {
	names = document.getElementById("name").value = "";
	email = document.getElementById("email").value = "";
	party = document.getElementById("partySize").value = "";
	date = document.getElementById("date").value = "";
	time = document.getElementById("time").value = "";
	location = document.getElementById("location").value = "";
	// glass.contactNumber = document.getElementById("contactNumber").value= "";
	text = document.getElementById("my-textarea").value = "";
}

// party size feild
$(function () {
	var $select = $("#partySize");
	for (i = 0; i <= 20; i++) {
		$select.append($("<option></option>").val(i).html(i));
	}
});

// save reservation to localstorage

function saveLocalTodos(glass) {
	localStorage.setItem("reservation", JSON.stringify(glass));
}

// ******************************* checking reservation *******************************

// html element which will comtain reservation on webpage

const todoList = document.querySelector(".todo-list");

// reservation check input
let refValue = document.querySelector(".resCheck-input");

// reservation check button
let modal = document.querySelector(".resCheck-button");
modal.addEventListener("click", checkingRes);

// reservation check function

function checkingRes(event) {
	let localStore;
	// prevent form from submitting
	event.preventDefault();
	// Todo Div
	let todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	// create Li
	let newTodo = document.createElement("li");
	localStore = JSON.parse(localStorage.getItem("reservation"));
	newTodo.innerText = localStore;
	todoDiv.appendChild(newTodo);
	console.log(localStore);
	// check mark button
	let completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
	// check trash button
	let trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);

	// append to list
	todoList.appendChild(todoDiv);
	refValue.value = "";
	console.log(todoDiv);

	// change pop up
	let completebtn = document.querySelector(".complete-btn");
	completebtn.addEventListener("click", popUp);
}

// shows full details of reservation and make changes
function popUp() {
	let name = `${refValue.value}`;
	let email = "test@test.com";
	let party = 5;
	let date = "23/07/2021";
	let time = "13:20";
	let location = "london";
	let phoneNumber = "01733 3585417";
	let textBox =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, alias?";
	let reservation = Math.floor(Math.random() * 1000000000);
	Swal.fire({
		icon: "success",
		title: `Please see below reservation details
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
	})
		// submitting new changes
		.then((result) => {
			if (!result.isConfirmed) {
				Swal.fire({
					icon: "info",
					title: "info!",
					html: `<h1>Make a Reservation</h1>
										<label for="name">Name</label>
										<input
											type="text"
											name="name"
											id="names"
											placeholder="Name"
											class="form-control"
										/>

										<label for="">Email Address</label>
										<input
											type="email"
											class="form-control"
											name="email"
											id="emails"
											aria-describedby="emailHelpId"
											placeholder="example@hotmail.co.uk"
										/>

										<label for="partySize">Party Size</label>
										<input
											name=""
											class="form-control"
											id="partySizes"
										></input>

										<!-- <select
										name=""
										class="form-control"
										id="partySizes"
									></select> -->
										
										<label for="date">Date</label>
										<input
											type="date"
											name="date"
											id="dates"
											class="form-control"
										/>

										<label for="time">Time</label>
										<input
											type="time"
											name="time"
											id="times"
											class="form-control"
										/>

										<label for="location">location</label>
										<select
											name="location"
											class="location form-control"
											id="locations"
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
											id="contactNumbers"
											placeholder="020 5701 7892"
											class="form-control"
										/>

										<label for="my-textarea">Text</label>
										<textarea
											id="my-textareas"
											class="form-control"
							alert("yes");				name="textarea"
											rows="3"
											class="form-control"
										></textarea>`,
				}).then((result) => {
					let glasses = {
						name: document.getElementById("names").value,
						email: document.getElementById("emails").value,
						party: document.getElementById("partySizes").value,
						date: document.getElementById("dates").value,
						time: document.getElementById("times").value,
						location: document.getElementById("locations").value,
						// let contactNumber = document.getElementById("contactNumber").value;
						text: document.getElementById("my-textareas").value,
						reservation: Math.floor(Math.random() * 1000000000),
					};
					localStorage.setItem("Newreservation", JSON.stringify(glasses));
				});
			}
		});
}

// ******************************* making a reservation *******************************

// submit button reservation form

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
		contactNumber: document.getElementById("contactNumber").value,
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

	if (true) {
		let form = document.getElementById("form");
		form.reset();
	}
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
	localStorage.setItem(glass.reservation, JSON.stringify(glass));
}

// ******************************* checking reservation *******************************

// html element which will comtain reservation on webpage

const todoList = document.querySelector(".searchResults");

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
	newTodo.classList.add("makeChange");
	let checking = refValue.value;
	localStore = JSON.parse(localStorage.getItem(checking)); //have the value of getitem as the value from what is typed in the input
	newTodo.innerText = localStore.reservation;
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

	let completebtn = document.querySelector(".complete-btn");
	completebtn.addEventListener("click", popUp);
}

// shows full details of reservation and make changes
function popUp() {
	let checking = document.querySelector(".makeChange").innerText;
	console.log(checking);
	let stored = JSON.parse(localStorage.getItem(checking));
	console.log(stored);
	let name = stored.name;
	let email = stored.email;
	let party = stored.party;
	let date = stored.date;
	let time = stored.time;
	let location = stored.location;
	let phoneNumber = stored.contactNumber;
	let textBox = stored.text;
	let reservation = stored.reservation;
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
											value="${name}"
											placeholder="Name"
											class="form-control"
										/>

										<label for="">Email Address</label>
										<input
											type="email"
											class="form-control"
											name="email"
											value="${email}"
											id="emails"
											aria-describedby="emailHelpId"
											placeholder="example@hotmail.co.uk"
										/>

										<label for="partySize">Party Size</label>
										<input
											name=""
											value="${party}"
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
											value="${date}"
											id="dates"
											class="form-control"
										/>

										<label for="time">Time</label>
										<input
											type="time"
											name="time"
											value="${time}"
											id="times"
											class="form-control"
										/>

										<label for="location">location</label>
										<select
											name="location"
											value="${location}"
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
											value="${phoneNumber}"
											placeholder="020 5701 7892"
											class="form-control"
										/>

										<label for="my-textarea">Text</label>
										<textarea
											id="my-textareas"
											class="form-control"
											value="${textBox}"
											name="textarea"
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
						contactNumber: document.getElementById("contactNumber").value,
						text: document.getElementById("my-textareas").value,
						reservation: Math.floor(Math.random() * 1000000000),
					};
					localStorage.setItem(checking, JSON.stringify(glasses));
				});
			}
		});
}

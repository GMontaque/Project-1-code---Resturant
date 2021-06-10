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
		$("#form").children("input").val("");
	}
}

// party size feild
$(function () {
	var $select = $("#partySize");
	for (i = 0; i <= 20; i++) {
		$select.append($("<option></option>").val(i).html(i));
	}
});

// location field

let resturantLocations = [
	"See Below",
	"london",
	"stamford",
	"glasgow",
	"oslo, rome",
];

$(function () {
	var $select = $("#location");
	for (i = 0; i <= resturantLocations.length; i++) {
		$select.append(
			$("<option></option>")
				.val(resturantLocations[i])
				.html(resturantLocations[i])
		);
	}
});

// save reservation to localstorage

function saveLocalTodos(glass) {
	localStorage.setItem(glass.reservation, JSON.stringify(glass));
}

// ******************************* checking reservation *******************************

// html element which will comtain reservation on webpage

const searchResults = document.querySelector(".resultsContainer");

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
	// reservation Div
	let reservationDiv = document.createElement("div");
	reservationDiv.classList.add("todo");

	// leftDiv
	let leftDiv = document.createElement("div");
	leftDiv.classList.add("todoL");

	// rightDiv
	let rightDiv = document.createElement("div");
	rightDiv.classList.add("todoR");

	// reservation inner text
	let reservantionNumber = document.createElement("li");
	let checking = refValue.value;
	reservantionNumber.classList.add("resNumber");
	localStore = JSON.parse(localStorage.getItem(checking));
	reservantionNumber.innerText = localStore.reservation;
	leftDiv.appendChild(reservantionNumber);

	let reservationName = document.createElement("li");
	reservationName.innerText = localStore.name;
	leftDiv.appendChild(reservationName);

	let reservationEmail = document.createElement("li");
	reservationEmail.innerText = localStore.email;
	leftDiv.appendChild(reservationEmail);

	// make a change button
	let completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-redo-alt"></i>';
	completedButton.classList.add("complete-btn");
	rightDiv.appendChild(completedButton);

	// delete button
	let trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	rightDiv.appendChild(trashButton);

	// append to list
	reservationDiv.appendChild(leftDiv);
	reservationDiv.appendChild(rightDiv);
	searchResults.appendChild(reservationDiv);
	refValue.value = "";
	console.log(reservationDiv);

	let completebtn = document.querySelector(".complete-btn");
	completebtn.addEventListener("click", popUp);
}

// shows full details of reservation and make changes
function popUp() {
	let checking = document.querySelector(".resNumber").innerText;
	console.log(checking);
	let stored = JSON.parse(localStorage.getItem(checking));
	console.log(stored);
	let name = stored.name;
	let email = stored.email;
	let party = stored.party;
	let date = stored.date;
	let time = stored.time;
	let location = stored.location;
	console.log(location);
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
										<input
											name="location"
											class="location form-control"
											id="locations"
											value="${location}"
										></input>

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
											name="textarea"
											rows="3"
											class="form-control"
										>${textBox}</textarea>`,
				}).then(() => {
					let glasses = {
						name: document.getElementById("names").value,
						email: document.getElementById("emails").value,
						party: document.getElementById("partySizes").value,
						date: document.getElementById("dates").value,
						time: document.getElementById("times").value,
						location: document.getElementById("locations").value,
						contactNumber: document.getElementById("contactNumbers").value,
						text: document.getElementById("my-textareas").value,
						reservation: reservation,
					};
					localStorage.setItem(checking, JSON.stringify(glasses));
				});
			}
		});
}

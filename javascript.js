// <!-- ****************************************** Main JS file  ****************************************** -->

// ******************************* making a reservation *******************************

// input validation disable button

function reservationSubmit() {
	let name = document.getElementById("name").value;
	let email = document.getElementById("email").value;
	let party = document.getElementById("partySize").value;
	let date = document.getElementById("date").value;
	let time = document.getElementById("time").value;
	let location = document.getElementById("location").value;
	let contactNumber = document.getElementById("contactNumber").value;
	if (
		name &&
		email &&
		party &&
		date &&
		time &&
		location &&
		contactNumber != ""
	) {
		submitBtn.disabled = false;
	} else {
		submitBtn.disabled = true;
	}
}

// submit button reservation form

let submitBtn = document.querySelector("#resSubmit");
submitBtn.addEventListener("click", ValidateEmail);

// email format check

function ValidateEmail() {
	let validRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (email.value.match(validRegex)) {
		reservationResult();
	} else {
		let input = document.getElementById("email");
		input.oninvalid = function (event) {
			event.target.setCustomValidity(
				"Email address should be entered in the following format: email@tester.com"
			);
		};
	}
}

// reservation fields

function reservationResult() {
	let reservationValues = {
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

	confirmRev(reservationValues);
	saveRevLocal(reservationValues);
}

// confirmaiton reservation popup

function confirmRev(formValue) {
	Swal.fire({
		icon: "success",
		title: `We are pleased to confim your reservation has been submitted.
		<br/>Reservation Number: ${formValue.reservation}`,
		html: `Summary Reservation Information:
		<br/>
		Booking Name: ${formValue.name} 
		<br/>
		Group Size: ${formValue.party} 
		<br/>
		Confirmation Email Address: ${formValue.email}
		<br/>
		Booking date and time: ${formValue.time} on ${formValue.date}
		<br/>
		Location: ${formValue.location}
		<br/>
		Notes: ${formValue.text}`,

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
		$("#form").children("textarea").val("");
		$("select").prop("selectedIndex", 0);
		reservationSubmit();
	}
}

// party size feild
$(function () {
	var $select = $("#partySize");
	for (i = 1; i <= 20; i++) {
		$select.append($("<option></option>").val(i).html(i));
	}
});

// location field

let resturantLocations = ["London", "Stamford", "Glasgow", "Oslo", "Rome"];

$(function () {
	var $select = $("#location");
	for (i = 0; i < resturantLocations.length; i++) {
		$select.append(
			$("<option></option>")
				.val(resturantLocations[i])
				.html(resturantLocations[i])
		);
	}
});

// date field
function dateCheck() {
	let dtToday = new Date();

	let month = dtToday.getMonth() + 1;
	let day = dtToday.getDate();
	let year = dtToday.getFullYear();
	if (month < 10) month = "0" + month.toString();
	if (day < 10) day = "0" + day.toString();

	let maxDate = year + "-" + month + "-" + day;

	let inputDate = document.getElementById("date");
	inputDate.setAttribute("min", maxDate);
}

dateCheck();

// save reservation to localstorage

function saveRevLocal(resResult) {
	localStorage.setItem(resResult.reservation, JSON.stringify(resResult));
}

// ******************************* checking reservation *******************************

// input validation

function manage() {
	if (refValue.value != "") {
		modal.disabled = false;
	} else {
		modal.disabled = true;
	}
}

// html element which will comtain reservation on webpage

let searchResults = document.querySelector(".resultsContainer");

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
	reservationDiv.classList.add("result");

	// leftDiv
	let leftInnerDiv = document.createElement("div");
	leftInnerDiv.classList.add("resultL");

	// rightDiv
	let rightInnerDiv = document.createElement("div");
	rightInnerDiv.classList.add("resultR");

	// reservation inner text
	let reservantionNumber = document.createElement("li");
	let checkingInputVal = refValue.value;
	reservantionNumber.classList.add("resNumber");
	localStore = JSON.parse(localStorage.getItem(checkingInputVal));
	reservantionNumber.innerHTML =
		'<i class="fas fa-wine-bottle iconStyle"></i>' + localStore.reservation;
	leftInnerDiv.appendChild(reservantionNumber);

	let reservationName = document.createElement("li");
	reservationName.innerHTML =
		'<i class="far fa-user iconStyle"></i>' + localStore.name;
	leftInnerDiv.appendChild(reservationName);

	let reservationEmail = document.createElement("li");
	reservationEmail.innerHTML =
		'<i class="far fa-envelope iconStyle"></i>' + localStore.email;
	leftInnerDiv.appendChild(reservationEmail);

	// make a change button
	let completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-redo-alt"></i>';
	completedButton.classList.add("complete-btn");
	rightInnerDiv.appendChild(completedButton);

	// delete button
	let trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	rightInnerDiv.appendChild(trashButton);

	// remove reservation result
	let reservationResultsDiv = searchResults.getElementsByTagName("div");
	trashButton.addEventListener("click", removeItem);
	function removeItem() {
		reservationResultsDiv[0].remove();
	}

	// append to list
	reservationDiv.appendChild(leftInnerDiv);
	reservationDiv.appendChild(rightInnerDiv);
	searchResults.appendChild(reservationDiv);
	refValue.value = "";
	console.log(reservationDiv);

	let completebtn = document.querySelector(".complete-btn");
	if (completebtn) {
		completebtn.addEventListener("click", popUp);
	}
}

// shows full details of reservation and make changes
function popUp() {
	let reservationNum = document.querySelector(".resNumber").innerText;
	console.log(reservationNum);
	let storedVal = JSON.parse(localStorage.getItem(reservationNum));
	console.log(storedVal);
	let name = storedVal.name;
	let email = storedVal.email;
	let party = storedVal.party;
	let date = storedVal.date;
	let time = storedVal.time;
	let location = storedVal.location;
	let phoneNumber = storedVal.contactNumber;
	let textBox = storedVal.text;
	let reservation = storedVal.reservation;
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
					html: ` 			<h1>Make a Reservation</h1>
										<label for="name">Name</label>
										<input
											type="text"
											name="name"
											id="names"
											value="${name}"
											placeholder="Name"
											class="form-control"
											onkeypress="return /([a-z\' '])/i.test(event.key)"
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

										<label for="partySize">Group Size</label>
										<select
											name=""
											class="form-control"
											id="partySizes"
										>
										<option value="${party}" disabled selected hidden>
										${party} </option>
										</select>

										<!-- <label for="partySize">Group Size</label>
										<input
											name=""
											value="${party}"
											class="form-control"
											id="partySizes"
										></input> -->
										
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
											class="location form-control"
											id="locations"
										>	
										<option value="${location} " disabled selected hidden>
										${location} </option>
										<option value="London">London</option>
										<option value="Stamford">Stamford</option>
										<option value="Glasgow">Glasgow</option>
										<option value="Oslo">Oslo</option>
										<option value="Rome">Rome</option>
										</select>
									

										<label for="contactNumber">Contact Number</label>
										<input
											type="tel"
											name="contactNumber"
											id="contactNumbers"
											value="${phoneNumber}"
											placeholder="020 5701 7892"
											class="form-control"
											onkeypress="return /([0-9\' '])/i.test(event.key)"
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
					let reservationValuesNew = {
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
					searchResults.remove();
					localStorage.setItem(
						reservationNum,
						JSON.stringify(reservationValuesNew)
					);
				});
			}
		});
}
function partySizeCange() {
	// party size feild

	let $select = $("#partySizes");
	for (i = 1; i <= 20; i++) {
		$select.append($("<option></option>").val(i).html(i));
	}
}

partySizeCange();

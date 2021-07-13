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
submitBtn.addEventListener("click", validateForm);

// email format check

function validateForm() {
	let formResults = document.querySelector("#form");
	let isValid = formResults.checkValidity();
	if (isValid) {
		reservationResult();
	} else {
		null;
	}
}

// function ValidateEmail() {
// 	let validRegex =
// 		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// 	if (email.value.match(validRegex)) {
// 		reservationResult();
// 	} else {
// 		let input = document.getElementById("email");
// 		input.oninvalid = function (event) {
// 			event.target.setCustomValidity(
// 				"Email address should be entered in the following format: email@tester.com"
// 			);
// 		};
// 	}
// }

// function ValidateEmail(inputText) {
// 	console.log(inputText);
// 	var mailformat =
// 		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// 	if (inputText.value.match(mailformat)) {
// 		alert("Valid email address!");

// 		return true;
// 	} else {
// 		let input = document.getElementById("email");
// 		input.oninvalid = function (event) {
// 			event.target.setCustomValidity(
// 				"Email address should be entered in the following format: email@tester.com"
// 			);
// 		};
// 	}
// }

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
	let $select = $("#partySize");
	for (i = 1; i <= 20; i++) {
		$select.append($("<option></option>").val(i).html(i));
	}
});

// location field

let resturantLocations = ["London", "Stamford", "Glasgow", "Oslo", "Rome"];

$(function () {
	let $select = $("#location");
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

function resetResCheckBtn() {
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
	completedButton.innerHTML =
		'<i class="fas fa-edit"></i>' + " Full Details/Edit";
	completedButton.classList.add("complete-btn");
	rightInnerDiv.appendChild(completedButton);

	// delete button
	let trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="far fa-window-close"></i>' + " Close";
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
	// console.log(reservationDiv);

	// reset reservation check button
	resetResCheckBtn();

	let completebtn = document.querySelector(".complete-btn");
	if (completebtn) {
		completebtn.addEventListener("click", popUp);
	}
}

// shows full details of reservation and make changes
function popUp() {
	let reservationNum = document.querySelector(".resNumber").innerText;
	// console.log(reservationNum);
	let storedVal = JSON.parse(localStorage.getItem(reservationNum));
	// console.log(storedVal);
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
		confirmButtonText: `<a 
		style="color: white;"
		href="#collapseOne"
		>Make a Change</a
	>`,
		cancelButtonText: "Close",
		cancelButtonColor: "red",
	})
		// submitting new changes
		.then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					allowOutsideClick: false,
					icon: "info",
					title: "info!",
					html: ` 			
					<form>
					<h1>Make a Reservation</h1>
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
										<input
											name=""
											value="${party}"
											class="form-control"
											id="partySizes"
											type="number" 
										></input> 
										
										<label for="date">Date</label>
										<input
											type="date"
											name="date"
											value="${date}"
											id="dates"
											class="form-control"
											onkeydown="return false;"
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
										>${textBox}</textarea>
										</form>`,
					preConfirm: () => {
						let login = Swal.getPopup().querySelector("#partySizes").value;

						if (login > 20 || login < 1) {
							// console.log(login);
							Swal.showValidationMessage(
								"We only accept group bookings between 1 and 20 people"
							);
						}

						// email validate
						let emailcheckers = document.querySelector("#emails").value;
						let validRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/;
						// console.log(emailcheckers);

						if (emailcheckers.match(validRegex)) {
							return null;
						} else {
							Swal.showValidationMessage(
								"Email address should be entered in the following format: email@tester.com"
							);
						}
					},
					confirmButtonText: "Submit Changes",
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

					let reservationResultsDiv = searchResults.getElementsByTagName("div");
					reservationResultsDiv[0].remove();

					localStorage.setItem(
						reservationNum,
						JSON.stringify(reservationValuesNew)
					);

					Swal.fire({
						icon: "success",
						title: `Your Reservation has been updated`,
						html: `Reservation Number: ${reservationValuesNew.reservation} 
						<br>
						<br>
						If you wish to make any further changes simple re-enter your reservation number, shown above in the search bar.`,
						confirmButtonText: "Close",
					});
				});
				// date setting
				let dtToday = new Date();

				let month = dtToday.getMonth() + 1;
				let day = dtToday.getDate();
				let year = dtToday.getFullYear();
				if (month < 10) month = "0" + month.toString();
				if (day < 10) day = "0" + day.toString();

				let maxDate = year + "-" + month + "-" + day;
				let inputDates = document.getElementById("dates");
				inputDates.setAttribute("min", maxDate);

				// party size
				let $select = $("#partySizes");
				for (i = 1; i <= 20; i++) {
					$select.append($("<option></option>").val(i).html(i));
				}
			}
		});
}

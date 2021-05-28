$(function () {
	var $select = $(".partySize");
	for (i = 0; i <= 20; i++) {
		$select.append($("<option></option>").val(i).html(i));
	}
});

let tester = document.querySelector(".partySize");
console.log(tester);

function log(msg){
  console.log(msg);
}
function showStatus(seat,seatId){
	return (seat)? 
		"<img id='"+seatId+"' class='seat' src='images/seat_available.jpg' alt='available' onclick='seatOnClick(this)'/>" :
		"<img id='"+seatId+"' class='seat' src='images/seat_unavailable.jpg' alt='unavailable' onclick='seatOnClick(this)'/>" ;
}
function displaySeats(seats, seatsDisplay){
	for (var i = 0; i < seats.length; i++){
		seatsDisplay.innerHTML += (i + 1) + " ";
		for(var j = 0; j < seats[i].length; j++){
			var seatId = "row" + i + ";seat" + j;
			seatsDisplay.innerHTML += showStatus(seats[i][j],seatId) + " ";
		}
		seatsDisplay.innerHTML += '<br>';
	}
}
// multiple return statements are considered bad style 
function findSeats(seats, target){
	log(seats);
	log("target: " + target);
	var curLength = 0;
	var result = 'No seats vacant for ' + target + " people.";
	for (var i = 0; i < seats.length; i++){
		for (var j = 0; j < seats[i].length; j++){
			if(seats[i][j]){
				curLength++;
				if (curLength == target){
					result = "Vacant seats in row " + (i + 1) + 
						" seats " + (j - curLength + 2) + " to " + (j + 1) + ".";
					return result;
				}
			} else {
				curLength = 0;
			}
		}
		curLength = 0;
	}
	return result;
}
function genSeats(){
	var row = Math.floor((Math.random() * 10) + 3);
	var columns = Math.floor((Math.random() * 20) + 5);
	var seats = new Array(row);
	for (var k = 0; k < row; k++){
		seats[k] = [];
	}
	log("Generating seats with rows: " + row + " columns: " + columns);
	for(var i = 0; i < row; i++){
		for(var j = 0; j < columns; j++){
			seats[i][j] = Math.random() >= 0.75;  // unknown error when 0? 
		}
	}
	return seats;
}
function seatOnClick(element){
	if(element.alt === 'available'){
		element.src = 'images/seat_checked.jpg';
		element.alt = 'checked';
	} else if(element.alt === 'checked'){
		element.src = 'images/seat_available.jpg';
		element.alt = 'available';
	}
	log(element.id + " is " + element.alt);

}
function searchBtnOnClick(seats, seatsDisplay) {
	target = parseInt(document.getElementById("adjacentSeatsNum").value); // not parsing an int was expensive
	searchResult = document.getElementById("searchResult");
	if (seatsDisplay.innerHTML.length === 0){
		log("Error: No Seats Data Found.");
	} else {
		//log(findSeats(seats,target));
		searchResult.innerHTML = findSeats(seats,target);
	};
}
// main 
// Todo: highlight seats, header, footer, 
window.onload = function () {
	log("start");
	var seatsDisplay = document.getElementById("seatsDisplay");
	var seats = genSeats();
	displaySeats(seats, seatsDisplay);
	document.getElementById("searchBtn").onclick = function() {searchBtnOnClick(seats,seatsDisplay)};
};

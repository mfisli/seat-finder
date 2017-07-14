function log(msg){
  console.log(msg);
}
function showStatus(seat){
	return (seat)? '[ ]' : '[x]';
}
function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}
// todo: seats.length seems to get the value of the inner arrays
// causing more <br> to be produced than needed. 
function displaySeats(seats, seatsDisplay){
	for (var i = 0; i < seats.length; i++){

		for(var j = 0; j < seats[i].length; j++){
			//log(seats[i][j]);
			seatsDisplay.innerHTML += showStatus(seats[i][j]) + " " ;
		}
		seatsDisplay.innerHTML += '<br>';
	}
}
// todo:
// multiple return statements are considered bad style 
function findSeats(seats, rowLengthTarget){
	var curLength = 0;
	var result = 'No seats vacant for ' + rowLengthTarget + " people.";
	for (var i = 0; i < seats.length; i++){
		for (var j = 0; j < seats[i].length; j++){
			if(seats[i][j]){
				curLength++;
				if (curLength === rowLengthTarget){
					result = "Vacant seats in row " + (i + 1) + " seats " + (j - curLength + 2) + " to " + (j + 1) + ".";
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
	for (var k = 0; k < columns; k++){
		seats[k] = [];
	}

	log("Generating seats with rows: " + row + " columns: " + columns);
	for(var i = 0; i < row; i++){
		for(var j = 0; j < columns; j++){
			seats[i][j] = Math.random() >= 0.75;
		}
	}
	return seats;
}
// main 
window.onload = function () {
	log("start");
	var seatsDisplay = document.getElementById('seatsDisplay');
	var seats = genSeats();
	// seats ok
	// var seats = [
	// 	[true,false,true,true,false,true],
	// 	[false,true,true,true,false,false],
	// 	[false,false,true,true,false,false]
	// ];
	// // seats ok more than one
	// var seats = [
	// 	[true,false,true,true,false,true],
	// 	[false,true,true,true,false,false],
	// 	[false,false,true,true,true,false]
	// ];
	// // no seats
	// var seats = [
	// 	[true,false,true,true,false,true],
	// 	[true,false,true,true,false,false],
	// 	[false,false,true,true,false,false]
	// ];
	// // seat wrapping 
	// var seats = [
	// 	[true,false,true,true,false,true],
	// 	[true,true,false,true,false,false],
	// 	[false,false,true,true,false,false]
	// ];
	target = 3;
	if (seatsDisplay.innerHTML){
		alert("No Seats Data Found.");
	} else {
		displaySeats(seats, seatsDisplay);
		log(findSeats(seats,target))
	};


};

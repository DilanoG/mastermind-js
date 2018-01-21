var game = document.getElementById("game")
var currentColors = [-1, -1, -1, -1];
var colors = ["red", "orange", "yellow", "green", "purple", "blue", "pink", "black"];	
var picked = getRandomCode();
var rowCounter = 0;

function getRandomCode(){
	var code = [];
	for (var i = 0; i < 4; i++) {
		code.push(Math.floor(Math.random() * colors.length));
	}
	console.log(code);
	return code;
}

window.onload = new function() {
	for (var y = 0; y < 12; y++) {
		document.getElementById("game").appendChild(generateElement("div", y, "bulletHolder"));
		for (var x = 0; x < 4; x++) {
			document.getElementById(y).appendChild(generateElement("div", "", "bullet1"));
		}
		for (var x = 0; x < 4; x++) {
			document.getElementById(y).appendChild(generateElement("div", "", "bullet2"));
		}
	}
	nextRow();

	document.getElementById('button').onclick = function () {
		if (filledInCode()) {
			alert('you smart :D');
		} else if (rowCounter == 11) {
			alert('you succ :P');
		} else {
			nextRow();
		}
	}
}

function generateElement(element, id, className) {
	var element = document.createElement(element)
	element.setAttribute("id", id)
	element.setAttribute("class", className) 
	return element;
}

function increaseColor() {
	if (this.id == 7 || this.id === "") {
		this.id = 0;
		this.style.backgroundColor = colors[this.id];
	} else {
		this.id = parseInt(this.id) + 1;
		this.style.backgroundColor = colors[this.id];
	}
}

function decreaseColor(event) {
	event.preventDefault();
	if (this.id == 0 || this.id === "") {
		this.id = 7;
		this.style.backgroundColor = colors[this.id];
	} else {
		this.id = parseInt(this.id) - 1;
		this.style.backgroundColor = colors[this.id];
	}
}

function nextRow() {
	if (rowCounter > 0 && rowCounter <= 11) {
		var elements = document.getElementById(rowCounter - 1).children;
		for (var i = 0; i < 4; i++) {
			elements[i].removeEventListener('click', increaseColor);
			elements[i].removeEventListener('contextmenu', decreaseColor, false);
		}
	}	
	if (rowCounter < 11) {
		var elements = document.getElementById(rowCounter).children;
		for (var i = 0; i < 4; i++) {
			elements[i].addEventListener('click', increaseColor);
			elements[i].addEventListener('contextmenu', decreaseColor, false);
		}
	}
	++rowCounter;
}

function filledInCode() {
	var elements = document.getElementById(rowCounter).children;
	for (var i = 0; i < 4; i++) {
		if (elements[i].id === "") {
			console.log('test');
			return false;
		}
	}
	return true;
}

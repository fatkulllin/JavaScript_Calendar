let calendar = document.querySelector('#calendar');
let body = calendar.querySelector('.body');
let info = calendar.querySelector('.info')
let prev = calendar.querySelector('.prev');
let next = calendar.querySelector('.next');

let date  = new Date();
let year  = date.getFullYear();
let month = date.getMonth();
let nowDay = date.getDate();

let months = [
	'янв', 'фев', 'мар', 'апр', 'май', 'июн',
	'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
];

info.innerHTML = year + '	' + months[month]


/*------------------------------------------------------------ */
let monthcount = month
let yearcount = year
next.addEventListener('click', function() {
	body.innerHTML = ''
	draw(body, getNextYear(), getNextMonth());
	info.innerHTML = yearcount + '	' + months[monthcount]

});
prev.addEventListener('click', function() {
	body.innerHTML = ''
	draw(body, getPrevYear(), getPrevMonth());
	info.innerHTML = yearcount + '	' + months[monthcount]
});

function getNextYear(){

	if(monthcount <=0 || monthcount == 11 ){
		yearcount++
		return yearcount
	}else{
		return yearcount
	}

}

function getNextMonth(){

if(monthcount< 11){
	monthcount++
	return monthcount
}else{
	monthcount = 0
	return monthcount
	}
}

function getPrevYear(){
	if(monthcount ==0 ){
		yearcount--
		return yearcount
	}else{
		return yearcount
	}
}

function getPrevMonth(){
	
	if(monthcount <= 11 && monthcount >0){
		monthcount--
		return monthcount
	}else{
		monthcount = 11
		return monthcount
		}
	}
/*------------------------------------------------------------ */



/*------------------------------------------------------------ */
draw(body, year, month)

function draw(body, year, month) {

let arr = range(getLastDay(year, month));
let firstWeekDay = getFirstWeekDay(year, month);
let lastWeekDay  = getLastWeekDay(year, month);
let res = normalize(arr, firstWeekDay, 6 - lastWeekDay);
let res1 = chunk(res,7)//arr
createTable(body,res1) //заполнение таблицы

}

function createTable(parent, arr) {

	for(let i=0;i<arr.length;i++){
		let tr = document.createElement('tr')
		parent.appendChild(tr)

		for(let k = 0;k<7;k++){
			let td = document.createElement('td')
			td.innerHTML = arr[i][k]
			tr.appendChild(td)
		}
	}
}

function chunk(arr, n) {

	let j = 0
	let result = []
	let week = weeks(Math.trunc(arr.length%6))

	for(let i=0;i<week;i++){
		
		result[i]=[]
		for(let k=0;k<n;k++){
			result[i][k]=arr[j]
			j++
		}
	}
	
	return result
}

function weeks(length){

if(length == 0){
	return 6
}else{
	return length
}
}

function normalize(arr, left, right) {
if(left == 0){
	left = 7
	for(let i=1;i<left;i++){
		arr.unshift('')
	}
}else{
	for(let i=1;i<left;i++){
		arr.unshift('')
	}
}
	
	for(let k=0;k<=right;k++){

		arr.push('')
	}
	return arr
}


function range(count) {
	let result = []
	for(let i=1;i<=count;i++){
		result.push(i)
	}
	
	return result
}

function getLastDay(year, month) {

	let date1 = new Date(year, month+1, 0);
	return date1.getDate()
	
}

function getFirstWeekDay(year, month) {
	let date1 = new Date(year, month,1);
	return date1.getDay()
}

function getLastWeekDay(year, month) {
	let date1 = new Date(year, month+1,0);
	return date1.getDay()
}

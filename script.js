const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI()

let ticketPrice = parseInt(movieSelect.value); // parseInt makes this a number.

// Save selected movie index and price into local storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
    //grabs selected seats and puts into a 'NodeList' called 'selectedSeats'.
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // Copy selected seats into array, map through array, return a new array of indexes.
    const seatsIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat)
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    // Changes the text of 'count' and 'total' to selected seats amounts.
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    setMovieData(movieSelect.selectedIndex, movieSelect.value)
}

// Get data from locale storage and populate UI. if refreshed, seats remain highlighted.
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if( selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', function(e) {
    // Changes the ticket price when to the selected movie when the 'Pick a movie' is changed.
    ticketPrice = parseInt(e.target.value) // parseInt makes this a number
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// Seat click event
container.addEventListener('click', function(e) {
//   console.log(e.target)  
    // if the 'click' has a target of class 'seat' AND not 'occupied, then...
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        console.log(e.target)
        // toggles the seat class from 'selected' on/off.
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
})

// Initial count and total set 
updateSelectedCount();
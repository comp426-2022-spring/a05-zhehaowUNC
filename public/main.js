// Focus div based on nav button click
function focusDiv(divname) {
    // Set active element(s) to be hidden
    var activeDivsCollection = document.getElementsByClassName("active");
    var activeDivsArr = Array.from(activeDivsCollection)
    activeDivsArr.forEach(function(currentdiv) {
        currentdiv.setAttribute("class", "hidden");
    })

    // Set the div to focus on to be active
    document.getElementById(divname).setAttribute("class", "active");
}

// Flip one coin and show coin image to match result when button clicked
function flipCoin() {
    fetch('http://localhost:5000/app/flip/', {
            method: "GET",
            mode: 'cors',
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:5000",
                "Content-Type": "text/plain"
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            document.getElementById("flipResult").innerHTML = result.flip;
            document.getElementById("quarter").setAttribute("src", "assets/img/" + result.flip + ".png");
        })
}

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series
function flipCoins() {
    // retrieve number of coins to flip
    numberCoins = document.getElementById("numberCoins").value;

    fetch('http://localhost:5000/app/flips/coins', {
            body: JSON.stringify({
                "number": numberCoins
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "post"
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            // Graphically display all results in the details table.
            var detailsTableBody = document.getElementById("realresults");
            detailsTableBody.innerHTML = result.raw;
            document.getElementById("heads").innerHTML = result.summary.heads == undefined ? "heads: " + 0.toString() : "heads: " + result.summary.heads.toString()
            document.getElementById("tails").innerHTML = result.summary.tails == undefined ? "tails: " + 0.toString() : "tails: " + result.summary.tails.toString()
        })
}

// Guess a flip by clicking either heads or tails button
function guessFlip(guess) {
    fetch('http://localhost:5000/app/flip/call', {
            body: JSON.stringify({
                "guess": guess
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "post"
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            // Display the pick (text and image).
            document.getElementById("guessPickText").innerHTML = result.call;
            // Display the actual result (text and image).
            document.getElementById("guessActualResultText").innerHTML = result.flip;

            // Display if the person using the site won or lost.
            document.getElementById("guessWinOrLoss").innerHTML = result.result == "win" ? "You are right!" : "You are wrong";
        })
}

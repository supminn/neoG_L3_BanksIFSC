//Reads the input or refers to the specific html tags
var btnTranslate = document.querySelector("#btn-translate");
var textData = document.querySelector("#txt-input");
var outputData = document.querySelector("#txt-output");
const hsbcIFSC = "HSBC0560002";

//URL to fetch the API
var serverURL = "https://ifsc.razorpay.com/";

//Add the parameters to the URL
function getTranslatedURL(value) {
    return serverURL + value;
}

//Error handling function
function errorHandler(error) {
    console.log("error occured: ", error);
    alert("Something wrong with the server, try again later.");
}

//Processing - what happens when the button is clicked
function buttonClicked() {
    var textValue = textData.value;
    outputData.setAttribute("style","border: 1px solid  var(--grey);")
    outputData.innerText = "Translation in progress..."
    fetch(getTranslatedURL(textValue))
        .then(response => response.json())
        .then(json => {
            if (json.IFSC === undefined) {
                alert("Invalid IFSC code. Please check the data and try again.");
                outputData.innerText = "Retry with correct input..."
            } else {
                outputData.innerHTML = '<p><strong>IFSC</strong>: ' + json.IFSC + ' \
                    <br><strong>BANK</strong>: ' + json.BANK + '\
                    <br><strong>BRANCH</strong>: ' + json.BRANCH + '\
                    <br><strong>CENTRE</strong>: ' + json.CENTRE + '\
                    <br><strong>DISTRICT</strong>: ' + json.DISTRICT + '\
                    <br><strong>CITY</strong>: ' + json.CITY + '\
                    <br><strong>STATE</strong>: ' + json.STATE + '\
                    <br><strong>ADDRESS</strong>: ' + json.ADDRESS + '\
                    <br><strong>MICR</strong>: ' + json.MICR + '\
                    <br><strong>BANKCODE</strong>: ' + json.BANKCODE + '\
                    <br><strong>CONTACT</strong>: ' + json.CONTACT + '</p>';
            }
        })
        .catch(errorHandler);
}

//Listen to the event - when the button is clicked
btnTranslate.addEventListener("click", buttonClicked);
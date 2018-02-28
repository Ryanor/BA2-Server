
/**
 * This javascript file contains the code to dynamically create input fields to the profile form.
 * All elements are programmatically added and need therefore unique identifiers ID´s.
 * The data of the filled form is converted to a JSON object using a javascript library called form2js.
 * The JSON object will be transferred to the server´s REST API.
 */


/* Global variables service, characteristic and descriptor are used to get an
   unique identifier (ID) for all elements used in the form. */
var service = 0;
var characteristic = 0;
var descriptor = 0;


/**
 * Function converts all data from the profile form into a json object.
 * It uses a external library for this parsing process, which scans all possible input
 * field for a name and corresponding value attribute.
 * These attributes are stored as key value pairs to the json object.
 * The library uses the special format of the name to generate a correct json format structure
 * including arrays of values.
 */
function convertForm() {

    buildInputFieldsForValuesArray();
    var data = form2js('profile', '.', true);
    console.log(JSON.stringify(data));
    transferData(data);
}

function buildInputFieldsForValuesArray() {
    // get collection of all elements which are arrays of values
    var values_arrays = document.getElementsByClassName('values_array');

    for(var i=0; i < values_arrays.length; i++) {
        // get next array from the collection
        var array = values_arrays[i];
        // get the array value which is a comma separated string
        var value = array.value;

        // get id of the element
        var id = array.id;
        // get name of the element
        var name = array.name;
        // split string at commas to get all single values from the input field
        var numbers = value.split(',');
        // set current node to append new element to the array node
        var currentNode = array;
        // if more than 1 number is available
        if(numbers.length > 0) {
            // create a new element which contains a single value
            for(var k = 0; k < numbers.length; k++) {
                // first element gets overwritten
                if( k === 0) {
                    array.name = name + "[]";
                    array.value = numbers[k];
                } else {
                    // create new element for the other values
                    var characteristicValuesArray = document.createElement('input');
                    // with own unique id
                    characteristicValuesArray.id = id + '_' + k; //values' + characteristic;
                    // the same name with array brackets for the library
                    characteristicValuesArray.name = name + "[]"; //characteristicNamePrefix + ".values";
                    // and most important the new value
                    characteristicValuesArray.value = numbers[k];
                    // append as sibling
                    currentNode.insertAdjacentElement("afterend", characteristicValuesArray);
                    // set new current node
                    currentNode = characteristicValuesArray;
                }
            }
        }
    }
}

/**
 * Function generates a HTTP POST request and transfers the json object to the web server
 * using the correct REST API ressources.
 * @param data JSON object containing data from the profile form
 */
function transferData(data) {
    var xhr = new XMLHttpRequest();

    // React on state changes from the request
    xhr.onreadystatechange = function() {
        console.log(xhr.readyState);
        console.log(xhr.status);
        if(xhr.readyState === 4 && xhr.status === 201) {
            // Request finished. Do processing here.
            alert(xhr.responseText + "   ...redirecting to start page");
            document.location.href = '/';
        }

        if(xhr.readyState === 4 && xhr.status === 500) {
            // Request error on server. Do processing here.
            alert(xhr.responseText + "   ...redirecting to start page");
            document.location.href = '/';
        }
    };
    // prepare a POST request to REST API resource
    xhr.open("POST", "/profile", true);
    // set content of the request to JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(xhr.readyState);
    console.log(xhr.status);
    // transfer data
    xhr.send(JSON.stringify(data));
}

/**
 * After page is loaded start function addService()
 */
window.onload = function () {
    addService();
};
/**
 * This javascript file populates the page with the existing profiles stored in the database.
 * The profiles are requested via REST routes.
 *
 * It is also used to control the simulator with a start/stop button.
 * To set the actual button state on page access, a shell script is called via REST route.
 * Start and stop functions are also calling shell scripts via REST routes.
 *
 * @class profiles
 */

// create empty array for the data
var profiles = [];
// simulator state
var start_stop;

var button;
var populate;
var form;
var descriptorRoot = null;
// counters for the dynamic profile building
var serviceCount;
var characteristicCount;
var descriptorCount;

/* Global variables service, characteristic and descriptor are used to get an
   unique identifier (ID) for all elements used in the form. */
var service = 0;
var characteristic = 0;
var descriptor = 0;


/**
 * DOM ready function entry point after loading DOM structure into browser
 *
 * @method jquery.ready
 * @for profiles
 */
$(document).ready(function () {
    button = document.getElementById('simulator');
    form = document.getElementById('profile');
    populate = document.getElementById('populate');
    $("#populate").hide();

    // Populate the existing profile table on initial page load
    populateTable();

    // check if simulator is running and switch start/stop simulator button
    checkSimulatorRunning();

    // Select profile for simulator
    $("#body").on('click', 'td a.select', selectProfile);
    // Watch content of a selected profile
    $("#body").on('click', 'td a.watch', watchProfile);
    // Delete profile from database
    $("#body").on('click', 'td a.delete', deleteProfile);

});

/**
 * Function request all existing profiles as a AJAX call from the REST API
 * and populates the a table with the response as data source.
 * Writes data directly to body
 *
 * @method populateTable
 * @for profiles
 */
function populateTable() {
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/profile/all', function (data) {

        profiles = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="select" rel="' + this._id + '">select</a></td>';
            tableContent += '<td><a href="#" class="watch" rel="' + this._id + '">' + this.name + '</a></td>';
            tableContent += '<td>' + this._id + '</td>';
            tableContent += '<td><a href="#" class="delete" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $("#body").html(tableContent);
    });
}

/**
 * Function does a GET request to the REST API to start a shell script.
 * This script checks if the simulator is running and returns this state.
 * The state is used to switch the label and color of the start/stop button.
 *
 * @method checkSimulatorRunning
 * @for profiles
 */
function checkSimulatorRunning() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && xhr.status === 200 && xhr.responseText === 'running') {
            start_stop = false;
            button.value = "Stop Simulator";
            button.className = "stop";
        } else {
            start_stop = true;
        }
    });
    xhr.open("GET", "/checkSimulator", true);
    xhr.send(null);
}

/**
 * Function is triggered on button click event and starting/stopping the simulator
 * depending on its current state which is stored as boolean variable start_stop
 *
 * @method startStop
 * @for profiles
 */
function startStop() {
    if (start_stop) {
        startSimulator();
    } else {
        stopSimulator();
    }
}

/**
 * After a confirmation dialog is confirmed positive,
 * this function sends a POST request to the REST API to start the simulator.
 * Also the start/stop button on the page is changing its label and color.
 * Prints either a success or error dialog from the response state.
 *
 * @method startSimulator
 * @for profiles
 */
function startSimulator() {
    var confirmation = confirm('Are you sure you want to start the simulator?');

    if (confirmation === true) {
        start_stop = false;
        button.value = "Stop Simulator";
        button.className = "stop";
        // send post request and save selected profile for next simulator start
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("POST", "/startSimulator");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                alert(this.responseText);
            }
            if (xhr.status === 500) {
                alert("Error starting the simulator");
            }
        });
        xhr.send(null);
    }
}


/**
 * After a confirmation dialog is confirmed positive,
 * this function sends a POST request to the REST API to stop the simulator.
 * Also the start/stop button on the page is changing its label and color.
 * Prints either a success or error dialog from the response state.
 *
 * @method stopSimulator
 * @for profiles
 */
function stopSimulator() {
    var confirmation = confirm('Are you sure you want to stop the simulator?');

    if (confirmation === true) {
        start_stop = true;
        button.value = "Start Simulator";
        button.className = "start";
        // send post request and save selected profile for next simulator start
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("POST", "/stopSimulator");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                alert(this.responseText);
            }
            if (xhr.status === 500) {
                alert("Error stopping the simulator");
            }
        });

        xhr.send(null);
    }
}

/**
 * After a confirmation dialog is confirmed positive,
 * this function sends a DELETE request to the REST API to delete an existing profile
 * using the profiles ID.
 * Prints either a success or error dialog from the response message.
 * And repopulates the profile table which has changed.
 *
 * @method deleteProfile
 * @event event
 * @for profiles
 */
function deleteProfile(event) {

    event.preventDefault();

    var confirmation = confirm('Are you sure you want to delete this profile?');

    if (confirmation === true) {
        // send post request with id as param to delete profile from database
        $.ajax({
            type: 'DELETE',
            url: '/profile/' + $(this).attr('rel')
        }).done(function (response) {
            alert(response.msg);
            populateTable();
        });
    }
}

/**
 * After a confirmation dialog is confirmed positive,
 * this function sends a POST request to the REST API containing the selected profile.
 * The profile is stored in a file for further use with the simulator.
 * Prints either a success or error dialog from the response message.
 *
 * @method selectProfile
 * @event event
 * @for profiles
 */
function selectProfile(event) {
    event.preventDefault();

    var confirmation = confirm('Are you sure you want to start simulator with selected profile?');

    if (confirmation === true) {

        var profile = getJSONById($(this).attr('rel'));
        profile = JSON.stringify(profile, null, 2);

        // send post request and save selected profile for next simulator start
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                alert(this.responseText);
            }
            if (xhr.status === 500) {
                alert("Error saving profile");
            }
        });

        xhr.open("POST", "/selectProfile");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(profile);
    }
}

/**
 * Function populates a form with the json data from the selected profile.
 * Before the new form is created any existing old form is removed from the DOM.
 *
 * @method watchProfile
 * @event event
 * @for profiles
 */
function watchProfile(event) {
    event.preventDefault();

    removeChilds(form);
    $("#populate").show();

    serviceCount = 0;
    characteristicCount = 0;
    descriptorCount = 0;

    var profile = getJSONById($(this).attr('rel'));
    console.log(profile);
    populateFormFromJson(form, profile);
}

/**
 * Function returns the profile data as json from the profiles array
 * used to populate the table inside the body element.
 * To get the correct profile data the ID from the selection is used.
 *
 * @method getJSONById
 * @param {String} id ID from the selected profile
 * @return {Object} profile Single profile identified by its ID from the profiles array
 * @for profiles
 */
function getJSONById(id) {
    for (var i = 0; i < profiles.length; i++) {
        if (profiles[i]._id === id) {
            return profiles[i];
        }
    }
}

/**
 * Function removes all appending child elements from a node.
 * Used to clear the form.
 *
 * @method removeChilds
 * @param {Object} fromNode Node to remove all child elements from
 * @for profiles
 */
function removeChilds(fromNode) {
    var last;
    while (last = fromNode.lastChild) {
        fromNode.removeChild(last);
    }
}

/**
 * Function populates the form with the selected profile data as json.
 * this function sends a DELETE request to the REST API to delete an existing profile
 * using the profiles ID.
 * Prints either a success or error dialog from the response message.
 * And repopulates the profile table which has changed.
 *
 * @method populateFormFromJson
 * @param {Object} parentNode Node to start populating the form from
 * @param {Array} jsonProfile Contains the profile data as json
 * @for profiles
 */
function populateFormFromJson(parentNode, jsonProfile) {

    // iterate over elements in json profile
    for (var elem in jsonProfile) {

        if (jsonProfile[elem] instanceof Array) {

            if (elem === 'services') {
                appendNewDivElement(parentNode, 'services', 'services');
                var services = document.getElementsByClassName('services');
                parentNode = services[services.length - 1];
                for (var k = 0; k < jsonProfile[elem].length; k++) {
                    appendNewDivElement(parentNode, 'service' + serviceCount, 'service');
                    parentNode = document.getElementById('service' + serviceCount);
                    serviceCount++;
                    populateService(parentNode, jsonProfile[elem][k]);
                }
            }
        } else {
            createInputElement(parentNode, elem, jsonProfile[elem]);
        }
    }
}

/**
 * Function appends a service and its containing data to the form.
 *
 * @method populateService
 * @param {Object} parentNode Node to append service at
 * @param {Object} service Object of service
 * @return null
 * @for profiles
 */
function populateService(parentNode, service) {
    var currentNode = parentNode;
    for (var elem in service) {
        if (service[elem] instanceof Array) {
            if (elem === 'characteristics') {
                appendNewDivElement(parentNode, 'characteristics', 'characteristicsRoot');
                // get characteristics of parent service
                var characteristics = document.getElementsByClassName('characteristicsRoot');
                var oldParentNode = characteristics[characteristics.length - 1];
                for (var k = 0; k < service[elem].length; k++) {
                    appendNewDivElement(oldParentNode, 'characteristic' + characteristicCount, 'characteristic');
                    parentNode = document.getElementById('characteristic' + characteristicCount);
                    characteristicCount++;
                    populateCharacteristic(parentNode, service[elem][k]);
                }
            }
        } else {
            createInputElement(currentNode,
                "service[" + (serviceCount - 1) + "]." + elem,
                service[elem]);
        }
    }
    return null;
}

/**
 * Function appends a characteristic and its containing data to the form.
 *
 * @method populateCharacteristic
 * @param {Object} parentNode Node to append characteristic at
 * @param {Object} characteristic Object of characteristic
 * @return null
 * @for profiles
 */
function populateCharacteristic(parentNode, characteristic) {
    var currentNode = parentNode;
    var oldParentNode;
    for (var elem in characteristic) {

        if (characteristic[elem] instanceof Array) {

            if (elem === 'descriptors') {
                appendNewDivElement(parentNode, 'descriptors', 'descriptorsRoot');
                // get descriptors of parent characteristic
                var descriptors = document.getElementsByClassName('descriptorsRoot');
                oldParentNode = descriptors[descriptors.length - 1];
                for (var k = 0; k < characteristic[elem].length; k++) {
                    appendNewDivElement(oldParentNode, 'descriptor' + descriptorCount, 'descriptor');
                    parentNode = document.getElementById('descriptor' + descriptorCount);
                    descriptorCount++;
                    populateDescriptor(parentNode, characteristic[elem][k]);
                }
                descriptorRoot = oldParentNode;
            }
            else {
                createInputElement(currentNode,
                    "service[" + (serviceCount - 1) + "].characteristic[" + (characteristicCount - 1) + "]." + elem,
                    characteristic[elem]);
            }
        } else {
            console.log(descriptorRoot);
            createInputElement(currentNode,
                "service[" + (serviceCount - 1) + "].characteristic[" + (characteristicCount - 1) + "]." + elem,
                characteristic[elem]);
        }
    }
    descriptorRoot = null;
    return null;
}

/**
 * Function appends a descriptor and its containing data to the form.
 *
 * @method populateDescriptor
 * @param {Object} parentNode Node to append descriptor at
 * @param {String} descriptor Object of descriptor
 * @return null
 * @for profiles
 */
function populateDescriptor(parentNode, descriptor) {
    for (var elem in descriptor) {
        createInputElement(parentNode,
            "service[" + (serviceCount - 1) + "].characteristic[" + (characteristicCount - 1) + "].descriptor[" + (descriptorCount - 1) + "]." + elem,
            descriptor[elem]);
    }
    return null;
}

/**
 * Function creates a new div element with an id and a class.
 * The created element is appended to a parent node.
 *
 * @method appendNewDivElement
 * @param {Object} parent Parent node
 * @param {String} id Element ID
 * @param {String} name Element class
 * @for profiles
 */
function appendNewDivElement(parent, id, name) {
    var div = document.createElement("div");
    div.id = id;
    div.className = name;
    parent.appendChild(div);
}

/**
 * Function creates a label and corresponding input element to the form.
 * Label and input fields building a key value pair.
 * Depending on a condition the elements are appended to a parent node
 * or inserted before an existing element.
 *
 * @method createInputElement
 * @param {Object} parentNode Parent node
 * @param {String} key Key for the label
 * @param {String} value Value for the input field
 * @for profiles
 */
function createInputElement(parentNode, key, value) {
    console.log("Key: " + key);
    if ( (key.indexOf('__v') === -1) && ( key.indexOf('_id') === -1)) { //services' || 'characteristics' || 'descriptors')) {
        var label = document.createElement("label");
        label.innerHTML = key + ":";

        var input = document.createElement("input");
        input.name = key;
        input.value = value;
        if (descriptorRoot !== null) {
            parentNode.insertBefore(label, descriptorRoot);
            parentNode.insertBefore(input, descriptorRoot);
            parentNode.insertBefore(document.createElement('br'), descriptorRoot);
        } else {
            parentNode.appendChild(label);
            parentNode.appendChild(input);
            parentNode.appendChild(document.createElement('br'));
        }
        console.log("Appended: " + input.value);
   }
}
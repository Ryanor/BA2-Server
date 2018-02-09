/**
 * This javascript file populates the page with the current profiles stored in the database.
 *
 * @type {Array}
 */

// create empty array for the data
var profiles = [];
var start_stop;
var button;
var populate;
var form;
var serviceCount = 0;
var characteristicCount = 0;
var descriptorCount = 0;


// DOM Ready =============================================================
$(document).ready(function () {
    button = document.getElementById('simulator');
    form = document.getElementById('profile');
    populate = document.getElementById('populate');

    // Populate the existing profile table on initial page load
    populateTable();
    // check if simulator is running and switch start/stop simulator button
    checkSimulatorRunning();

    // Select profile for simulator
    $("#body").on('click', 'td a.select', selectProfile);
    // Watch profile
    $("#body").on('click', 'td a.watch', watchProfile);
    // Delete profile from database
    $("#body").on('click', 'td a.delete', deleteProfile);

});

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

function startStop() {
    if (start_stop) {
        startSimulator();
    } else {
        stopSimulator();
    }
}

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
    else {
        return false;
    }
}

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
    else {
        return false;
    }
}

// Delete profile
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
    else {
        return false;
    }
}

// save profile for next simulator start
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
    else {
        return false;
    }
}

function watchProfile(event) {
    event.preventDefault();

    removeChild(form);

    var profile = getJSONById($(this).attr('rel'));
    console.log(profile);
    populateFormFromJson(form, profile);

}

function getJSONById(id) {
    for (var i = 0; i < profiles.length; i++) {
        if (profiles[i]._id === id) {
            return profiles[i];
        }
    }
}

function removeChild(fromNode) {
    var last;
    while (last = fromNode.lastChild) {
        fromNode.removeChild(last);
    }
}

function populateFormFromJson(parentNode, jsonProfile) {

    var oldParentNode;

    for (var elem in jsonProfile) {

        if (jsonProfile[elem] instanceof Array) {

            switch (elem) {
                case 'descriptors':
                    createDivElement(parentNode, 'descriptors', 'descriptors');
                    oldParentNode = parentNode;
                    parentNode = document.getElementById('descriptors');

                    break;

                case 'characteristics':
                    createDivElement(parentNode, 'characteristics', 'characteristics');
                    oldParentNode = parentNode;
                    parentNode = document.getElementById('characteristics');

                    break;

                case 'services' :
                    createDivElement(parentNode, 'services', 'services');
                    oldParentNode = parentNode;
                    parentNode = document.getElementById('services');

                    break;

                default:
            }

            if (elem !== ('values' || 'properties')) {
                if (parentNode.id === 'services' || oldParentNode.id === 'services') {
                    createDivElement(parentNode, 'service' + serviceCount, 'service');
                    parentNode = document.getElementById('service' + serviceCount);
                    serviceCount++;
                }
                if (parentNode.id === 'characteristics' || oldParentNode.id === 'characteristics') {
                    createDivElement(parentNode, 'characteristic' + characteristicCount, 'characteristic');
                    parentNode = document.getElementById('characteristic' + characteristicCount);
                    characteristicCount++;
                }
                if (parentNode.id === 'descriptors' || oldParentNode.id === 'descriptors') {
                    createDivElement(parentNode, 'descriptor' + descriptorCount, 'descriptor');
                    parentNode = document.getElementById('descriptor' + descriptorCount);
                    descriptorCount++;
                }
            }


            for (var i = 0; i < jsonProfile[elem].length; i++) {
                populateFormFromJson(parentNode, jsonProfile[elem][i]);
                parentNode = oldParentNode;
            }

        }
        createInputElement(parentNode, elem, jsonProfile[elem]);

    }
    return null;
}

function createDivElement(parent, id, name) {
    var div = document.createElement("div");
    div.id = id;
    div.className = name;
    parent.appendChild(div);
    console.log("Appended element: " + id + " on parent node: " + parent.id);
}

function createInputElement(parentNode, key, value) {
    if (key !== ('__v' || 'services' || 'characteristics' || 'descriptors')) {
        var label = document.createElement("label");
        label.innerHTML = key + ":";
        parentNode.appendChild(label);
        var input = document.createElement("input");
        input.name = key;
        input.value = value;
        parentNode.appendChild(input);
        parentNode.appendChild(document.createElement('br'));
        //parentNode.appendChild(document.createElement('br'));
    }
}
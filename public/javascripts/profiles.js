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

    removeChilds(form);

    var profile = getJSONById($(this).attr('rel'));

    js2form(form, profile, '.', function(name, value) {
        console.log('adding field named ' + name + ' with value of ' + value);
        if(name !== '__v') {
            var label = document.createElement("label");
            label.innerHTML = name + ":";
            form.appendChild(label);
            var input = document.createElement("input");
            input.name = name;
            input.value = value;
            form.appendChild(input);
            form.appendChild(document.createElement('br'));
            form.appendChild(document.createElement('br'));
        }
    });
}

var removeChilds = function (node) {
    var last;
    while (last = node.lastChild) node.removeChild(last);
};

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

function getJSONById(id) {
    for (var i = 0; i < profiles.length; i++) {
        if (profiles[i]._id === id) {
            return profiles[i];
        }
    }
}
/**
 * This javascript file populates the page with the current profiles stored in the database.
 *
 * @type {Array}
 */

// create empty array for the data
var profiles = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    console.log("Entered profile list page on document ready function");
    populateTable();

    // Username link click
    //$('#profiles table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // Add User button click
    //$('#btnAddUser').on('click', addUser);

    //Delete profile link click
    $("#body").on('click', 'td a.delete', deleteProfile);

});

function populateTable() {
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/loadprofiles', function( data ) {

        profiles = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            console.log("Populate table with " + this._id);
            tableContent += '<tr>';
            tableContent += '<td>' + this._id + '</td>';
            tableContent += '<td><a href="#" class="delete" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $("#body").html(tableContent);
    });
}

// Delete profile
function deleteProfile(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this profile?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/deleteprofile/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
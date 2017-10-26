var service = 1;
var characteristic = 1;
var descriptor = 0;

function addService() {
    service++;
    var newFields = document.getElementById('serviceroot').cloneNode(true);
    newFields.id = '';
    newFields.style.display = 'block';
    var newField = newFields.childNodes;
    for (var i = 0; i < newField.length; i++) {
        var theName = newField[i].name;
        if (theName)
            newField[i].name = theName + service;
    }
    var insertHere = document.getElementById('serviceend');
    insertHere.parentNode.insertBefore(newFields, insertHere);
}

function addCharacteristic(context) {
    characteristic++;
    var newFields = document.getElementById('characteristicroot').cloneNode(true);
    newFields.id = '';
    newFields.style.display = 'inline';
    var newField = newFields.childNodes;
    for (var i = 0; i < newField.length; i++) {
        var theName = newField[i].name;
        if (theName)
            newField[i].name = theName + characteristic;
    }
    var insertHere = context.getElementById('characteristicend');
    insertHere.parentNode.insertBefore(newFields, insertHere);
}

function addDescriptor() {
    service++;
    var newFields = document.getElementById('serviceroot').cloneNode(true);
    newFields.id = '';
    newFields.style.display = 'block';
    var newField = newFields.childNodes;
    for (var i = 0; i < newField.length; i++) {
        var theName = newField[i].name;
        if (theName)
            newField[i].name = theName + service;
    }
    var insertHere = document.getElementById('serviceend');
    insertHere.parentNode.insertBefore(newFields, insertHere);
}

function removeService(context) {
    if (service != 1) {
        service--;
        context.parentNode.parentNode.removeChild(context.parentNode);
    }
}

function removeCharacteristic(context) {
    if(characteristic != 1) {
        characteristic--;
        context.parentNode.parentNode.removeChild(context.parentNode);
    }
}





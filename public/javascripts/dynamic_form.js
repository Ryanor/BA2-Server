var service = 1;
var characteristic = 1;
var descriptor = 0;


function addService() {
    // parent node
    var parentNode = document.getElementById("profile");
    // create new service node
    var serviceDiv = document.createElement("div");
    serviceDiv.id = "service" + service;
    serviceDiv.className = "service";

    var inputServiceUUID = document.createElement("input");
    inputServiceUUID.id = "input" + service;
    inputServiceUUID.className = "input";
    inputServiceUUID.name = "input" + service;
    inputServiceUUID.type = "service";
    inputServiceUUID.setAttribute("placeholder", "Enter Service UUID");

    var labelServiceUUID = document.createElement("label");
    labelServiceUUID.setAttribute("for","input" + service);
    labelServiceUUID.innerHTML = "Service UUID:";

    var inputAddCharacteristic = document.createElement("input");
    inputAddCharacteristic.id = "addCharacteristic" + service;
    inputAddCharacteristic.type = "button";
    inputAddCharacteristic.value = "Add Characteristic";
    inputAddCharacteristic.onclick = function() {
        addCharacteristic(serviceDiv);
    };

    var inputAddService = document.createElement("input");
    inputAddService.id = "addService" + service;
    inputAddService.type = "button";
    inputAddService.value = "Add Service";
    inputAddService.onclick = addService;

    var characteristicsBeginDiv = document.createElement("div");
    characteristicsBeginDiv.id = "characteristicsBegin" + service;
    characteristicsBeginDiv.className = "characteristic";

    var characteristicsEndDiv = document.createElement("div");
    characteristicsEndDiv.id = "characteristicsEnd" + service;
    characteristicsEndDiv.className = "characteristic";

    // append label and input field
    serviceDiv.appendChild(labelServiceUUID);
    serviceDiv.appendChild(document.createElement("br"));
    serviceDiv.appendChild(inputServiceUUID);
    serviceDiv.appendChild(document.createElement("br"));
    serviceDiv.appendChild(inputAddCharacteristic);
    serviceDiv.appendChild(characteristicsBeginDiv);
    serviceDiv.appendChild(document.createElement("br"));
    serviceDiv.appendChild(characteristicsEndDiv);
    serviceDiv.appendChild(inputAddService);

    if(service > 1 ){
        var oldService = document.getElementById("service" + (service - 1));
        var oldAddService = document.getElementById("addService" + (service - 1));
        var removeService = document.createElement("input");
        removeService.id = "removeService" + service;
        removeService.type = "button";
        removeService.value = "Remove Service";
        removeService.onclick = function() {
            parentNode.removeChild( oldService);
        };

        oldService.replaceChild(removeService, oldAddService);
    }
    // increase number of services
    service ++;
    // append service to parent
    parentNode.appendChild(serviceDiv);

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

window.onload = addService;



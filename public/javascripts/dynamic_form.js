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

    var labelService = document.createElement("label");
    labelService.innerHTML = "Service";

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
        addCharacteristic(serviceDiv.id);
    };

    var inputAddService = document.createElement("input");
    inputAddService.id = "addService" + service;
    inputAddService.type = "button";
    inputAddService.value = "Add Service";
    inputAddService.onclick = addService;

    var characteristicsDiv = document.createElement("div");
    characteristicsDiv.id = "characteristics_" + serviceDiv.id;
    characteristicsDiv.className = "characteristicRoot";

    // append label and input field
    serviceDiv.appendChild(labelService);
    serviceDiv.appendChild(labelServiceUUID);
    serviceDiv.appendChild(document.createElement("br"));
    serviceDiv.appendChild(inputServiceUUID);
    serviceDiv.appendChild(document.createElement("br"));
    serviceDiv.appendChild(inputAddCharacteristic);
    serviceDiv.appendChild(characteristicsDiv);
    serviceDiv.appendChild(document.createElement("br"));
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

function addCharacteristic(serviceID) {
    characteristic++;

    // create new characteristic node
    var characteristicDiv = document.createElement("div");
    characteristicDiv.id = "characteristic" + service + characteristic;
    characteristicDiv.className = "characteristic";

    var labelCharacteristic = document.createElement("label");
    labelCharacteristic.innerHTML = "Characteristic";

    var inputCharacteristicUUID = document.createElement("input");
    inputCharacteristicUUID.id = "input" + service + characteristic;
    inputCharacteristicUUID.className = "input";
    inputCharacteristicUUID.name = "input" + service + characteristic;
    inputCharacteristicUUID.type = "characteristic";
    inputCharacteristicUUID.setAttribute("placeholder", "Enter Characteristic UUID");

    var labelCharacteristicUUID = document.createElement("label");
    labelCharacteristicUUID.setAttribute("for","input" + service + characteristic);
    labelCharacteristicUUID.innerHTML = "Characteristic UUID:";

    var labelCharacteristicValue = document.createElement("label");
    labelCharacteristicValue.innerHTML = "Characteristic Value:";

    characteristicDiv.appendChild(labelCharacteristic);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(labelCharacteristicUUID);
//    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(inputCharacteristicUUID);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(labelCharacteristicValue);

    // add characteristic to service
    var after = document.getElementById("characteristics_" + serviceID);
    after.appendChild(characteristicDiv);
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
    var insertHere = document.getElementsByName()
    insertHere.parentNode.insertBefore(newFields, insertHere);
}

window.onload = addService;



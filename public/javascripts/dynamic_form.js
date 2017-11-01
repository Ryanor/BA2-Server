var service = 1;
var characteristic = 0;
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
    characteristicsDiv.className = "characteristicsRoot";

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

    var labelCharacteristicUUID = document.createElement("label");
    labelCharacteristicUUID.setAttribute("for","input" + service + characteristic);
    labelCharacteristicUUID.innerHTML = "Characteristic UUID:";

    var inputCharacteristicUUID = document.createElement("input");
    inputCharacteristicUUID.id = "input" + service + characteristic;
    inputCharacteristicUUID.className = "input";
    inputCharacteristicUUID.name = "input" + service + characteristic;
    inputCharacteristicUUID.type = "characteristic";
    inputCharacteristicUUID.setAttribute("placeholder", "Enter Characteristic UUID");

    var labelCharacteristicValue = document.createElement("label");
    labelCharacteristicValue.innerHTML = "Characteristic Value:";

    var descriptorsDiv = document.createElement("div");
    descriptorsDiv.id = "descriptors_" + characteristicDiv.id;
    descriptorsDiv.className = "descriptorsRoot";

    var inputAddDescriptor = document.createElement("input");
    inputAddDescriptor.id = "addDescriptor" + service + characteristic;
    inputAddDescriptor.type = "button";
    inputAddDescriptor.value = "Add Descriptor";
    inputAddDescriptor.onclick = function() {
        addDescriptor(characteristicDiv.id);
    };

    characteristicDiv.appendChild(labelCharacteristicUUID);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(inputCharacteristicUUID);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(labelCharacteristicValue);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(descriptorsDiv);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(inputAddDescriptor);

    // add characteristic to service
    var after = document.getElementById("characteristics_" + serviceID);
    after.appendChild(characteristicDiv);
}

function addDescriptor(characteristicID) {
    descriptor++;
    // create new characteristic node
    var descriptorDiv = document.createElement("div");
    descriptorDiv.id = "descriptor" + service + characteristic + descriptor;
    descriptorDiv.className = "descriptor";

    var labelDescriptorUUID = document.createElement("label");
    labelDescriptorUUID.setAttribute("for","input" + service + characteristic + descriptor);
    labelDescriptorUUID.innerHTML = "Descriptor UUID:";

    var inputDescriptorUUID = document.createElement("input");
    inputDescriptorUUID.id = "input" + service + characteristic + descriptor;
    inputDescriptorUUID.className = "input";
    inputDescriptorUUID.name = "input" + service + characteristic + descriptor;
    inputDescriptorUUID.type = "descriptor";
    inputDescriptorUUID.setAttribute("placeholder", "Enter Descriptor UUID");

    descriptorDiv.appendChild(labelDescriptorUUID);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(inputDescriptorUUID);

    // add descriptor to characteristic
    var after = document.getElementById("descriptors_" + characteristicID);
    after.appendChild(descriptorDiv);
}

window.onload = function () {
    addService();
}

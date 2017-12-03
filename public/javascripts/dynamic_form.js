var service = 1;
var characteristic = 0;
var descriptor = 0;


function convertForm() {
    var frm = document.getElementById('profile');

    var user = form2js(frm, '.', true);
    console.log(JSON.stringify(user));
}

function addService() {
    // parent node
    var parentNode = document.getElementById("services");
    // create new service, containing Characteristics
    var serviceDiv = document.createElement("div");
    serviceDiv.id = "service" + service;
    serviceDiv.className = "service";

    var labelService = document.createElement("label");
    labelService.innerHTML = "Service";

    // Service description for user, for reusing service later on
    var labelServiceDescription = document.createElement("label");
    labelServiceDescription.setAttribute("for","ServiceDescription" + service);
    labelServiceDescription.innerHTML = "Service description for reuse:";
    var inputServiceDescription = document.createElement("input");
    inputServiceDescription.id = "service_description" + service;
    inputServiceDescription.className = "input";
    inputServiceDescription.name = "service[" + service + "].description";
    inputServiceDescription.type = "service";
    inputServiceDescription.setAttribute("placeholder", "Enter description for service");

    // Service UUID
    var labelServiceUUID = document.createElement("label");
    labelServiceUUID.setAttribute("for","ServiceUUID" + service);
    labelServiceUUID.innerHTML = "Service UUID:";
    var inputServiceUUID = document.createElement("input");
    inputServiceUUID.id = "service_uuid" + service;
    inputServiceUUID.className = "input";
    inputServiceUUID.name = "service[" + service + "].uuid";
    inputServiceUUID.type = "service";
    inputServiceUUID.setAttribute("placeholder", "Enter Service UUID");

    // button to add a new characteristic
    var inputAddCharacteristic = document.createElement("input");
    inputAddCharacteristic.id = "addCharacteristic" + serviceDiv.id;
    inputAddCharacteristic.type = "button";
    inputAddCharacteristic.value = "Add Characteristic";
    inputAddCharacteristic.onclick = function() {
        addCharacteristic(serviceDiv.id);
    };

    // characteristics container of current service
    var characteristicsDiv = document.createElement("div");
    characteristicsDiv.id = "characteristics_" + serviceDiv.id;
    characteristicsDiv.className = "characteristicsRoot";

    // Remove button for the service
    var removeService = document.createElement("input");
    removeService.id = "removeService" + service;
    removeService.type = "button";
    removeService.value = "Remove Service";
    removeService.onclick = function() {
        parentNode.removeChild( serviceDiv);
    };

    // append labels, buttons and input fields
    serviceDiv.appendChild(labelService);
    serviceDiv.appendChild(document.createElement("br"));
    serviceDiv.appendChild(labelServiceDescription);
    serviceDiv.appendChild(document.createElement("br"));
    serviceDiv.appendChild(inputServiceDescription);
    serviceDiv.appendChild(document.createElement("br"));
    serviceDiv.appendChild(labelServiceUUID);
    serviceDiv.appendChild(document.createElement("br"));
    serviceDiv.appendChild(inputServiceUUID);
    serviceDiv.appendChild(document.createElement("br"));
    serviceDiv.appendChild(inputAddCharacteristic);
    serviceDiv.appendChild(document.createElement("br"));
    serviceDiv.appendChild(characteristicsDiv);
    serviceDiv.appendChild(document.createElement("br"));
    serviceDiv.appendChild(removeService);

    // increase number of services
    service ++;
    // append service to parent
    parentNode.appendChild(serviceDiv);
}

function addCharacteristic(serviceDivID) {
    characteristic++;

    // parent node
    var characteristicContainer = document.getElementById("characteristics_" + serviceDivID);

    // create new characteristic container for values, properties and descriptors
    var characteristicDiv = document.createElement("div");
    characteristicDiv.id = "characteristic" + characteristic;
    characteristicDiv.className = "characteristic";

    // Characteristic description for reuse
    var labelCharacteristicDescription = document.createElement("label");
    labelCharacteristicDescription.setAttribute("for","CharacteristicDescription" + characteristic);
    labelCharacteristicDescription.innerHTML = "Characteristic description:";
    var inputCharacteristicDescription = document.createElement("input");
    inputCharacteristicDescription.id = "characteristic_description" + characteristic;
    inputCharacteristicDescription.className = "input";
    inputCharacteristicDescription.name = "service[" + serviceDivID + "].characteristic[" + characteristic + "].description";
    inputCharacteristicDescription.type = "characteristic";
    inputCharacteristicDescription.setAttribute("placeholder", "Enter description for characteristic");

    // Characteristic UUID
    var labelCharacteristicUUID = document.createElement("label");
    labelCharacteristicUUID.setAttribute("for","CharacteristicUUID" + characteristic);
    labelCharacteristicUUID.innerHTML = "Characteristic UUID:";
    var inputCharacteristicUUID = document.createElement("input");
    inputCharacteristicUUID.id = "characteristic_uuid" + characteristic;
    inputCharacteristicUUID.className = "input";
    inputCharacteristicUUID.name = "service[" + serviceDivID + "].characteristic[" + characteristic + "].uuid";
    inputCharacteristicUUID.type = "characteristic";
    inputCharacteristicUUID.setAttribute("placeholder", "Enter Characteristic UUID");

    // Characteristic properties
    var labelCharacteristicProperty = document.createElement("label");
    labelCharacteristicProperty.innerHTML = "Characteristic properties:";
    // checkboxes for the properties
    var readCheckbox = document.createElement('input');
    readCheckbox.type = "checkbox";
    readCheckbox.name = "read";
    readCheckbox.id = "read" + characteristic;
    var writeCheckbox = document.createElement('input');
    writeCheckbox.type = "checkbox";
    writeCheckbox.name = "write";
    writeCheckbox.id = "write" + characteristic;
    var notifyCheckbox = document.createElement('input');
    notifyCheckbox.type = "checkbox";
    notifyCheckbox.name = "notify";
    notifyCheckbox.id = "notify" + characteristic;
    var readLabel = document.createElement('label');
    readLabel.setAttribute("for","read" + characteristic);
    readLabel.innerHTML = "READ";
    var writeLabel = document.createElement('label');
    writeLabel.setAttribute("for","write" + characteristic);
    writeLabel.innerHTML = "WRITE";
    var notifyLabel = document.createElement('label');
    notifyLabel.setAttribute("for","notify" + characteristic);
    notifyLabel.innerHTML = "NOTIFY";

    // button to add new Descriptor
    var inputAddDescriptor = document.createElement("input");
    inputAddDescriptor.id = "addDescriptor" + characteristic;
    inputAddDescriptor.type = "button";
    inputAddDescriptor.value = "Add Descriptor";
    inputAddDescriptor.onclick = function() {
        addDescriptor(characteristicDiv.id);
    };

    // Descriptor container
    var descriptorsDiv = document.createElement("div");
    descriptorsDiv.id = "descriptors_" + characteristicDiv.id;
    descriptorsDiv.className = "descriptorsRoot";

    // button to remove characteristic container
    var removeCharacteristic = document.createElement("input");
    removeCharacteristic.id = "removeCharacteristic" + characteristic;
    removeCharacteristic.type = "button";
    removeCharacteristic.value = "Remove Characteristic";
    removeCharacteristic.onclick = function() {
        characteristicContainer.removeChild( characteristicDiv);
    };

    // append all labels, buttons and input fields to characteristic div
    characteristicDiv.appendChild(labelCharacteristicDescription);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(inputCharacteristicDescription);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(labelCharacteristicUUID);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(inputCharacteristicUUID);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(labelCharacteristicProperty);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(readCheckbox);
    characteristicDiv.appendChild(readLabel);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(writeCheckbox);
    characteristicDiv.appendChild(writeLabel);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(notifyCheckbox);
    characteristicDiv.appendChild(notifyLabel);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(inputAddDescriptor);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(descriptorsDiv);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(removeCharacteristic);

    // add characteristic to characteristic container of service
    characteristicContainer.appendChild(characteristicDiv);
}

function addDescriptor(characteristicDivID) {
    descriptor++;

    var descriptorContainer = document.getElementById('descriptors_' + characteristicDivID);

    // create new descriptor node
    var descriptorDiv = document.createElement("div");
    descriptorDiv.id = "descriptor" + descriptor;
    descriptorDiv.className = "descriptor";

    // description for Descriptor for later reuse
    var labelDescriptorDescription = document.createElement("label");
    labelDescriptorDescription.setAttribute("for","DescriptorDescription" + descriptor);
    labelDescriptorDescription.innerHTML = "Descriptor description:";
    var inputDescriptorDescription = document.createElement("input");
    inputDescriptorDescription.id = "descriptor_description" + descriptor;
    inputDescriptorDescription.className = "input";
    inputDescriptorDescription.name = "DescriptorDescription" + descriptor;
    inputDescriptorDescription.type = "descriptor";
    inputDescriptorDescription.setAttribute("placeholder", "Enter description for Descriptor");

    //  Descriptor UUID
    var labelDescriptorUUID = document.createElement("label");
    labelDescriptorUUID.setAttribute("for","DescriptorUUID" + descriptor);
    labelDescriptorUUID.innerHTML = "Descriptor UUID:";
    var inputDescriptorUUID = document.createElement("input");
    inputDescriptorUUID.id = "descriptor_uuid" + descriptor;
    inputDescriptorUUID.className = "input";
    inputDescriptorUUID.name = "DescriptorUUID" + descriptor;
    inputDescriptorUUID.type = "descriptor";
    inputDescriptorUUID.setAttribute("placeholder", "Enter Descriptor UUID");

    //  Descriptor value
    var labelDescriptorValue = document.createElement("label");
    labelDescriptorValue.setAttribute("for","DescriptorValue" + descriptor);
    labelDescriptorValue.innerHTML = "Descriptor value:";
    var inputDescriptorValue = document.createElement("input");
    inputDescriptorValue.id = "descriptor_value" + descriptor;
    inputDescriptorValue.className = "input";
    inputDescriptorValue.name = "DescriptorValue" + descriptor;
    inputDescriptorValue.type = "descriptorValue";
    inputDescriptorValue.setAttribute("placeholder", "Enter value for descriptor");

    // button to remove descriptor container
    var removeDescriptor = document.createElement("input");
    removeDescriptor.id = "removeDescriptor" + descriptor;
    removeDescriptor.type = "button";
    removeDescriptor.value = "Remove Descriptor";
    removeDescriptor.onclick = function() {
        descriptorContainer.removeChild( descriptorDiv);
    };

    descriptorDiv.appendChild(labelDescriptorDescription);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(inputDescriptorDescription);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(labelDescriptorUUID);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(inputDescriptorUUID);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(labelDescriptorValue);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(inputDescriptorValue);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(removeDescriptor);

    // add descriptor to characteristic
    descriptorContainer.appendChild(descriptorDiv);
}

window.onload = function () {
    addService();
}
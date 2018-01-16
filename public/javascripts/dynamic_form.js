var service = 0;
var characteristic = 0;
var descriptor = 0;

function addService() {
    // parent node
    var parentNode = document.getElementById("services");
    // create new service, containing Characteristics
    var serviceDiv = document.createElement("div");
    serviceDiv.id = "service" + service;
    serviceDiv.className = "service";

    var serviceNamePrefix = "services[" + service + "]";

    var labelService = document.createElement("label");
    labelService.innerHTML = "Service";

    // Service description for user, for reusing service later on
    var labelServiceDescription = document.createElement("label");
    labelServiceDescription.setAttribute("for", "ServiceDescription" + service);
    labelServiceDescription.innerHTML = "Service name for reuse:";
    var inputServiceDescription = document.createElement("input");
    inputServiceDescription.id = "service_description" + service;
    inputServiceDescription.className = "input";
    inputServiceDescription.name = serviceNamePrefix + ".name";
    inputServiceDescription.type = "service";
    inputServiceDescription.setAttribute("placeholder", "Service name for Service");

    // Service UUID
    var labelServiceUUID = document.createElement("label");
    labelServiceUUID.setAttribute("for", "ServiceUUID" + service);
    labelServiceUUID.innerHTML = "Service UUID:";
    var inputServiceUUID = document.createElement("input");
    inputServiceUUID.id = "service_uuid" + service;
    inputServiceUUID.className = "input";
    inputServiceUUID.name = serviceNamePrefix + ".uuid";
    inputServiceUUID.type = "service";
    inputServiceUUID.setAttribute("placeholder", "Enter Service UUID");

    // button to add a new characteristic
    var inputAddCharacteristic = document.createElement("button");
    inputAddCharacteristic.id = "addCharacteristic" + serviceDiv.id;
    inputAddCharacteristic.type = "button";
    inputAddCharacteristic.textContent = "Add Characteristic";
    inputAddCharacteristic.onclick = function () {
        addCharacteristic(serviceDiv.id);
    };

    // characteristics container of current service
    var characteristicsDiv = document.createElement("div");
    characteristicsDiv.id = "characteristics_" + serviceDiv.id;
    characteristicsDiv.className = "characteristicsRoot";

    // Remove button for the service
    var removeService = document.createElement("button");
    removeService.id = "removeService" + service;
    removeService.type = "button";
    removeService.textContent = "Remove Service";
    removeService.onclick = function () {
        parentNode.removeChild(serviceDiv);
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
    service++;
    // append service to parent
    parentNode.appendChild(serviceDiv);
}


function addCharacteristic(serviceDivID) {

    var serviceNumber = retnum(serviceDivID);

    var characteristicNamePrefix = "services[" + serviceNumber + "].characteristics[" + characteristic + "]";

    // parent node
    var characteristicContainer = document.getElementById("characteristics_service" + serviceNumber);

    // create new characteristic container for values, properties and descriptors
    var characteristicDiv = document.createElement("div");
    characteristicDiv.id = "characteristic" + characteristic;
    characteristicDiv.className = "characteristic";

    // Characteristic description for reuse
    var labelCharacteristicDescription = document.createElement("label");
    labelCharacteristicDescription.setAttribute("for", "CharacteristicDescription" + characteristic);
    labelCharacteristicDescription.innerHTML = "Characteristic description:";
    var inputCharacteristicDescription = document.createElement("input");
    inputCharacteristicDescription.id = "characteristic_description" + characteristic;
    inputCharacteristicDescription.className = "input";
    inputCharacteristicDescription.name = characteristicNamePrefix + ".name";
    inputCharacteristicDescription.type = "characteristic";
    inputCharacteristicDescription.setAttribute("placeholder", "Enter name for characteristic");

    // Characteristic UUID
    var labelCharacteristicUUID = document.createElement("label");
    labelCharacteristicUUID.setAttribute("for", "CharacteristicUUID" + characteristic);
    labelCharacteristicUUID.innerHTML = "Characteristic UUID:";
    var inputCharacteristicUUID = document.createElement("input");
    inputCharacteristicUUID.id = "characteristic_uuid" + characteristic;
    inputCharacteristicUUID.className = "input";
    inputCharacteristicUUID.name = characteristicNamePrefix + ".uuid";
    inputCharacteristicUUID.type = "characteristic";
    inputCharacteristicUUID.setAttribute("placeholder", "Enter Characteristic UUID");

    // Checkboxes for different characteristic types
    var labelCharacteristicType = document.createElement("label");
    labelCharacteristicType.innerHTML = "Type of characteristic:";
    // Characteristic type checkboxes
    var arrayRadioButton = document.createElement('input');
    arrayRadioButton.type = "radio";
    arrayRadioButton.name = characteristicNamePrefix + ".type";
    arrayRadioButton.value = "array";
    arrayRadioButton.id = "array" + characteristic;
    arrayRadioButton.onclick = function () {

        characteristicValuesArrayLabel.style.display = 'inline';
        characteristicValuesArrayLabel.style.visibility = '';
        characteristicValuesArray.style.display = 'inline';
        characteristicValuesArray.style.visibility = '';

        characteristicBaseValueLabel.style.display = 'none';
        characteristicBaseValueLabel.style.visibility = 'hidden';
        characteristicBaseValue.style.display = 'none';
        characteristicBaseValue.style.visibility = 'hidden';
        characteristicMinValueLabel.style.display = 'none';
        characteristicMinValueLabel.style.visibility = 'hidden';
        characteristicMinValue.style.display = 'none';
        characteristicMinValue.style.visibility = 'hidden';
        characteristicMaxValueLabel.style.display = 'none';
        characteristicMaxValueLabel.style.visibility = 'hidden';
        characteristicMaxValue.style.display = 'none';
        characteristicMaxValue.style.visibility = 'hidden';
    };

    var rangeRadioButton = document.createElement('input');
    rangeRadioButton.setAttribute('type', 'radio');
    rangeRadioButton.setAttribute('name', characteristicNamePrefix + ".type");
    rangeRadioButton.setAttribute('value', "range");
    rangeRadioButton.id = "range" + characteristic;
    rangeRadioButton.onclick = function () {

        characteristicValuesArrayLabel.style.display = 'none';
        characteristicValuesArrayLabel.style.visibility = 'hidden';
        characteristicValuesArray.style.display = 'none';
        characteristicValuesArray.style.visibility = 'hidden';
        characteristicBaseValueLabel.style.display = 'none';
        characteristicBaseValueLabel.style.visibility = 'hidden';
        characteristicBaseValue.style.display = 'none';
        characteristicBaseValue.style.visibility = 'hidden';

        characteristicMinValueLabel.style.display = 'inline';
        characteristicMinValueLabel.style.visibility = '';
        characteristicMinValue.style.display = 'inline';
        characteristicMinValue.style.visibility = '';
        characteristicMaxValueLabel.style.display = 'inline';
        characteristicMaxValueLabel.style.visibility = '';
        characteristicMaxValue.style.display = 'inline';
        characteristicMaxValue.style.visibility = '';
    };

    var baseRadioButton = document.createElement('input');
    baseRadioButton.type = "radio";
    baseRadioButton.name = characteristicNamePrefix + ".type";
    baseRadioButton.value = "base";
    baseRadioButton.id = "basetype" + characteristic;
    baseRadioButton.onclick = function () {

        characteristicValuesArrayLabel.style.display = 'none';
        characteristicValuesArrayLabel.style.visibility = 'hidden';
        characteristicValuesArray.style.display = 'none';
        characteristicValuesArray.style.visibility = 'hidden';

        characteristicBaseValueLabel.style.display = 'inline';
        characteristicBaseValueLabel.style.visibility = '';
        characteristicBaseValue.style.display = 'inline';
        characteristicBaseValue.style.visibility = '';
        characteristicMinValueLabel.style.display = 'inline';
        characteristicMinValueLabel.style.visibility = '';
        characteristicMinValue.style.display = 'inline';
        characteristicMinValue.style.visibility = '';
        characteristicMaxValueLabel.style.display = 'inline';
        characteristicMaxValueLabel.style.visibility = '';
        characteristicMaxValue.style.display = 'inline';
        characteristicMaxValue.style.visibility = '';
    };

    var arrayRadioLabel = document.createElement('label');
    arrayRadioLabel.setAttribute("for", "array" + characteristic);
    arrayRadioLabel.innerHTML = "ARRAY";
    var rangeRadioLabel = document.createElement('label');
    rangeRadioLabel.setAttribute("for", "range" + characteristic);
    rangeRadioLabel.innerHTML = "RANGE";
    var baseRadioLabel = document.createElement('label');
    baseRadioLabel.setAttribute("for", "base" + characteristic);
    baseRadioLabel.innerHTML = "BASE";

    // Characteristic properties
    var labelCharacteristicProperty = document.createElement("label");
    labelCharacteristicProperty.innerHTML = "Characteristic properties:";
    // checkboxes for the properties
    var readCheckbox = document.createElement('input');
    readCheckbox.type = "checkbox";
    readCheckbox.name = characteristicNamePrefix + ".properties[]";
    readCheckbox.value = "read";
    readCheckbox.id = "read" + characteristic;
    var writeCheckbox = document.createElement('input');
    writeCheckbox.type = "checkbox";
    writeCheckbox.name = characteristicNamePrefix + ".properties[]";
    writeCheckbox.value = "write";
    writeCheckbox.id = "write" + characteristic;
    var notifyCheckbox = document.createElement('input');
    notifyCheckbox.type = "checkbox";
    notifyCheckbox.name = characteristicNamePrefix + ".properties[]";
    notifyCheckbox.value = "notify";
    notifyCheckbox.id = "notify" + characteristic;
    var readLabel = document.createElement('label');
    readLabel.setAttribute("for", "read" + characteristic);
    readLabel.innerHTML = "READ";
    var writeLabel = document.createElement('label');
    writeLabel.setAttribute("for", "write" + characteristic);
    writeLabel.innerHTML = "WRITE";
    var notifyLabel = document.createElement('label');
    notifyLabel.setAttribute("for", "notify" + characteristic);
    notifyLabel.innerHTML = "NOTIFY";

    // Characteristic value
    var characteristicValueLabel = document.createElement('label');
    characteristicValueLabel.setAttribute("for", "value" + characteristic);
    characteristicValueLabel.innerHTML = "Value:";
    var characteristicValue = document.createElement('input');
    characteristicValue.id = 'value' + characteristic;
    characteristicValue.name = characteristicNamePrefix + ".value";
    characteristicValue.className = "input";

    // Characteristic data type
    var characteristicDataTypeLabel = document.createElement('label');
    characteristicDataTypeLabel.setAttribute("for", "datatype" + characteristic);
    characteristicDataTypeLabel.innerHTML = "Type of value data:";
    var characteristicDataType = document.createElement('input');
    characteristicDataType.id = 'datatype' + characteristic;
    characteristicDataType.name = characteristicNamePrefix + ".datatype";
    characteristicDataType.className = "input";

    // Characteristic precision
    var characteristicOffsetLabel = document.createElement('label');
    characteristicOffsetLabel.setAttribute("for", "offset" + characteristic);
    characteristicOffsetLabel.innerHTML = "Offset:";
    var characteristicOffset = document.createElement('input');
    characteristicOffset.id = 'offset' + characteristic;
    characteristicOffset.name = characteristicNamePrefix + ".offset";
    characteristicOffset.className = "input";

    // Characteristic interval
    var characteristicIntervalLabel = document.createElement('label');
    characteristicIntervalLabel.setAttribute("for", "interval" + characteristic);
    characteristicIntervalLabel.innerHTML = "Interval:";
    var characteristicInterval = document.createElement('input');
    characteristicInterval.id = 'interval' + characteristic;
    characteristicInterval.name = characteristicNamePrefix + ".interval";
    characteristicInterval.className = "input";

    // Characteristic values array
    var characteristicValuesArrayLabel = document.createElement('label');
    characteristicValuesArrayLabel.setAttribute("for", "values" + characteristic);
    characteristicValuesArrayLabel.innerHTML = "Array of values:";
    var characteristicValuesArray = document.createElement('input');
    characteristicValuesArray.id = 'values' + characteristic;
    characteristicValuesArray.name = characteristicNamePrefix + ".values";
    characteristicValuesArray.className = "input";

    // Characteristic base value for random stepping values
    var characteristicBaseValueLabel = document.createElement('label');
    characteristicBaseValueLabel.setAttribute("for", "base" + characteristic);
    characteristicBaseValueLabel.innerHTML = "Base value:";
    var characteristicBaseValue = document.createElement('input');
    characteristicBaseValue.id = 'base' + characteristic;
    characteristicBaseValue.name = characteristicNamePrefix + ".base";
    characteristicBaseValue.className = "input";

    // Characteristic min value for range or step
    var characteristicMinValueLabel = document.createElement('label');
    characteristicMinValueLabel.setAttribute("for", "min" + characteristic);
    characteristicMinValueLabel.innerHTML = "Minimum value:";
    var characteristicMinValue = document.createElement('input');
    characteristicMinValue.id = 'min' + characteristic;
    characteristicMinValue.name = characteristicNamePrefix + ".min";
    characteristicMinValue.className = "input";

    // Characteristic max value for range or step
    var characteristicMaxValueLabel = document.createElement('label');
    characteristicMaxValueLabel.setAttribute("for", "max" + characteristic);
    characteristicMaxValueLabel.innerHTML = "Maximum value:";
    var characteristicMaxValue = document.createElement('input');
    characteristicMaxValue.id = 'max' + characteristic;
    characteristicMaxValue.name = characteristicNamePrefix + ".max";
    characteristicMaxValue.className = "input";

    // button to add new Descriptor
    var inputAddDescriptor = document.createElement("button");
    inputAddDescriptor.id = "addDescriptor" + characteristic;
    inputAddDescriptor.type = "button";
    inputAddDescriptor.textContent = "Add Descriptor";
    inputAddDescriptor.onclick = function () {
        addDescriptor(serviceDivID, characteristicDiv.id);
    };

    // Descriptor container
    var descriptorsDiv = document.createElement("div");
    descriptorsDiv.id = "descriptors_" + characteristicDiv.id;
    descriptorsDiv.className = "descriptorsRoot";

    // button to remove characteristic container
    var removeCharacteristic = document.createElement("button");
    removeCharacteristic.id = "removeCharacteristic" + characteristic;
    removeCharacteristic.type = "button";
    removeCharacteristic.textContent = "Remove Characteristic";
    removeCharacteristic.onclick = function () {
        characteristicContainer.removeChild(characteristicDiv);
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

    // additional characteristic input fields to differ which kind of characteristic is used
    characteristicDiv.appendChild(characteristicValueLabel);
    characteristicDiv.appendChild(characteristicValue);
    characteristicDiv.appendChild(document.createElement("br"));


    characteristicDiv.appendChild(labelCharacteristicType);
    characteristicDiv.appendChild(document.createElement("br"));

    characteristicDiv.appendChild(arrayRadioLabel);
    characteristicDiv.appendChild(arrayRadioButton);

    characteristicDiv.appendChild(rangeRadioLabel);
    characteristicDiv.appendChild(rangeRadioButton);

    characteristicDiv.appendChild(baseRadioLabel);
    characteristicDiv.appendChild(baseRadioButton);
    characteristicDiv.appendChild(document.createElement("br"));

    characteristicDiv.appendChild(characteristicDataTypeLabel);
    characteristicDiv.appendChild(characteristicDataType);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(characteristicIntervalLabel);
    characteristicDiv.appendChild(characteristicInterval);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(characteristicOffsetLabel);
    characteristicDiv.appendChild(characteristicOffset);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(characteristicValuesArrayLabel);
    characteristicDiv.appendChild(characteristicValuesArray);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(characteristicBaseValueLabel);
    characteristicDiv.appendChild(characteristicBaseValue);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(characteristicMinValueLabel);
    characteristicDiv.appendChild(characteristicMinValue);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(characteristicMaxValueLabel);
    characteristicDiv.appendChild(characteristicMaxValue);
    characteristicDiv.appendChild(document.createElement("br"));

    characteristicDiv.appendChild(inputAddDescriptor);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(descriptorsDiv);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(removeCharacteristic);

    characteristic++;

    // add characteristic to characteristic container of service
    characteristicContainer.appendChild(characteristicDiv);
}

function addDescriptor(serviceDivID, characteristicDivID) {

    var descriptorContainer = document.getElementById('descriptors_' + characteristicDivID);

    var serviceNumber = retnum(serviceDivID);
    var characteristicNumber = retnum(characteristicDivID);

    var descriptorNamePrefix = "services[" + serviceNumber + "].characteristics[" + characteristicNumber + "].descriptors[" + descriptor + "]";

    // create new descriptor node
    var descriptorDiv = document.createElement("div");
    descriptorDiv.id = "descriptor" + descriptor;
    descriptorDiv.className = "descriptor";

    // description for Descriptor for later reuse
    var labelDescriptorDescription = document.createElement("label");
    labelDescriptorDescription.setAttribute("for", "DescriptorDescription" + descriptor);
    labelDescriptorDescription.innerHTML = "Descriptor name:";
    var inputDescriptorDescription = document.createElement("input");
    inputDescriptorDescription.id = "descriptor_name" + descriptor;
    inputDescriptorDescription.className = "input";
    inputDescriptorDescription.name = descriptorNamePrefix + ".name";
    //inputDescriptorDescription.type = "descriptor";
    inputDescriptorDescription.setAttribute("placeholder", "Enter Descriptor name");

    //  Descriptor UUID
    var labelDescriptorUUID = document.createElement("label");
    labelDescriptorUUID.setAttribute("for", "DescriptorUUID" + descriptor);
    labelDescriptorUUID.innerHTML = "Descriptor UUID:";
    var inputDescriptorUUID = document.createElement("input");
    inputDescriptorUUID.id = "descriptor_uuid" + descriptor;
    inputDescriptorUUID.className = "input";
    inputDescriptorUUID.name = descriptorNamePrefix + ".uuid";
    //inputDescriptorUUID.type = "descriptor";
    inputDescriptorUUID.setAttribute("placeholder", "Enter Descriptor UUID");

    // value data type
    var labelDescriptorValueType = document.createElement("label");
    labelDescriptorValueType.innerHTML = "Value type:";
    // radio buttons for the value data type
    var stringRadioButton = document.createElement('input');
    stringRadioButton.type = "radio";
    stringRadioButton.name = descriptorNamePrefix + ".datatype";
    stringRadioButton.value = "string";
    stringRadioButton.id = "descriptor_datatype_string" + descriptor;

    var bufferRadioButton = document.createElement('input');
    bufferRadioButton.type = "radio";
    bufferRadioButton.name = descriptorNamePrefix + ".datatype";
    bufferRadioButton.value = "buffer";
    bufferRadioButton.id = "descriptor_datatype_buffer" + descriptor;

    var stringRadioButtonLabel = document.createElement('label');
    stringRadioButtonLabel.setAttribute("for", "descriptor_datatype_string" + descriptor);
    stringRadioButtonLabel.innerHTML = "STRING";
    var bufferRadioButtonLabel = document.createElement('label');
    bufferRadioButtonLabel.setAttribute("for", "descriptor_datatype_buffer" + descriptor);
    bufferRadioButtonLabel.innerHTML = "BUFFER";

    //  Descriptor value
    var labelDescriptorValue = document.createElement("label");
    labelDescriptorValue.setAttribute("for", "DescriptorValue" + descriptor);
    labelDescriptorValue.innerHTML = "Descriptor value:";
    var inputDescriptorValue = document.createElement("input");
    inputDescriptorValue.id = "descriptor_value" + descriptor;
    inputDescriptorValue.className = "input";
    inputDescriptorValue.name = descriptorNamePrefix + ".value";
    //inputDescriptorValue.type = "descriptorValue";
    inputDescriptorValue.setAttribute("placeholder", "Enter value for descriptor");

    // button to remove descriptor container
    var removeDescriptor = document.createElement("button");
    removeDescriptor.id = "removeDescriptor" + descriptor;
    removeDescriptor.type = "button";
    removeDescriptor.textContent = "Remove Descriptor";
    removeDescriptor.onclick = function () {
        descriptorContainer.removeChild(descriptorDiv);
    };

    descriptorDiv.appendChild(labelDescriptorDescription);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(inputDescriptorDescription);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(labelDescriptorUUID);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(inputDescriptorUUID);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(labelDescriptorValueType);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(stringRadioButtonLabel);
    descriptorDiv.appendChild(stringRadioButton);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(bufferRadioButtonLabel);
    descriptorDiv.appendChild(bufferRadioButton);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(labelDescriptorValue);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(inputDescriptorValue);
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(document.createElement("br"));
    descriptorDiv.appendChild(removeDescriptor);

    descriptor++;

    // add descriptor to characteristic
    descriptorContainer.appendChild(descriptorDiv);
}

/*
function showCharacteristicTypeArray(characteristicDiv) {

}

function showCharacteristicTypeRange(characteristicDiv) {

}

function showCharacteristicTypeBase(characteristicDiv) {

}
*/
function retnum(str) {

    return str.replace(/[^0-9]/g, '');
}

function convertForm() {
    var data = form2js('profile', '.', true);
    console.log(JSON.stringify(data));
    transferData(data);
}

function transferData(data) {
    var xhr = new XMLHttpRequest();

    //Call a function when the state changes.
    xhr.onreadystatechange = function() {
        console.log(xhr.readyState);
        console.log(xhr.status);
        if(xhr.readyState === 4 && xhr.status === 200) {
            // Request finished. Do processing here.

            alert(xhr.responseText + "   ...redirecting to start page");

            document.location.href = '/';
        }
        if(xhr.readyState === 4 && xhr.status === 500) {
            alert(xhr.responseText + "   ...redirecting to start page");
            document.location.href = '/';
        }
    };
    xhr.open("POST", "/profile", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(xhr.readyState);
    console.log(xhr.status);
    xhr.send(JSON.stringify(data));
}

window.onload = function () {
    addService();
};
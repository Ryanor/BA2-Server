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

    // Checkboxes for different characteristic types
    var labelCharacteristicType = document.createElement("label");
    labelCharacteristicType.innerHTML = "Type of characteristic:";
    // Characteristic type checkboxes
    var arrayRadioButton = document.createElement('input');
    arrayRadioButton.type = "radio";
    arrayRadioButton .name = "array";
    arrayRadioButton.id = "array" + characteristic;
    arrayRadioButton.onclick = function () {
        rangeRadioButton.checked = false;
        baseRadioButton.checked = false;

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
    rangeRadioButton.type = "radio";
    rangeRadioButton.name = "range";
    rangeRadioButton.id = "range" + characteristic;
    rangeRadioButton.onclick = function () {
        arrayRadioButton.checked = false;
        baseRadioButton.checked = false;

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
    baseRadioButton.name = "base";
    baseRadioButton.id = "base" + characteristic;
    baseRadioButton.onclick = function () {
        arrayRadioButton.checked = false;
        rangeRadioButton.checked = false;

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
    arrayRadioLabel.setAttribute("for","array" + characteristic);
    arrayRadioLabel.innerHTML = "ARRAY";
    var rangeRadioLabel = document.createElement('label');
    rangeRadioLabel.setAttribute("for","range" + characteristic);
    rangeRadioLabel.innerHTML = "RANGE";
    var baseRadioLabel = document.createElement('label');
    baseRadioLabel.setAttribute("for","base" + characteristic);
    baseRadioLabel.innerHTML = "BASE";

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

    // Characteristic value
    var characteristicValueLabel = document.createElement('label');
    characteristicValueLabel.setAttribute("for","value" + characteristic);
    characteristicValueLabel.innerHTML = "Value:";
    var characteristicValue = document.createElement('input');
    characteristicValue.id = 'value' + characteristic;
    characteristicValue.name = "value";
    characteristicValue.className = "input";

    // Characteristic data type
    var characteristicDataTypeLabel = document.createElement('label');
    characteristicDataTypeLabel.setAttribute("for","type" + characteristic);
    characteristicDataTypeLabel.innerHTML = "Data type:";
    var characteristicDataType = document.createElement('input');
    characteristicDataType.id = 'type' + characteristic;
    characteristicDataType.name = "type";
    characteristicDataType.className = "input";

    // Characteristic precision
    var characteristicPrecisionLabel = document.createElement('label');
    characteristicPrecisionLabel.setAttribute("for","type" + characteristic);
    characteristicPrecisionLabel.innerHTML = "Precision:";
    var characteristicPrecision = document.createElement('input');
    characteristicPrecision.id = 'precision' + characteristic;
    characteristicPrecision.name = "precision";
    characteristicPrecision.className = "input";

    // Characteristic interval
    var characteristicIntervalLabel = document.createElement('label');
    characteristicIntervalLabel.setAttribute("for","type" + characteristic);
    characteristicIntervalLabel.innerHTML = "Interval:";
    var characteristicInterval = document.createElement('input');
    characteristicInterval.id = 'interval' + characteristic;
    characteristicInterval.name = "interval";
    characteristicInterval.className = "input";

    // Characteristic values array
    var characteristicValuesArrayLabel = document.createElement('label');
    characteristicValuesArrayLabel.setAttribute("for","values" + characteristic);
    characteristicValuesArrayLabel.innerHTML = "Array of values:";
    var characteristicValuesArray = document.createElement('input');
    characteristicValuesArray.id = 'values' + characteristic;
    characteristicValuesArray.name = "values";
    characteristicValuesArray.className = "input";

    // Characteristic base value for random stepping values
    var characteristicBaseValueLabel = document.createElement('label');
    characteristicBaseValueLabel.setAttribute("for","base" + characteristic);
    characteristicBaseValueLabel.innerHTML = "Base value:";
    var characteristicBaseValue = document.createElement('input');
    characteristicBaseValue.id = 'base' + characteristic;
    characteristicBaseValue.name = "base";
    characteristicBaseValue.className = "input";

    // Characteristic min value for range or step
    var characteristicMinValueLabel = document.createElement('label');
    characteristicMinValueLabel.setAttribute("for","min" + characteristic);
    characteristicMinValueLabel.innerHTML = "Minimum value:";
    var characteristicMinValue = document.createElement('input');
    characteristicMinValue.id = 'min' + characteristic;
    characteristicMinValue.name = "min";
    characteristicMinValue.className = "input";

    // Characteristic max value for range or step
    var characteristicMaxValueLabel = document.createElement('label');
    characteristicMaxValueLabel.setAttribute("for","max" + characteristic);
    characteristicMaxValueLabel.innerHTML = "Maximum value:";
    var characteristicMaxValue = document.createElement('input');
    characteristicMaxValue.id = 'max' + characteristic;
    characteristicMaxValue.name = "max";
    characteristicMaxValue.className = "input";

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

    characteristicDiv.appendChild(labelCharacteristicType);
    characteristicDiv.appendChild(document.createElement("br"));

    characteristicDiv.appendChild(arrayRadioLabel);
    characteristicDiv.appendChild(arrayRadioButton);

    characteristicDiv.appendChild(rangeRadioLabel);
    characteristicDiv.appendChild(rangeRadioButton);

    characteristicDiv.appendChild(baseRadioLabel);
    characteristicDiv.appendChild(baseRadioButton);
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

    characteristicDiv.appendChild(characteristicValueLabel);
    characteristicDiv.appendChild(characteristicValue);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(characteristicDataTypeLabel);
    characteristicDiv.appendChild(characteristicDataType);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(characteristicIntervalLabel);
    characteristicDiv.appendChild(characteristicInterval);
    characteristicDiv.appendChild(document.createElement("br"));
    characteristicDiv.appendChild(characteristicPrecisionLabel);
    characteristicDiv.appendChild(characteristicPrecision);
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

/*
function showCharacteristicTypeArray(characteristicDiv) {

}

function showCharacteristicTypeRange(characteristicDiv) {

}

function showCharacteristicTypeBase(characteristicDiv) {

}
*/

window.onload = function () {
    addService();
}
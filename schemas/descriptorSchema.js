/**
 * Schema for the Descriptor database model.
 * Used to store descriptor data into the database collection as correct schema.
 * @type {*|Mongoose}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Descriptor schema containing data for
 * uuid, value, name and data of types defined in the exchange format.
 */
var descriptorSchema = new Schema({
    // values defined and used by the the SIG standard
    uuid : String,
    value : String,

    // extra values defined for the exchange format
    name : String,
    datatype : {type:String, enum : ["string", "bytes"]}
});

// Export model as Mongoose Schema
module.exports = mongoose.model('Descriptor', descriptorSchema);
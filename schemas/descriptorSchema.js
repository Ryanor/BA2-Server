/**
 * Schema for the Descriptor database model.
 * Used to store descriptor data into the database collection as correct schema.
 *
 * @class descriptorSchema
 * @type Mongoose Schema
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Descriptor schema used to store descriptor data in form of the exchange format.
 * Fields defined by the SIG standard:
 * uuid and value
 *
 * Additional fields:
 * name and datatype of value
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
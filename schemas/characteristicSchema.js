/**
 * Schema for the Characteristic database model.
 * Used to store characteristic data into the database collection as correct schema.
 * @type {*|Mongoose}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Descriptor = require('./descriptorSchema');
var descriptorSchema = mongoose.model('Descriptor').schema;

/**
 * Characteristic schema containing data for:
 * uuid, value, properties and descriptors array of types defined by the SIG standard
 * and additional fields:
 * name, data type, offset, interval, array of values, base, min and max value of the exchange format.
 */
var characteristicSchema = new Schema({
    // values defined and used by the the SIG standard
    uuid : String,
    value : {type : Schema.Types.Mixed, default: null },
    properties : {type : [String], enum : ['read','write','notify']},
    descriptors : [descriptorSchema],

    // extra values defined for the exchange format
    name : String,
    datatype : String,
    offset : {type : Number, default : 0},
    interval : {type : Number, default : 1000},
    values : [Schema.Types.Mixed],
    base : {type : Number, default : 0},
    min : {type : Number, default : 0},
    max : {type : Number, default : 0}
});

// Export model as Mongoose Schema
module.exports = mongoose.model('Characteristic', characteristicSchema);
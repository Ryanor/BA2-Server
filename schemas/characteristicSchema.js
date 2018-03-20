/**
 * Schema for the Characteristic database model.
 * Used to store a characteristic and its containing descriptors into the database collection as correct schema.
 *
 * @class characteristicSchema
 * @type Mongoose Schema
 * @constructor characteristicSchema
 * @uses descriptorSchema
 *
 * @author gwu
 * @version 1.0
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Descriptor = require('./descriptorSchema');
var descriptorSchema = mongoose.model('Descriptor').schema;

/**
 * Characteristic schema used to store characteristic data in form of the exchange format.
 * Fields defined by the SIG standard:
 * uuid, value, properties and descriptors array of types defined by the SIG standard
 *
 * Additional fields:
 * name, datatype of value, offset, interval, array of values, base, min and max value for random numbers
 */
var characteristicSchema = new Schema({
    // values defined and used by the the SIG standard
    uuid : String,
    value : {type : Number, default: null },
    properties : {type : [String], enum : ['read','write','notify']},
    descriptors : [descriptorSchema],

    // extra values defined for the exchange format
    name : String,
    characteristicType : String,
    datatype : String,
    offset : {type : Number, default : 0},
    interval : {type : Number, default : 1000},
    values : [Number],
    base : {type : Number, default : 0},
    min : {type : Number, default : 0},
    max : {type : Number, default : 0}
});

// Export model as Mongoose Schema
module.exports = mongoose.model('Characteristic', characteristicSchema);
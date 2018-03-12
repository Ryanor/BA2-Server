/**
 * Schema for the Service database model.
 * Used to store a service and its containing characteristics into the database collection.
 *
 * @class serviceSchema
 * @type Mongoose Schema
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Characteristic = require('./characteristicSchema');
var characteristicSchema = mongoose.model('Characteristic').schema;

/**
 * Service schema used to store service data in form of the exchange format.
 * Fields defined by the SIG standard:
 * uuid, array of characteristics
 *
 * Additional fields:
 * name
 */
var serviceSchema = new Schema({
    // values defined and used by the the SIG standard
    uuid : String,
    characteristics : [characteristicSchema],

    // extra values defined for the exchange format
    name : String
});

// Export model as Mongoose Schema
module.exports = mongoose.model('Service', serviceSchema);
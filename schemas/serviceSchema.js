/**
 * Schema for the Service database model.
 * Used to store a service an its containing characteristics into the database collection.
 * @type {*|Mongoose}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var characteristicSchema = mongoose.model('characteristicSchema');

/**
 * Service schema containing data for
 * uuid, characteristics array and name of types defined in the exchange format.
 */
var serviceSchema = new Schema({
    // values defined and used by the the SIG standard
    uuid : String,
    characteristics : [characteristicSchema],

    // extra values defined for the exchange format
    name : String
});

// Export model as Mongoose Schema
module.exports = mongoose.model('serviceSchema', serviceSchema);
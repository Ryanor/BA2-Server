/**
 * Schema for the Profile database model.
 * Used to store a profile and its containing array of services to the database collection as correct schema.
 *
 * @class profileSchema
 * @type Mongoose Schema
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Service = require('./serviceSchema');
var serviceSchema = mongoose.model('Service').schema;


/**
 * Profile schema used to store profile data in form of the exchange format.
 * Fields defined by the SIG standard:
 * array of services
 *
 * Additional fields:
 * name
 */
var profileSchema = new Schema({
    services : [serviceSchema],
    name : { type : String, default : null }
});

// Export model as Mongoose Schema
module.exports = mongoose.model('Profile', profileSchema);

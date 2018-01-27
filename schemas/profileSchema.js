/**
 * Schema for the Profile database model.
 * Used to store an array of services to the database collection as correct schema.
 * @type {*|Mongoose}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Service = require('./serviceSchema');
var serviceSchema = mongoose.model('Service').schema;


/**
 * Profile schema containing data for an array of services
 * Each service can contains its own characteristics and their descriptors
 */
var profileSchema = new Schema({
    services : [serviceSchema]
});

// Export model as Mongoose Schema
module.exports = mongoose.model('Profile', profileSchema);

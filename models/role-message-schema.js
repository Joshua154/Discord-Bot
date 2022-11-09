const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const schema = new mongoose.Schema({
    _id: reqString, //Guild ID
    channelId: reqString,
    messageId: reqString,
});

const name = 'button-roles'

module.exports = mongoose.models[name] || mongoose.model(name, schema, name)
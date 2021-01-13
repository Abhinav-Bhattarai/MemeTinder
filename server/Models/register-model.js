import mongoose from 'mongoose';

const SchemaObject = mongoose.Schema

const Schema = new SchemaObject({
    Username: {
        type: String,
        required: true
    },
    
    Email: {
        type: String,
        required: true
    },

    CreationDate: {
        type: String,
        default: `${new Date(parseInt(Date.now())).toLocaleDateString()}`
    },
    
    Password: {
        type: String,
        required: true
    }, 

    ProfilePicture: {
        type: String,
        data: Buffer,
        default: ''
    },
    
    Gender: {
        type: String,
        required: true
    },

    ActiveStatus: {
        type: Boolean,
        default: true
    },
    
    AccountConfirmed: {
        type: Boolean,
        default: false
    },

    MainPost: {
        type: String,
        data: Buffer,
        default: ''
    },

    Requests: {
        type: [
            {sender: String, ProfilePicture: {type: String, data: Buffer}}
            ],
        default: []
    },

    ReactedProfiles: {
        type: [String],
        default: []
    },
    
    Notification: {
        type: [{sender: String, ProfilePicture: {
            type: String,
            data: Buffer
        }}],
        default: []
    }

})

const RegistrationModel = mongoose.model('Registrations', Schema);

export default RegistrationModel
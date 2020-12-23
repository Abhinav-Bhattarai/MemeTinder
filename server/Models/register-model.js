import mongoose from 'mongoose';

const SchemaObject = mongoose.Schema

const Schema = new SchemaObject({
    username: {
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
        data: Buffer
    },
    
    Gender: {
        type: String,
        required: true
    }

})

const RegistrationModel = mongoose.model('Registrations', Schema);

export default RegistrationModel
import mongoose from 'mongoose';

const SchemaObject = mongoose.Schema;

const Schema = new SchemaObject({
    Username: {
        type: String,
        required: true
    },

    Matches: {
        type: [{ 
            username: String, 
            Profile_Picture: {type: String, data: Buffer},
            Messages: {
                type: [{data: String, self: Boolean, Date: String}],
                default: []
            },
            LastInteraction: {
                type: String,
                default: Date.now()
            }
        }],
        default: []
    }
});

const UserModel = mongoose.model('Messages', Schema);

export default UserModel;
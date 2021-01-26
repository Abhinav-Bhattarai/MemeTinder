import mongoose from  'mongoose';

const SchemaObj = mongoose.Schema;
const Schema = new SchemaObj({
    Emails: {
        type: [String],
        default: []
    }
});

const MobileRegistrationModel = mongoose.model("Mobile-Registrations", Schema);
export default MobileRegistrationModel;
const {Schema,model} = require('mongoose');

const applicationSchema = new Schema({
    company : { type : String , required: true},
    role : { type : String, required: true},
    status : { 
        type: String,
        enum: ['Applied','Interview','Offer','Rejected'],
        default: 'Applied'
    },
    jobLink : { type : String, default : ""},
    notes : { type : String, default : ""},
    dateApplied : {type: Date, default : Date.now},
    user_id: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: true,
  index: true
} 

},{timestamps: true});

module.exports=model('Application',applicationSchema);
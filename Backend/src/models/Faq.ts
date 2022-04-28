import {Schema, model} from 'mongoose';

const FaqSchema = new Schema({
    titulopregunta: {type: String, unique: true},
    pregunta: {type:String, required:true},
    respuesta: {type:String, required:true},
    persona: {type: Schema.Types.ObjectId, required:true, ref: 'User'},
    fechapregunta: {type:Date, default: Date.now},

})

export default model('Faq', FaqSchema);
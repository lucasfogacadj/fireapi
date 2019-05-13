import * as mongoose from 'mongoose'


export interface InterfaceDocument extends mongoose.Document{
    mac: string,
    sensors:[{kind:string, value:number, date:Date}],
    weights:[{value:number, date:Date}],
    alerts:[{kind:string, value:number, date: Date}]
}

const interfaceSchema = new mongoose.Schema({
    mac:{
      type:String,
      unique: true
    },
   sensors:[{
       kind:String,
       value:Number,
       date:Date
   }],
    weights: [{
      value:Number,
      date: Date
    }],
    alerts:[{
        kind:String,
        value:Number
    }]
  })

  export const Interface = mongoose.model<InterfaceDocument>('Inter', interfaceSchema);
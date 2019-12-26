import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['index', 'unique'])

const creatureData = new Mongo.Collection('creatureData');

const creatureSchema = new SimpleSchema({
    name:{
        type:String,
        label:"titre",
        max:"100",
        index:true
    },
    link:{
        type:String,
        label:"description",
        index:true
    },
    createdAt: {
        type: Date,
        label: "creature creation date",
        autoValue: function () {
            if (this.isInsert) {
            return new Date();
            } else {
            this.unset();
            }
        },
    },
})

creatureData.attachSchema(creatureSchema);


export {
    creatureData,
}
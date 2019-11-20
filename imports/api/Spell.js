import SimpleSchema from 'simpl-schema';

const spellData = new Mongo.Collection('spellData');

const spellSchema = new SimpleSchema({
    name:{
        type:String,
        label:"Action",
        max:"100"
    },
    creature:{
        type:Array,
        label:"List of creature that can cast this spell",
        max:"100"
    },
    "$.creatures":{
        type:String,
        max:"100"
    },
    createdAt: {
        type: Date,
        label: "spell creation date",
        autoValue: function () {
            if (this.isInsert) {
            return new Date();
            } else {
            this.unset();
            }
        },
    },
})

spellData.attachSchema(spellSchema);

export {
    spellData,
}
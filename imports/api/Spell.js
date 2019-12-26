import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['index', 'unique'])

const spellData = new Mongo.Collection('spellData');

const spellSchema = new SimpleSchema({
    name:{
        type:String,
        label:"titre",
        max:"100",
        index:true
    },
    description:{
        type:String,
        label:"description",
        index:true
    },
    creature:{
        type:Array,
        label:"List of creature that can cast this spell",
        max:"100",
        defaultValue:[]
    },
    "creature.$":{
        type:String,
        max:"100"
    },
    levels:{
        type:Array,
        label:"List of creature that can cast this spell",
        max:"100"
    },
    "levels.$":{
        type:Object,
        label:"nested object",
        blackbox:true
    },
    components:{
        type:Array,
        label:"List of componants of this spell",
        max:"100"
    },
    "components.$":{
        type:String,
        max:"100"
    },
    spell_resistance:{
        type:Boolean,
        label:"if the spell have some resistance"
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
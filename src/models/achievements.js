const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema(
    {
        hobbies: {
            type: String,
            uppercase: true
        },
        sports: {
            type: String,
            uppercase: true
        },
        language: {
            type: String,
            uppercase: true
        },
        clubs: {
            type: Array
        },
        roll: {
            type: String
        },
        achievement: [ 
            {
                category: {
                    type: String,
                    uppercase: true
                },
                achievements_item: {
                    type: String,
                    uppercase: true
                },
                description_text: {
                    type: String
                }
            }
        ],
        edit:{
            type:String
        }

    },
    { typeKey: 'type' }
);

const Achievement = new mongoose.model("Achievement", achievementSchema);

module.exports = Achievement;
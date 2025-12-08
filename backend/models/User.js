const mongooese = require("mongoose");

const userSchema = new mongooese.Schema({

    usernmae : {type : String, required : true, unique : true},
    passwordHash : {type : String,required : true},
    name : {type : String,required : true},
})

module.exports = mongooese.model("User",userSchema);
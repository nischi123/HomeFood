const Counter = require('../models/counter');
const generateReceipt = async()=>{
    const counter = await Counter.findByIdAndUpdate(
        "payment_receipt",
        {
            $inc:{sequence:1,},
        },
        {
            returnDocument: "after",
            upsert:true,
            setDefaultsOnInsert:true,
        }
    );
    console.log("counterjjjj",counter);
    return `HOMEFOOD_${String(counter.sequence).padStart(4,"0")}`;
}

module.exports = generateReceipt;
const mongoose = require("mongoose");
mongoose
    .connect("mongodb://127.0.0.1:27017/shopApp")
    .then(() => {
        console.log("connection open");
    })
    .catch((err) => {
        console.log("Connection error", err);
    });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be positive ya dodo!"],
    },
    onSale: {
        type: Boolean,
        default: false,
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0,
        },
        inStore: {
            type: Number,
            default: 0,
        },
    },
    size: {
        type: String,
        enum: ["S", "M", "L"],
    },
});
productSchema.methods.greet = function () {
    console.log("Hello!! Hi, how're you doing?? ");
    console.log(`-from ${this.name}`);
};
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save(); /* could have just written this.save and would have worked fine but returning it made it asynchronus as save returns a promise and because it takes time to save so making it async would be right */
};
productSchema.methods.addCategory=function(newCat){
    this.categories.push(newCat);/* to add new categories */
    return this.save()
}
productSchema.statics.fireSale=function(){
    return this.updateMany({},{onSale:true,price:0})/* this will make the price of all the products=0 and onSale:true */
}
const Product = mongoose.model("Product", productSchema);
const findProduct = async () => {
    /* async so that it returns a promise */
    const foundProduct = await Product.findOne({
        name: "Bike Helmet",
    }); /* await so that it will first look for bike helmet and then store the result in found product then run the following function */
    foundProduct.greet(); /* will have to call this even though it's a constant but since it contains an async function */
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory['Outdoors']/* will add a new category and also wait till it is saved as we have returned the save promise */
    console.log(foundProduct)
};
findProduct();
const bike = new Product({
    name: "Bike Helmet",
    price: 28.5,
    categories: ["cycling"],
    size: "S" /* Since we've set up the enum thing it only accepts those particular values */,
});
bike.save();
// product.findOneAndUpdate(
//         { name: "Tire Pump" },
//         { price: -999 },
//         { new: true, runValidators: true }
//     )
//     .then((data) => {
//         console.log("It worked!!!");
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log("OH No Error!!!");
//         console.log(err.errors.price.properties.message);
//     });

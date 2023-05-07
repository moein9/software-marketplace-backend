import mongoose from "mongoose";

const developerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullname is required"],
      lowercase: true,
      unique: false,
    },
    isActive: { type: Boolean, default: true },
    age: { type: Number, required: true, min: 7 },
    startDate: { type: Date, default: Date.now() }, //unix time "1234535657"
    image: {
      type: String,
      required: true,
    },
    address: {
      city: String,
      street: String,
      houseNumber: Number,
    },
    gender: { type: String, enum: ["male", "female"], required: true },
    phoneNumber: { type: String, required: true },

    classes: [{ type: mongoose.Types.ObjectId, ref: "class" }],
    marks: [{ type: mongoose.Types.ObjectId, ref: "mark" }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

developerSchema.virtual("bio").get(function () {
  return `my name is ${this.fullName}, I'm ${this.age} years old, I live in ${this.address.city}`;
});

const Developer = mongoose.model("developer", developerSchema);
export default Developer;

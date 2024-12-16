const { Schema, model, default: mongoose } = require("mongoose");
const {Product} = require("./Product.model");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true
  },
  parentId: {
    type: Schema.Types.ObjectId,
    default: null
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

categorySchema.pre("findOneAndDelete", async function (next) {
  const category = await this.model.findById(this._conditions._id)
  try {
    if (category.parentId === null) {
      await Product.deleteMany({ categories: { $in: category._id } });
    }

    async function deleteSubcategories(parentId) {
      const subcategories = await mongoose.models.Category.find({ parentId }); 

      for (const subcategory of subcategories) {
        await deleteSubcategories(subcategory._id);

        await mongoose.models.Category.findByIdAndDelete(subcategory._id);
      }
    }

    await deleteSubcategories(category._id);
    next();
  } catch (err) {
    next(err);
  }
});

const Category = model("Category", categorySchema)

module.exports = Category
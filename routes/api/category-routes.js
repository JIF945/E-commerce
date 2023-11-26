const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  
  try {
    const categories = await Category.findALL({
      include: Product,
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  
  try {
    const category = await Category.findByPk(req.params.id, {
      indcude: Product,
    });
    if (!category) {
      res.status(400).json({ message: "no category found for this id!" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
 try {
  const newCategory = await Category.create(req.body);
  res.status(200),json(newCategory);
 } catch (err) {
  res.status(500).json(err);
 }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const udpateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(udpateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryId = req.params.id;
    const deleteCategory = await Category.destroy({
      where: {
        id: categoryId,
      }
    });

    if (!deleteCategory) {
      res.status(404),json({ message: 'Category not found with this ID'});
      return;
    }

    res.status(200).json({ messgge:'Category has been deleted'});
  } catch ( err ) {
    res.status(400).json(err);
  }
});

module.exports = router;

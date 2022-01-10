const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

//find all categories
router.get("/", (req, res) => {
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((categoryById) => {
      if (!categoryById) {
        res
          .status(404)
          .json({ message: "There was no category found with this id!" });
        return;
      }
      res.json(categoryById);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a category
router.post("/", (req, res) => {
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name,
  })
    .then((createdCategory) => res.json(createdCategory))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedCategory) => {
      if (!updatedCategory) {
        res.status(404).json({ message: "No category found with this id!" });
        return;
      }
      res.json(updatedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      if (!deletedCategory) {
        res.status(404).json({ message: "No category found with this id!" });
        return;
      }
      res.json(deletedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

// const category = Category.findAll()
//     .then((categoryData) => res.json(categoryData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
//   //add ??

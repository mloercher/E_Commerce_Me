const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      },
    ],
  })
  .then((allTagData) => res.json(allTagData))
  .catch((err) => {
    console.log(err);
    res.json(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  Tag.findOne({
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
    .then((tagById) => {
      if (!tagById) {
        res
          .status(404)
          .json({ message: "There was no tag found with this id!" });
        return;
      }
      res.json(tagById);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name,
  })
    .then((createdTag) => res.json(createdTag))
    .catch((err) => {
      console.log(err);
      res.json(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTag) => {
      if (!updatedTag) {
        res.status(404).json({ message: "No Tag found with this id!" });
        return;
      }
      res.json(updatedTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      if (!deletedTag) {
        res.status(404).json({ message: "No Tag found with this id!" });
        return;
      }
      res.json(deletedTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
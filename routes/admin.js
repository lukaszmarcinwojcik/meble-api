const express = require("express");
const Product = require("../models/product");
const Type = require("../models/type");
const FurnitureCollection = require("../models/furnitureCollection");
const Material = require("../models/material");
const Room = require("../models/room");
const { createTokens, validateToken } = require("../JWT");

const router = express.Router();

router.post("/add/product", validateToken, (req, res) => {
  const body = req.body;
  const productData = new Product(body);
  const errors = productData.validateSync();
  productData.save((err) => { });
  res.json({ title: "dodano nowy produkt", body }, body, errors);
});

router.delete("/delete/product/:id", validateToken, (req, res) => {
  Product.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (!err) {
      res.json({ title: `usunieto produkt o id ${req.params.id}` });
    } else {
      res.json(err);
    }
  });
});

router.put("/edit/product", validateToken, (req, res) => {
  const { id, name, collection, material, room, type, price, filename } =
    req.body;

  Product.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      name: name,
      furnitureCollection: collection,
      material: material,
      room: room,
      type: type,
      price: price,
      filename: filename,
    },
    (err) => {
      if (!err) {
        res.json({
          title: `dane zostały zaktualizowane:`,
        });
      } else {
        res.json({ error: err });
      }
    }
  );

});
// ================================================ADD parameters==================================
router.post("/add/collection", validateToken, (req, res) => {
  const name = req.body.value;
  const furnitureCollectionData = new FurnitureCollection({ name: name });
  const errors = furnitureCollectionData.validateSync();
  furnitureCollectionData.save((err) => {
    console.log(err);
  });
  res.json(
    { title: "dodano nowa kolekcje", name },
    furnitureCollectionData,
    errors
  );
});

router.post("/add/material", validateToken, (req, res) => {
  const name = req.body.value;
  const materialData = new Material({ name: name });
  const errors = materialData.validateSync();
  materialData.save((err) => {
    console.log(err);
  });
  res.json({ title: "dodano nowy material", name }, materialData, errors);
});

router.post("/add/room", validateToken, (req, res) => {
  const name = req.body.value;
  const roomData = new Room({ name: name });
  const errors = roomData.validateSync();
  roomData.save((err) => {
    console.log(err);
  });
  res.json({ title: "dodano nowe pomieszczenie", name }, roomData, errors);
});

router.post("/add/type", (req, res) => {
  const name = req.body.value;
  const typeData = new Type({ name: name });
  const errors = typeData.validateSync();
  typeData.save((err) => {
    console.log(err);
  });
  res.json({ title: "dodano nowy typ", name }, typeData, errors);
});

// ================================================DELETE parameters==================================
router.delete("/delete/collection/:id", validateToken, (req, res) => {
  if (req.params.id === "-1") {
    res.json({ message: `wybierz parametr ktory chcesz usunac` });
  } else {
    FurnitureCollection.findByIdAndDelete({ _id: req.params.id }, (err) => {
      if (!err) {
        res.json({ title: `usunieto parametr o id ${req.params.id}` });
      } else {
        res.json(err);
      }
    });
  }
});

router.delete("/delete/material/:id", validateToken, (req, res) => {
  if (req.params.id === "-1") {
    res.json({ message: `wybierz parametr ktory chcesz usunac` });
  } else {
    Material.findByIdAndDelete({ _id: req.params.id }, (err) => {
      if (!err) {
        res.json({ title: `usunieto parametr o id ${req.params.id}` });
      } else {
        res.json(err);
      }
    });
  }
});

router.delete("/delete/product/:id", validateToken, (req, res) => {
  if (req.params.id === "-1") {
    res.json({ message: `wybierz parametr ktory chcesz usunac` });
  } else {
    Product.findByIdAndDelete({ _id: req.params.id }, (err) => {
      if (!err) {
        res.json({ title: `usunieto parametr o id ${req.params.id}` });
      } else {
        res.json(err);
      }
    });
  }
});
router.delete("/delete/room/:id", validateToken, (req, res) => {
  if (req.params.id === "-1") {
    res.json({ message: `wybierz parametr ktory chcesz usunac` });
  } else {
    Room.findByIdAndDelete({ _id: req.params.id }, (err) => {
      if (!err) {
        res.json({ title: `usunieto parametr o id ${req.params.id}` });
      } else {
        res.json(err);
      }
    });
  }
});

router.delete("/delete/type/:id", validateToken, (req, res) => {
  if (req.params.id === "-1") {
    res.json({ message: `wybierz parametr ktory chcesz usunac` });
  } else {
    Type.findByIdAndDelete({ _id: req.params.id }, (err) => {
      if (!err) {
        res.json({ title: `usunieto parametr o id ${req.params.id}` });
      } else {
        res.json(err);
      }
    });
  }
});
//=================================================EDIT PARAMETER==========================

router.put("/edit/collection", validateToken, (req, res) => {
  FurnitureCollection.findByIdAndUpdate(
    { _id: req.body.id },
    { name: req.body.newName },
    (err) => {
      if (!err) {
        res.json({
          title: `zmieniono parametr o id: ${req.body.id} na ${req.body.newName}`,
        });
      } else {
        res.json(err);
      }
    }
  );
});
router.get("/edit/material", validateToken, (req, res) => {
  Material.findByIdAndUpdate(
    { _id: req.body.id },
    { name: req.body.newName },
    (err) => {
      if (!err) {
        res.json({
          title: `zmieniono parametr o id: ${req.body.id} na ${req.body.newName}`,
        });
      } else {
        res.json(err);
      }
    }
  );
});
router.get("/edit/room", validateToken, (req, res) => {
  Room.findByIdAndUpdate(
    { _id: req.body.id },
    { name: req.body.newName },
    (err) => {
      if (!err) {
        res.json({
          title: `zmieniono parametr o id: ${req.body.id} na ${req.body.newName}`,
        });
      } else {
        res.json(err);
      }
    }
  );
});
router.get("/edit/type", validateToken, (req, res) => {
  Type.findByIdAndUpdate(
    { _id: req.body.id },
    { name: req.body.newName },
    (err) => {
      if (!err) {
        res.json({
          title: `zmieniono parametr o id: ${req.body.id} na ${req.body.newName}`,
        });
      } else {
        res.json(err);
      }
    }
  );
});

module.exports = router;

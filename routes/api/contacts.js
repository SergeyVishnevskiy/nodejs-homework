const express = require("express");
const router = express.Router();
const Contacts = require("../../model/index.js");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contacts.getContactById(contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const reqParameters = ["name", "email", "phone"];
    if (!req.body.name || !req.body.email || !req.body.phone) {
      const errorMessage = reqParameters
        .filter((item) => !Object.keys(req.body).includes(item))
        .reduce(
          (acc, string) => `${acc} missing required ${string} parameter`,
          ""
        );
      res.status(400).json({
        message: errorMessage,
      });
    } else {
      const contact = await Contacts.addContact(req.body);
      res.json({
        status: "success",
        code: 201,
        data: {
          contact,
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contacts.removeContact(contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contacts.updateContact(contactId, req.body);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

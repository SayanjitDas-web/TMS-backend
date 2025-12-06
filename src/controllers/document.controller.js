import Document from "../models/Document.model.js";

export const createDocument = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description && description.length > 10) {
      res
        .status(401)
        .json({ success: false, message: "please provide a description" });
    }
    const document = await Document.create({ description });
    if (!document) {
      res
        .status(400)
        .json({
          success: false,
          message: "something went wrong while creating the document",
        });
    }
    res
      .status(200)
      .json({ success: true, message: "document created!", document });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.id;
    if (!id) {
      res
        .status(401)
        .json({
          success: false,
          message: "please provide a id to delete the document!",
        });
    }
    const document = await Document.findById(id);
    if (!document) {
      res.status(404).json({ success: false, message: "document not found!" });
    }
    await document.deleteOne();
    res.status(200).json({ success: true, message: "document deleted!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getDocument = async (req, res) => {
  try {
    const docId = req.params.docId;
    if (!docId) {
      res
        .status(401)
        .json({
          success: false,
          message: "please provide a id to get the document!",
        });
    }
    const document = await Document.findById(docId);
    if (!document) {
      res.status(404).json({ success: false, message: "document not found!" });
    }
    res.status(200).json({ success: true, document });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

import Block from "../models/Block.model.js";
import Document from "../models/Document.model.js";

export const createBlock = async (req, res) => {
  try {
    const { title, code, explaination } = req.body;
    const documentId = req.params.docId;

    const document = await Document.findById(documentId);

    if (!title || !code || !explaination) {
      res
        .status(401)
        .json({ success: false, message: "please fill all the fields!" });
    }
    if (!document) {
      res
        .status(404)
        .json({
          success: false,
          message: "document not found with the provided ID!",
        });
    }
    const block = await Block.create({ title, code, explaination });
    if (!block) {
      res
        .status(400)
        .json({
          success: false,
          message: "something went wrong while creating the block",
        });
    }

    document.blocks.push(block._id);
    document.save();

    res
      .status(200)
      .json({
        success: true,
        message: "block created!",
        blocs: document.blocks,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteBlock = async (req, res) => {
  try {
    const { blockId, docId } = req.body;
    if (!blockId || !docId) {
      res
        .status(401)
        .json({
          success: false,
          message:
            "please provide a block id and document id to delete the block!",
        });
    }

    const document = await Document.findById(docId);
    if (!document) {
      res
        .status(404)
        .json({
          success: false,
          message: "document not found with the provided ID!",
        });
    }
    const block = await Block.findById(id);
    if (!block) {
      res.status(404).json({ success: false, message: "block not found!" });
    }

    document.blocks.splice(document.blocks.indexOf(block._id), 1);
    document.save();
    await block.deleteOne();

    res.status(200).json({ success: true, message: "block deleted!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getBlock = async (req, res) => {
  try {
    const blockId = req.params.blockId;

    const block = await Block.findById(blockId);
    if (!block) {
      res.status(404).json({ success: false, message: "block not found!" });
    }

    res.status(200).json({ success: true, block });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

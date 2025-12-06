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
      res.status(404).json({
        success: false,
        message: "document not found with the provided ID!",
      });
    }
    const block = await Block.create({ title, code, explaination });
    if (!block) {
      res.status(400).json({
        success: false,
        message: "something went wrong while creating the block",
      });
    }

    document.blocks.push(block._id);
    document.save();

    res.status(200).json({
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
      res.status(401).json({
        success: false,
        message:
          "please provide a block id and document id to delete the block!",
      });
    }

    const document = await Document.findById(docId);
    if (!document) {
      res.status(404).json({
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

export const updateTitle = async (req, res) => {
  try {
    const { blockId , newTitle } = req.body;
    if (!blockId || !newTitle) {
      res.status(401).json({
        success: false,
        message: "please provide a block id and new title to update the title!",
      });
    }
    const block = await Block.findById(blockId);
    if (!block) {
      res.status(404).json({ success: false, message: "block not found!" });
    }

    block.title = newTitle
    await block.save()

    res.status(200).json({ success: true, block });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCode = async (req, res) => {
  try {
    const { blockId , newCode } = req.body;
    if (!blockId || newCode) {
      res.status(401).json({
        success: false,
        message: "please provide a block id and new code to update the code!",
      });
    }
    const block = await Block.findById(blockId);
    if (!block) {
      res.status(404).json({ success: false, message: "block not found!" });
    }

    block.code = newCode
    await block.save()

    res.status(200).json({ success: true, block });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateExplanation = async (req, res) => {
  try {
    const { blockId , newExp } = req.body;
    if (!blockId || newExp) {
      res.status(401).json({
        success: false,
        message: "please provide a block id and new explanation to update the explanation!",
      });
    }
    const block = await Block.findById(blockId);
    if (!block) {
      res.status(404).json({ success: false, message: "block not found!" });
    }

    block.explaination = newExp
    await block.save()

    res.status(200).json({ success: true, block });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

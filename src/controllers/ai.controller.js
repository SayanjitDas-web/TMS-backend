import Block from "../models/Block.model.js";

export const genCodeExp = async (req, res) => {
  try {
    const { blockId } = req.body;
    if (!blockId) {
      res.status(401).json({
        success: false,
        message:
          "please provide a block id to generate the explanation!",
      });
    }
    const block = await Block.findById(blockId);
    if (!block) {
      res.status(404).json({ success: false, message: "block not found!" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

import Block from "../models/Block.model.js";
import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";

config();

const ai = new GoogleGenAI({ apiKey: `${process.env.GEMINI_API_KEY}` });

export const genCodeExp = async (req, res) => {
  try {
    const { blockId } = req.body;
    if (!blockId) {
      res.status(401).json({
        success: false,
        message: "please provide a block id to generate the explanation!",
      });
    }
    const block = await Block.findById(blockId);
    if (!block) {
      res.status(404).json({ success: false, message: "block not found!" });
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `explain the given code and only just return the explaination with out any other text. code:${block.code}`,
    });

    if (!response.text) {
      res.status(400).json({ success: false, message: "failed to generate the explaination!" });
    }

    block.explaination = response.text
    await block.save()

    res.status(200).json({ success: true, explaination: `${response.text}` });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

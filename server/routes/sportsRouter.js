import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("sports").select("*");

    if (error) {
      console.error("Supabase error:", error.message);
      return res.status(500).json({ message: "Failed to fetch sports." });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Unexpected server error." });
  }
});

export default router;

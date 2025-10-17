import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_datetime", { ascending: true });

    if (error) {
      console.error("Supabase select error:", error.message);
      return res
        .status(500)
        .json({ message: "Failed to fetch events.", error: error.message });
    }

    res.status(200).json({
      message: "Events fetched successfully.",
      events: data || [],
    });
  } catch (err) {
    console.error("Server error during event fetch:", err);
    res.status(500).json({ message: "Unexpected server error during fetch." });
  }
});

export default router;

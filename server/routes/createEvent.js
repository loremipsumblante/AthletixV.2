import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    organizer_id,
    title,
    type,
    sport_name, 
    start_datetime,
    end_datetime,
    location,
    entry_fee,
    description,
  } = req.body;
  
  const missingFields = [];
  
  try {
    if (!organizer_id) missingFields.push("organizer_id");
    if (!title) missingFields.push("title");
    if (!type) missingFields.push("type");
    if (!sport_name) missingFields.push("sport_name"); 
    if (!start_datetime) missingFields.push("start_datetime");
    if (!end_datetime) missingFields.push("end_datetime");
    if (!location) missingFields.push("location");
    if (!description) missingFields.push("description");

    if (missingFields.length > 0) {
      console.warn("Missing required fields on creation:", missingFields.join(", "));
      return res.status(400).json({
        message: "Missing required field(s).",
        missing: missingFields,
      });
    }

    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          organizer_id,
          title,
          type,
          sport_name, 
          start_datetime,
          end_datetime,
          location,
          entry_fee,
          description,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error.message, error.details);
      return res.status(500).json({ message: "Failed to create event.", error: error.message });
    }

    return res.status(201).json({
      message: "Event created successfully.",
      event: data,
    });
  } catch (err) {
    console.error("Server error:", err);
    if (err instanceof SyntaxError) {
      console.error("Received malformed JSON body.");
    }
    return res.status(500).json({ message: "Unexpected server error." });
  }
});

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_datetime", { ascending: true });

    if (error) {
      console.error("Supabase select error:", error.message, error.details);
      return res.status(500).json({ message: "Failed to fetch events.", error: error.message });
    }

    return res.status(200).json({
      message: "Events fetched successfully.",
      events: data || [],
    });

  } catch (err) {
    console.error("Server error during event fetch:", err);
    return res.status(500).json({ message: "Unexpected server error during fetch operation." });
  }
});

export default router;

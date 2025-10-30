// server/routes/athletes.js
import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// ✅ Fetch all athletes
router.get("/", async (req, res) => {
  try {
    const { data: users, error: userError } = await supabase
      .from("users")
      .select(`
        user_id,
        fullname,
        sport_id,
        sport_name,
        birthdate,
        gender,
        bio,
        registration_date,
        role,
        location,
        verification_status
      `)
      .eq("role", "athlete");

    if (userError) throw userError;
    if (!users) return res.json([]);

    // Fetch user details in one query
    const { data: details, error: detailsError } = await supabase
      .from("user_details")
      .select("*");

    if (detailsError) throw detailsError;

    // Merge user info with user_details
    const athletes = users.map((user) => {
      const detail = details.find((d) => d.user_id === user.user_id);
      const age =
        user.birthdate
          ? new Date().getFullYear() - new Date(user.birthdate).getFullYear()
          : "";

      return {
        id: user.user_id,
        name: user.fullname,
        sport: user.sport_name || "",
        position: detail?.position || "",
        age: age,
        gender: user.gender || "",
        location: user.location || "",
        achievements: 0, // placeholder
        stats: [
          { label: "PPG", value: "0.0" },
          { label: "RPG", value: "0.0" },
          { label: "APG", value: "0.0" },
        ],
        verified: user.verification_status === "verified",
      };
    });

    res.json(athletes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load athletes" });
  }
});

export default router;

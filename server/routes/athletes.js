import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    //users
    const { data: userData } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", id)
      .eq("role", "athlete")
      .single();

    if (!userData) return res.status(404).json({ error: "Athlete not found" });

    //user details
    const { data: detailsData } = await supabase
      .from("user_details")
      .select("*")
      .eq("user_id", id)
      .single();
    
    
    const athleteProfile = {
      id: userData.user_id,
      name: userData.fullname,
      sport: userData.sport_name, 
      age: new Date().getFullYear() - new Date(userData.birthdate).getFullYear(),
      bio: userData.bio,
      joinDate: new Date(userData.registration_date).toLocaleString("default", { month: "long", year: "numeric" }),
      location: userData.location,
      verified: userData.verification_status === "verified",
      height: detailsData?.height_cm || "N/A",
      weight: detailsData?.weight_kg || "N/A",
      position: detailsData?.position || "N/A",
      jerseyNumber: detailsData?.jersey_number || "N/A",
      videos: [
        {
          id: 1,
          title: "Highlight Video",
          url: detailsData?.video_url || "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
      ],
      email: detailsData?.email || "N/A",
      contactNum: detailsData?.contact_num || "N/A",
      achievements: [], // optional
      stats: { overall: [], recent: [] }, // optional
      imageUrl: "" // optional
    };

    res.json(athleteProfile);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

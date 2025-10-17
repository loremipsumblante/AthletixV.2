import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Calendar,
  Trophy,
  Activity,
  Share2,
  Award,
  TrendingUp,
  Target,
  Medal,
  ChevronLeft
} from "lucide-react";
import axios from "axios";

const AthleteProfile = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  // Fetch athlete data from backend
  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/athletes/${id}`);
        console.log("Fetched athlete:", res.data);
        setAthlete(res.data);
      } catch (err) {
        console.error("Failed to load athlete:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAthlete();
  }, [id]);

  // Handle loading / error
  if (loading) return <p>Loading...</p>;
  if (!athlete) return <p>Athlete not found</p>;

  // Calculate initials safely
  const initials = athlete?.name
    ? athlete.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/athletes">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Athletes
          </Button>
        </Link>

        {/* Profile Header */}
        <div className="bg-muted/30 rounded-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-32 w-32">
              {athlete.imageUrl ? (
                <AvatarImage src={athlete.imageUrl} alt={athlete.name} />
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold">{athlete.name}</h1>
                    {athlete.verified && <Badge variant="secondary">Verified</Badge>}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Activity className="h-4 w-4" />
                      {athlete.sport} • {athlete.position}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {athlete.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {athlete.joinDate}
                    </span>
                  </div>
                  <p className="text-muted-foreground max-w-2xl">{athlete.bio}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    variant={isFollowing ? "secondary" : "default"}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <p className="text-2xl font-bold">{athlete.age}</p>
                  <p className="text-sm text-muted-foreground">Age</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{athlete.height}</p>
                  <p className="text-sm text-muted-foreground">Height (cm)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{athlete.weight}</p>
                  <p className="text-sm text-muted-foreground">Weight (kg)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{athlete.jerseyNumber}</p>
                  <p className="text-sm text-muted-foreground">Jersey</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Season Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {athlete.stats?.overall?.length
                  ? athlete.stats.overall.map((stat, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{stat.label}</span>
                          <span className="text-sm font-bold">{stat.value}</span>
                        </div>
                        <Progress value={(stat.value / stat.max) * 100} className="h-2" />
                      </div>
                    ))
                  : "No statistics available."}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {athlete.achievements?.length
                ? athlete.achievements.map((achievement) => {
                    const Icon = achievement.icon || Trophy;
                    return (
                      <Card key={achievement.id}>
                        <CardContent className="flex items-center gap-4 p-6">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{achievement.title}</h3>
                            {achievement.year && (
                              <p className="text-sm text-muted-foreground">{achievement.year}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                : "No achievements yet."}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video w-full max-w-4xl mx-auto">
                  <iframe
                    width="100%"
                    height="100%"
                    src={athlete.videos?.[0]?.url || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                    title="Athlete Highlight Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{athlete.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{athlete.contactNum}</span>
                </div>
              </CardContent>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">School</span>
                  <span className="font-medium">{athlete.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-medium">{athlete.contactNum}</span>
                </div>
              </CardContent>
            </Card>
            
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AthleteProfile;

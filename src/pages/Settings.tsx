import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/utilities/utils";
import { toast } from "sonner";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Bell, 
  Eye, 
  EyeOff,
  Save,
  ArrowLeft,
  Trash2,
  Trophy,
  GraduationCap,
  Plus,
  X,
  Award,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  CalendarIcon,
  Ruler,
  Weight,
  Hash
} from "lucide-react";

const regions = [
  "NCR",
  "Region I",
  "Region II", 
  "Region III",
  "Region IV-A",
  "Region IV-B",
  "Region V",
  "Region VI",
  "Region VII",
  "Region VIII",
  "Region IX",
  "Region X",
  "Region XI",
  "Region XII",
  "Region XIII",
  "BARMM",
  "CAR",
];

const Settings = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullname: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    region: "NCR",
    position: "Point Guard",
    height: "180",
    weight: "75",
    jerseyNumber: "23",
    birthday: null as Date | null,
    instagram: "",
    twitter: "",
    facebook: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    bio: "Professional athlete passionate about sports and competition.",
  });

  const [achievements, setAchievements] = useState([
    { id: 1, title: "State Championship Winner", year: "2023", description: "Won the state basketball championship" },
    { id: 2, title: "MVP Award", year: "2022", description: "Most Valuable Player of the season" }
  ]);

  const [education, setEducation] = useState([
    { 
      id: 1, 
      school: "University of California", 
      degree: "Bachelor of Science", 
      field: "Sports Management", 
      startYear: "2020", 
      endYear: "2024",
      gpa: "3.8"
    }
  ]);

  const [locations, setLocations] = useState([
    { id: 1, type: "Home", address: "123 Main St, New York, NY 10001", isPrimary: true },
    { id: 2, type: "Training", address: "456 Sports Center Ave, New York, NY 10002", isPrimary: false }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, birthday: date || null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Settings updated successfully!");
    }, 1000);
  };

  const addAchievement = () => {
    const newId = Math.max(...achievements.map(a => a.id), 0) + 1;
    setAchievements([...achievements, { id: newId, title: "", year: "", description: "" }]);
  };

  const removeAchievement = (id: number) => {
    setAchievements(achievements.filter(a => a.id !== id));
  };

  const updateAchievement = (id: number, field: string, value: string) => {
    setAchievements(achievements.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const addEducation = () => {
    const newId = Math.max(...education.map(e => e.id), 0) + 1;
    setEducation([...education, { 
      id: newId, 
      school: "", 
      degree: "", 
      field: "", 
      startYear: "", 
      endYear: "",
      gpa: ""
    }]);
  };

  const removeEducation = (id: number) => {
    setEducation(education.filter(e => e.id !== id));
  };

  const updateEducation = (id: number, field: string, value: string) => {
    setEducation(education.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const addLocation = () => {
    const newId = Math.max(...locations.map(l => l.id), 0) + 1;
    setLocations([...locations, { id: newId, type: "", address: "", isPrimary: false }]);
  };

  const removeLocation = (id: number) => {
    setLocations(locations.filter(l => l.id !== id));
  };

  const updateLocation = (id: number, field: string, value: string | boolean) => {
    setLocations(locations.map(l => 
      l.id === id ? { ...l, [field]: value } : l
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>
                  Update your account information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">
                      <User className="inline-block mr-2 h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      id="fullname"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="inline-block mr-2 h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="inline-block mr-2 h-4 w-4" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="region">
                      <MapPin className="inline-block mr-2 h-4 w-4" />
                      Region
                    </Label>
                    <Select value={formData.region} onValueChange={(value) => handleSelectChange('region', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="e.g., Point Guard, Center, Striker"
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">
                        <Ruler className="inline-block mr-2 h-4 w-4" />
                        Height (cm)
                      </Label>
                      <Input
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        placeholder="180"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">
                        <Weight className="inline-block mr-2 h-4 w-4" />
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="75"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jerseyNumber">
                        <Hash className="inline-block mr-2 h-4 w-4" />
                        Jersey Number
                      </Label>
                      <Input
                        id="jerseyNumber"
                        name="jerseyNumber"
                        value={formData.jerseyNumber}
                        onChange={handleInputChange}
                        placeholder="23"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>
                      <CalendarIcon className="inline-block mr-2 h-4 w-4" />
                      Birthday
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.birthday && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.birthday ? format(formData.birthday, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.birthday || undefined}
                          onSelect={handleDateChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Social Media Links</Label>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="instagram">
                          <Instagram className="inline-block mr-2 h-4 w-4" />
                          Instagram
                        </Label>
                        <Input
                          id="instagram"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleInputChange}
                          placeholder="https://instagram.com/yourusername"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter">
                          <Twitter className="inline-block mr-2 h-4 w-4" />
                          Twitter
                        </Label>
                        <Input
                          id="twitter"
                          name="twitter"
                          value={formData.twitter}
                          onChange={handleInputChange}
                          placeholder="https://twitter.com/yourusername"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="facebook">
                          <Facebook className="inline-block mr-2 h-4 w-4" />
                          Facebook
                        </Label>
                        <Input
                          id="facebook"
                          name="facebook"
                          value={formData.facebook}
                          onChange={handleInputChange}
                          placeholder="https://facebook.com/yourusername"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Locations Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Locations
                    </CardTitle>
                    <CardDescription>
                      Manage your locations (home, training, etc.)
                    </CardDescription>
                  </div>
                  <Button onClick={addLocation} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Location
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {locations.map((location) => (
                  <Card key={location.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          <div className="space-y-2">
                            <Label htmlFor={`location-type-${location.id}`}>Type</Label>
                            <Input
                              id={`location-type-${location.id}`}
                              value={location.type}
                              onChange={(e) => updateLocation(location.id, 'type', e.target.value)}
                              placeholder="e.g., Home, Training, Work"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`location-address-${location.id}`}>Address</Label>
                            <Input
                              id={`location-address-${location.id}`}
                              value={location.address}
                              onChange={(e) => updateLocation(location.id, 'address', e.target.value)}
                              placeholder="Full address"
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLocation(location.id)}
                          className="ml-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`primary-${location.id}`}
                          checked={location.isPrimary}
                          onChange={(e) => updateLocation(location.id, 'isPrimary', e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`primary-${location.id}`}>Primary Location</Label>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Achievements Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Achievements & Awards
                    </CardTitle>
                    <CardDescription>
                      Showcase your accomplishments and awards
                    </CardDescription>
                  </div>
                  <Button onClick={addAchievement} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Achievement
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          <div className="space-y-2">
                            <Label htmlFor={`achievement-title-${achievement.id}`}>Title</Label>
                            <Input
                              id={`achievement-title-${achievement.id}`}
                              value={achievement.title}
                              onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                              placeholder="Achievement title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`achievement-year-${achievement.id}`}>Year</Label>
                            <Input
                              id={`achievement-year-${achievement.id}`}
                              value={achievement.year}
                              onChange={(e) => updateAchievement(achievement.id, 'year', e.target.value)}
                              placeholder="Year received"
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeAchievement(achievement.id)}
                          className="ml-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`achievement-description-${achievement.id}`}>Description</Label>
                        <textarea
                          id={`achievement-description-${achievement.id}`}
                          value={achievement.description}
                          onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                          rows={3}
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Describe your achievement"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Education & Schools
                    </CardTitle>
                    <CardDescription>
                      Add your educational background and qualifications
                    </CardDescription>
                  </div>
                  <Button onClick={addEducation} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {education.map((edu) => (
                  <Card key={edu.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          <div className="space-y-2">
                            <Label htmlFor={`school-${edu.id}`}>School/Institution</Label>
                            <Input
                              id={`school-${edu.id}`}
                              value={edu.school}
                              onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                              placeholder="School name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                            <Input
                              id={`degree-${edu.id}`}
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                              placeholder="Degree type"
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEducation(edu.id)}
                          className="ml-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                          <Input
                            id={`field-${edu.id}`}
                            value={edu.field}
                            onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                            placeholder="Major/Field"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`start-year-${edu.id}`}>Start Year</Label>
                          <Input
                            id={`start-year-${edu.id}`}
                            value={edu.startYear}
                            onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                            placeholder="2020"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`end-year-${edu.id}`}>End Year</Label>
                          <Input
                            id={`end-year-${edu.id}`}
                            value={edu.endYear}
                            onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                            placeholder="2024"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</Label>
                          <Input
                            id={`gpa-${edu.id}`}
                            value={edu.gpa}
                            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                            placeholder="3.8"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 mt-12">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      <Save className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enabled
                  </Button>
                </div>
                
                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your device
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enabled
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Event Reminders</h3>
                    <p className="text-sm text-muted-foreground">
                      Get reminded about upcoming events
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enabled
                  </Button>
                </div>

                <div className="flex justify-end mt-6">
                  <Button disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;

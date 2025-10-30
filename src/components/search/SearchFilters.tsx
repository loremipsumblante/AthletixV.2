import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter, RotateCcw } from "lucide-react";

interface SearchFiltersProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  onApply: () => void;
  onReset: () => void;
}

const sports = [
  "Basketball",
  "Football",
  "Soccer",
  "Baseball",
  "Volleyball",
  "Track & Field",
  "Swimming",
  "Tennis",
];

const positionOptions: Record<string, string[]> = {
  Basketball: ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
  Football: ["Quarterback", "Running Back", "Wide Receiver", "Linebacker", "Defensive Back"],
  Soccer: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  Baseball: ["Pitcher", "Catcher", "Shortstop", "Outfielder"],
  Volleyball: ["Setter", "Libero", "Outside Hitter", "Middle Blocker", "Opposite"],
  "Track & Field": ["Sprinter", "Jumper", "Thrower"],
  Swimming: ["Freestyle", "Backstroke", "Butterfly", "Breaststroke"],
  Tennis: ["Singles", "Doubles"],
};

const defaultFilterState = {
  gender: "any",
  sport: "any",
  position: "any",
  ageRange: [16, 25],
};

const SearchFilters = ({
  filters,
  onFilterChange,
  onApply,
  onReset,
}: SearchFiltersProps) => {
  const [selectedGender, setSelectedGender] = useState(filters.gender || "any");
  const [selectedSport, setSelectedSport] = useState(filters.sport || "any");
  const [selectedPosition, setSelectedPosition] = useState(filters.position || "any");
  const [ageRange, setAgeRange] = useState(filters.ageRange || [16, 25]);

  // Sync state changes with parent
  useEffect(() => {
    onFilterChange({
      gender: selectedGender,
      sport: selectedSport,
      position: selectedPosition,
      ageRange,
    });
  }, [selectedGender, selectedSport, selectedPosition, ageRange]);

  // When user clicks reset
  const handleResetClick = () => {
    setSelectedGender("any");
    setSelectedSport("any");
    setSelectedPosition("any");
    setAgeRange([16, 25]);
    onReset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </span>
          <Button variant="ghost" size="sm" onClick={handleResetClick}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Gender Filter */}
        <div className="space-y-2">
          <Label>Gender</Label>
          <Select value={selectedGender} onValueChange={(value) => setSelectedGender(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sport Filter */}
        <div className="space-y-2">
          <Label>Sport</Label>
          <Select value={selectedSport} onValueChange={(value) => setSelectedSport(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Sport</SelectItem>
              {sports.map((sport) => (
                <SelectItem key={sport} value={sport.toLowerCase()}>
                  {sport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Position Filter */}
        <div className="space-y-2">
          <Label>Position</Label>
          <Select value={selectedPosition} onValueChange={(value) => setSelectedPosition(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Position</SelectItem>
              {(positionOptions[
                selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)
              ] || []).map((pos) => (
                <SelectItem key={pos} value={pos.toLowerCase()}>
                  {pos}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Age Range */}
        <div className="space-y-2">
          <Label>
            Age Range: {ageRange[0]} - {ageRange[1]} years
          </Label>
          <div className="px-2 relative">
            <Slider
              value={ageRange}
              onValueChange={(value) => setAgeRange(value)}
              max={35}
              min={14}
              step={1}
              className="relative z-20 h-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>14</span>
              <span>35</span>
            </div>
          </div>
        </div>

        <Button className="w-full" onClick={onApply}>
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;

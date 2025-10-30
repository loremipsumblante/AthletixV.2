import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/layout/Navbar";
import AthleteCard from "@/components/athletes/AthleteCard";
import SearchFilters from "@/components/search/SearchFilters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<any>({
    sport: "any",
    position: "any",
    ageRange: [16, 25],
  });
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState(filters);

  // Fetch all athletes once
  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/athletes");
        setAthletes(res.data);
      } catch (err) {
        console.error("Failed to fetch athletes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAthletes();
  }, []);

  // Handle filter changes in SearchFilters.tsx
  const handleFilterChange = (newFilter: any) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  };

  const handleReset = () => {
    const defaultFilters = { sport: "any", position: "any", ageRange: [16, 25] };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setSearchQuery("");
  };

  // Filtering logic
  const filteredAthletes = useMemo(() => {
    let result = [...athletes];

    // 🔍 Search logic
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.name?.toLowerCase().includes(q) ||
          a.sport?.toLowerCase().includes(q) ||
          a.location?.toLowerCase().includes(q) ||
          a.position?.toLowerCase().includes(q)
      );
    }

    // 🏀 Filter by sport
    if (appliedFilters.sport && appliedFilters.sport !== "any") {
      result = result.filter(
        (a) => a.sport?.toLowerCase() === appliedFilters.sport.toLowerCase()
      );
    }

    // 🎯 Filter by position
    if (appliedFilters.position && appliedFilters.position !== "any") {
      result = result.filter(
        (a) =>
          a.position?.toLowerCase() === appliedFilters.position.toLowerCase()
      );
    }

    // 👶 Filter by age range
    if (appliedFilters.ageRange && appliedFilters.ageRange.length === 2) {
      const [min, max] = appliedFilters.ageRange;
      result = result.filter((a) => a.age >= min && a.age <= max);
    }

    // 🧍 Gender Filter
    if (appliedFilters.gender && appliedFilters.gender !== "any") {
      result = result.filter(
        (a) => a.gender?.toLowerCase() === appliedFilters.gender.toLowerCase()
      );
    }

    return result;
  }, [athletes, searchQuery, appliedFilters]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Advanced Search</h1>
          <p className="text-muted-foreground">
            Find and compare athletes using dynamic search and filters
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, sport, location, or position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>

        {/* Main Grid */}
        {loading ? (
          <p>Loading athletes...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            <div className="lg:col-span-1">
              <SearchFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onApply={handleApplyFilters}
                onReset={handleReset}
              />
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {filteredAthletes.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No athletes found matching your criteria.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAthletes.map((athlete) => (
                    <AthleteCard key={athlete.id} {...athlete} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

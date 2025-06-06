import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Globe, RefreshCw } from "lucide-react";

const regions = [
  { code: "us", name: "United States", flag: "🇺🇸", currency: "USD" },
  { code: "uk", name: "United Kingdom", flag: "🇬🇧", currency: "GBP" },
  { code: "au", name: "Australia", flag: "🇦🇺", currency: "AUD" },
  { code: "ca", name: "Canada", flag: "🇨🇦", currency: "CAD" },
];

interface RegionSelectorProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  onRefresh?: () => void;
}

export function RegionSelector({ selectedRegion, onRegionChange, onRefresh }: RegionSelectorProps) {
  const currentRegion = regions.find(r => r.code === selectedRegion) || regions[0];

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={selectedRegion} onValueChange={onRegionChange}>
        <SelectTrigger className="w-[180px] h-8 text-sm">
          <SelectValue>
            <div className="flex items-center gap-2">
              <span>{currentRegion.flag}</span>
              <span>{currentRegion.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {regions.map((region) => (
            <SelectItem key={region.code} value={region.code}>
              <div className="flex items-center gap-2">
                <span>{region.flag}</span>
                <span>{region.name}</span>
                <span className="text-xs text-muted-foreground">({region.currency})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {onRefresh && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          className="h-8 px-3"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Refresh
        </Button>
      )}
    </div>
  );
}

// Hook for managing region state
export function useRegion() {
  const [region, setRegion] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedRegion") || "us";
    }
    return "us";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedRegion", region);
    }
  }, [region]);

  return { selectedRegion: region, setSelectedRegion: setRegion };
}

export function getRegionInfo(regionCode: string) {
  return regions.find(r => r.code === regionCode) || regions[0];
}
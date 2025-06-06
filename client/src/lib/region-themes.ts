// Region-specific theming based on country flag colors

export interface RegionTheme {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  flag: string;
  name: string;
  currency: string;
}

export const regionThemes: Record<string, RegionTheme> = {
  us: {
    primary: "rgb(59, 130, 246)", // Blue from US flag
    secondary: "rgb(239, 68, 68)", // Red from US flag
    accent: "rgb(255, 255, 255)", // White from US flag
    gradient: "from-blue-600 via-white to-red-600",
    cardBg: "from-blue-50 to-red-50",
    textPrimary: "text-blue-900",
    textSecondary: "text-red-700",
    border: "border-blue-200",
    flag: "🇺🇸",
    name: "United States",
    currency: "USD"
  },
  uk: {
    primary: "rgb(29, 78, 216)", // Dark blue from Union Jack
    secondary: "rgb(220, 38, 127)", // Red from Union Jack
    accent: "rgb(255, 255, 255)", // White from Union Jack
    gradient: "from-blue-800 via-white to-pink-600",
    cardBg: "from-blue-50 to-pink-50",
    textPrimary: "text-blue-900",
    textSecondary: "text-pink-700",
    border: "border-blue-200",
    flag: "🇬🇧",
    name: "United Kingdom", 
    currency: "GBP"
  },
  au: {
    primary: "rgb(34, 197, 94)", // Green from Australian flag
    secondary: "rgb(251, 191, 36)", // Gold from Australian flag
    accent: "rgb(29, 78, 216)", // Blue from Australian flag
    gradient: "from-green-500 via-yellow-400 to-blue-700",
    cardBg: "from-green-50 to-yellow-50",
    textPrimary: "text-green-900",
    textSecondary: "text-yellow-700",
    border: "border-green-200",
    flag: "🇦🇺",
    name: "Australia",
    currency: "AUD"
  },
  ca: {
    primary: "rgb(220, 38, 127)", // Red from Canadian flag
    secondary: "rgb(255, 255, 255)", // White from Canadian flag
    accent: "rgb(239, 68, 68)", // Maple leaf red
    gradient: "from-red-600 via-white to-red-600",
    cardBg: "from-red-50 to-white",
    textPrimary: "text-red-900",
    textSecondary: "text-red-700",
    border: "border-red-200",
    flag: "🇨🇦",
    name: "Canada",
    currency: "CAD"
  }
};

export function getRegionTheme(region: string): RegionTheme {
  return regionThemes[region] || regionThemes.us;
}

export function getRegionClasses(region: string) {
  const theme = getRegionTheme(region);
  return {
    primaryButton: region === 'us' ? 'bg-blue-600 hover:bg-blue-700 border-2 border-blue-700' :
                   region === 'uk' ? 'bg-indigo-700 hover:bg-indigo-800 border-2 border-indigo-800' :
                   region === 'au' ? 'bg-green-600 hover:bg-green-700 border-2 border-green-700' :
                   'bg-red-600 hover:bg-red-700 border-2 border-red-700',
    
    secondaryButton: region === 'us' ? 'bg-red-500 hover:bg-red-600 border-2 border-red-600' :
                     region === 'uk' ? 'bg-rose-600 hover:bg-rose-700 border-2 border-rose-700' :
                     region === 'au' ? 'bg-amber-500 hover:bg-amber-600 border-2 border-amber-600' :
                     'bg-red-500 hover:bg-red-600 border-2 border-red-600',
    
    gradientBg: region === 'us' ? 'bg-gradient-to-br from-blue-700 via-white to-red-600' :
                region === 'uk' ? 'bg-gradient-to-br from-indigo-800 via-white to-rose-600' :
                region === 'au' ? 'bg-gradient-to-br from-green-600 via-amber-400 to-blue-700' :
                'bg-gradient-to-br from-red-700 via-white to-red-600',
    
    cardGradient: region === 'us' ? 'bg-gradient-to-br from-blue-100 via-white to-red-100' :
                  region === 'uk' ? 'bg-gradient-to-br from-indigo-100 via-white to-rose-100' :
                  region === 'au' ? 'bg-gradient-to-br from-green-100 via-amber-100 to-blue-100' :
                  'bg-gradient-to-br from-red-100 via-white to-red-50',
    
    textPrimary: region === 'us' ? 'text-blue-800' :
                 region === 'uk' ? 'text-indigo-900' :
                 region === 'au' ? 'text-green-800' :
                 'text-red-800',
    
    textSecondary: region === 'us' ? 'text-red-700' :
                   region === 'uk' ? 'text-rose-700' :
                   region === 'au' ? 'text-amber-700' :
                   'text-red-700',
    
    border: region === 'us' ? 'border-blue-300' :
            region === 'uk' ? 'border-indigo-300' :
            region === 'au' ? 'border-green-300' :
            'border-red-300',
    
    accentColor: region === 'us' ? 'text-blue-700' :
                 region === 'uk' ? 'text-indigo-800' :
                 region === 'au' ? 'text-green-700' :
                 'text-red-700',
                 
    headerBg: region === 'us' ? 'bg-blue-50' :
              region === 'uk' ? 'bg-indigo-50' :
              region === 'au' ? 'bg-green-50' :
              'bg-red-50',
              
    flag: theme.flag
  };
}
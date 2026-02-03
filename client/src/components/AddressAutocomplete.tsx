import { useState, useEffect, useRef } from 'react';
import { Loader2, MapPin } from 'lucide-react';

interface Suggestion {
    display_name: string;
    address: {
        road?: string;
        house_number?: string;
        city?: string;
        town?: string;
        village?: string;
        state?: string;
        postcode?: string;
        country?: string;
    };
    lat: string;
    lon: string;
}

interface AddressAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    onSelect: (address: string, city: string, postalCode: string, country: string) => void;
}

const AddressAutocomplete = ({ value, onChange, onSelect }: AddressAutocompleteProps) => {
    const [query, setQuery] = useState(value);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setQuery(value);
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchSuggestions = async (input: string) => {
        if (input.length < 3) return;
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&addressdetails=1&limit=5`
            );
            const data = await response.json();
            setSuggestions(data);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Error fetching address suggestions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Debounce manual implementation
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query && query !== value && query.length > 2) {
                fetchSuggestions(query);
            }
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [query]);

    const handleSelect = (suggestion: Suggestion) => {
        const addr = suggestion.address;
        const street = [addr.house_number, addr.road].filter(Boolean).join(' ');
        const city = addr.city || addr.town || addr.village || '';
        const postalCode = addr.postcode || '';
        const country = addr.country || '';

        const fullAddress = street || suggestion.display_name.split(',')[0];

        onChange(fullAddress);
        onSelect(fullAddress, city, postalCode, country);
        setShowSuggestions(false);
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        onChange(e.target.value);
                    }}
                    className="w-full bg-off-black border border-white/20 p-4 pl-12 text-white focus:border-neon-green outline-none transition-colors"
                    placeholder="Start typing specific address..."
                    required
                />
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                {isLoading && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Loader2 className="animate-spin text-neon-green w-5 h-5" />
                    </div>
                )}
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(suggestion)}
                            className="p-4 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-none flex items-start gap-3 transition-colors group"
                        >
                            <MapPin className="w-5 h-5 text-gray-500 group-hover:text-neon-green mt-1 flex-shrink-0 transition-colors" />
                            <div>
                                <p className="text-white text-sm font-medium group-hover:text-neon-green transition-colors">
                                    {suggestion.display_name.split(',')[0]}
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                    {suggestion.display_name.split(',').slice(1).join(',')}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="p-2 bg-black/50 text-right">
                        <span className="text-[10px] text-gray-600">Powered by OpenStreetMap</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressAutocomplete;

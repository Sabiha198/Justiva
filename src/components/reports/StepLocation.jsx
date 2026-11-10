
import { useState } from "react";
import { FiMapPin, FiCrosshair, FiArrowLeft } from "react-icons/fi";
import Button from "../ui/Button";
import { Input, Label, ErrorText, HelpText } from "../ui/Field";
import { useToast } from "../../context/ToastContext";



export default function StepLocation({ data, onNext, onBack }) {
  const [location, setLocation] = useState(data.location || "");
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locating, setLocating] = useState(false);

  const toast = useToast();

  // const filtered =
  //   location.length > 1
  //     ? suggestions.filter((s) =>
  //         s.toLowerCase().includes(location.toLowerCase())
  //       )
  //     : [];

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location is not supported by your browser.");
      return;
    }

    setLocating(true);
    setError("");
    setShowSuggestions(false);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Could not find your address.");
          }

          const result = await response.json();

          const address = result.address || {};

          const readableAddress = [
            address.road,
            address.neighbourhood,
            address.suburb,
            address.city_district,
            address.city || address.town || address.village,
            address.state,
            address.country,
          ]
            .filter(Boolean)
            .join(", ");

          if (!readableAddress) {
            setLocation(`${latitude}, ${longitude}`);
            toast.success("Location detected, but the address was unavailable.");
          } else {
            setLocation(readableAddress);
            toast.success("Your current location was detected.");
          }
        } catch (error) {
          console.error("Reverse geocoding error:", error);

          // If address lookup fails, keep the coordinates
          // so the user still has a usable location.
          setLocation(`${latitude}, ${longitude}`);

          toast.error(
            "Address lookup failed. Your coordinates were added instead."
          );
        } finally {
          setLocating(false);
        }
      },
      (error) => {
        setLocating(false);

        if (error.code === error.PERMISSION_DENIED) {
          toast.error(
            "Location permission was denied. Please allow location access."
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          toast.error("Your location could not be detected.");
        } else if (error.code === error.TIMEOUT) {
          toast.error("Location detection timed out.");
        } else {
          toast.error("Unable to detect your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!location.trim()) {
      setError("Add a location, or use your current position.");
      return;
    }

    onNext({ location });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <Label htmlFor="location" required>
          Location
        </Label>

        <div className="relative">
          <FiMapPin className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />

          <Input
            id="location"
            className="pl-10"
            placeholder="Enter location or use current position"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setError("");
              setShowSuggestions(true);
            }}
            error={error}
            autoComplete="off"
          />
        </div>

        <ErrorText>{error}</ErrorText>

        {showSuggestions && filtered.length > 0 && (
          <ul className="mt-1.5 overflow-hidden rounded-md border border-line bg-white shadow-card">
            {filtered.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => {
                    setLocation(s);
                    setShowSuggestions(false);
                  }}
                  className="block w-full px-3.5 py-2.5 text-left text-sm text-slate-600 hover:bg-navy-50"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={useCurrentLocation}
          disabled={locating}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-navy-800 hover:text-brass-600 disabled:opacity-60"
        >
          {locating ? (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <FiCrosshair className="h-4 w-4" />
          )}

          {locating ? "Detecting location..." : "Use my current location"}
        </button>

        <HelpText>
          Location is used to route your report to the right department.
        </HelpText>

        <p className="mt-2 text-xs text-slate-400">
          Location is only detected when you choose to use your current
          location.
        </p>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          <FiArrowLeft /> Back
        </Button>

        <Button type="submit" variant="brass" className="flex-1">
          Continue
        </Button>
      </div>
    </form>
  );
}

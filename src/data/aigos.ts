export type AigosImage = {
  src: string;
  label: string;
  desc: string;
};

// Designed App Store screenshots (phone portrait).
// Drop the files into public/projects/aigos/ with these exact names.
export const aigosImages: AigosImage[] = [
  { src: "/projects/aigos/01_designed.png", label: "Calculate", desc: "Vehicle, route inputs, and the driving profile in one screen." },
  { src: "/projects/aigos/02_designed.png", label: "Result Breakdown", desc: "PHP 1,145.96 with all eight cost factors itemized." },
  { src: "/projects/aigos/03_designed.png", label: "Talk to aigos", desc: "A Tagalog trip query answered offline in seconds." },
  { src: "/projects/aigos/04_designed.png", label: "Vehicle Knowledge", desc: "Vios km/L looked up with one-tap prefill." },
  { src: "/projects/aigos/05_designed.png", label: "Prices", desc: "Six DOE fuel grades, tap-to-edit inline." },
  { src: "/projects/aigos/06_designed.png", label: "History", desc: "Monthly PHP total, trip list, and comparison." },
  { src: "/projects/aigos/07_designed.png", label: "GPS Comparison", desc: "96% estimate accuracy on a real road." },
  { src: "/projects/aigos/08_designed.png", label: "Driving Insights", desc: "Score ring, component breakdown, and tips." },
];

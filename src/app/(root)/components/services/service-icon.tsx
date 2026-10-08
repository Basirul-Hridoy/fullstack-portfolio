import {
  FaCode,
  FaFacebookF,
  FaGoogle,
  FaMapMarkerAlt,
  FaPenNib,
  FaUsers,
  FaVideo,
  FaYoutube,
} from "react-icons/fa";

const iconMap = {
  users: FaUsers,
  facebook: FaFacebookF,
  google: FaGoogle,
  youtube: FaYoutube,
  location: FaMapMarkerAlt,
  video: FaVideo,
  code: FaCode,
  pen: FaPenNib,
} as const;

export function ServiceIcon({ name }: { name: string }) {
  const Icon = iconMap[name as keyof typeof iconMap] || FaCode;

  return <Icon className="h-8 w-8" aria-hidden="true" />;
}

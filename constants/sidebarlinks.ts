import { Home, MessageCircle, SearchCheck, Star, User } from "lucide-react";

export const sidebarlinks = [
  {
    label: "Home",
    href: "/dashboard",
    Icon: Home,
  },
  {
    label: "Explore",
    href: "/dashboard/explore",
    Icon: SearchCheck,
  },
  {
    label: "likes | Suggestions",
    href: "/dashboard/suggestions",
    Icon: Star,
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    Icon: MessageCircle,
  },
  {
    label: "profile",
    href: "/dashboard/user_profile",
    Icon: User,
  },
];

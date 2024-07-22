import {
  Atom,
  Link,
  LocateIcon,
  LockKeyhole,
  MessageCircleHeart,
  User2Icon,
} from "lucide-react";

export const reviews = [
  {
    userName: "Rebecca",
    image: "/assets/avatar1.jpeg",
    review:
      "I was also adamant the next man I'd be with and commit to, would be the man I'd spend the rest of my life with (just not married). I was very fussy and didn't expect to meet a man on Tinder. I decided to sign up anyways and just match away and see what happened.",
  },
  {
    userName: "Lauren",
    image: "/assets/avatar2.jpeg",
    review:
      "For all the single people out there, especially introverted ones like us: do not be afraid to travel outside of your comfort zone. That’s where you’ll make a genuine connection. Tinder brought us together and for that, I am forever grateful. ❤",
  },
  {
    userName: "Franklin",
    image: "/assets/avatar3.jpeg",
    review:
      "He hit me with one the WORST pick up lines I had ever seen, but being bored at work, I decided to reply. From there we never stopped talking, dating each other and falling deeper in love.",
  },
];

export const features = [
  {
    title: "Profile Matching",
    desc: "Discover potential matches by swiping through profiles. Swipe right if you're interested, left if you're not. It's a fun and easy way to find your perfect match!",
    Icon: Link,
  },
  {
    title: "Instant Messaging",
    desc: " Connect instantly with your matches through Telegram's secure messaging system. Start chatting and get to know each other better without leaving the app",
    Icon: MessageCircleHeart,
  },
  {
    title: "Profile Customization",
    desc: "Create a stunning profile by adding photos and a bio. Let others know more about you and what you're looking for in a match.",
    Icon: User2Icon,
  },
  {
    title: "Location-Based Matching",
    desc: " Find matches nearby with our location-based feature. Meet new people in your area for convenient dates and hangouts.",
    Icon: LocateIcon,
  },
  {
    title: "Interest Tags",
    desc: "Highlight your hobbies and interests with tags. Find matches who share your passions and build connections based on common interests.",
    Icon: Atom,
  },
  {
    title: "Privacy and Security",
    desc: "Your privacy is our top priority. Enjoy secure and confidential conversations, with your personal information always protected.",
    Icon: LockKeyhole,
  },
];

// Single source of truth for all five versions. Facts come from ventureforgeaustin.org,
// thelionsdendfw.org and thelionsden.us. Do not invent facts beyond this file.

export const brand = {
  name: "Venture Forge",
  tagline: "Investing in innovation. Forging eternal impact.",
  short: "Faith · Capital · Calling",
  description:
    "Venture Forge connects Christ-centered investors, founders, and business leaders through annual summits and pitch competitions in cities across the country.",
};

export const links = {
  register: "https://www.eventmagic.ai/e/4d9177a1-bee9-4804-8bf6-e56efada41d8",
  sponsor: "https://www.zeffy.com/en-US/ticketing/venture-forge-austin-sponsorship",
  applyToPitch: "https://www.thelionsdendfw.org/apply-to-pitch.html",
  give: "https://www.thelionsdendfw.org/give.html",
};

export const nav = [
  { label: "Locations", href: "#locations" },
  { label: "Strategy", href: "#strategy" },
  { label: "Speakers", href: "#speakers" },
  { label: "Vision", href: "#vision" },
  { label: "Partners", href: "#partners" },
];

export type Location = {
  slug: string;
  city: string;
  state: string;
  status: "active" | "coming-soon";
  formerly?: string;
  event?: string;
  dates?: string;
  venue?: string;
  note?: string;
  photo?: string;
  lat: number;
  lng: number;
};

export const locations: Location[] = [
  {
    slug: "austin", city: "Austin", state: "Texas", status: "active",
    event: "Venture Forge Summit", dates: "September 23–24, 2026", venue: "Riverbend Centre",
    note: "150 investors and business leaders. Founders showcase, keynotes, panels.",
    photo: "/photos/austin-skyline.jpg", lat: 30.2672, lng: -97.7431,
  },
  {
    slug: "dallas-fort-worth", city: "Dallas–Fort Worth", state: "Texas", status: "active",
    formerly: "The Lion's Den DFW",
    event: "Pitch Competition and Conference", dates: "March 31–April 1, 2027", venue: "Dallas, Texas",
    note: "12th annual. Two-day conference and pitch competition.",
    photo: "/photos/dallas-skyline.jpg", lat: 32.7767, lng: -96.797,
  },
  {
    slug: "birmingham", city: "Birmingham", state: "Alabama", status: "active",
    formerly: "The Lions Den",
    event: "Pitch Competition and Professional Summit", dates: "October 14–16, 2026", venue: "The Harbert Center",
    note: "13th annual. Welcome dinner, main event, accredited investor meeting.",
    photo: "/photos/birmingham-panel.jpg", lat: 33.5186, lng: -86.8104,
  },
  {
    slug: "silicon-valley", city: "Silicon Valley", state: "California", status: "active",
    photo: undefined, lat: 37.3875, lng: -122.0575,
  },
  {
    slug: "franklin", city: "Franklin", state: "Tennessee", status: "coming-soon",
    lat: 35.9251, lng: -86.8689,
  },
];

export const stats = [
  { value: "5", label: "Locations" },
  { value: "13", label: "Years of pitch competitions" },
  { value: "2", label: "Days per summit" },
  { value: "150+", label: "Leaders per summit" },
];

export const strategy = [
  { title: "Accelerate ventures", body: "Connecting Christ-centered entrepreneurs with relationships, resources, and capital." },
  { title: "Galvanize the ecosystem", body: "Uniting entrepreneurs, investors, churches, nonprofits, universities, and civic groups." },
  { title: "Showcase, equip, expand", body: "Celebrating faithful entrepreneurship and expanding Kingdom investing." },
];

export const audiences = [
  { title: "Investors", body: "Access to curated, faith-driven businesses and mission-aligned strategies.", cta: "Register", href: links.register },
  { title: "Founders", body: "Pitch to investors, get feedback, and meet other Kingdom-minded entrepreneurs.", cta: "Apply to pitch", href: links.applyToPitch },
  { title: "Partners", body: "Put your organization in front of faith-driven business leaders.", cta: "Sponsor", href: links.sponsor },
];

export const format = [
  { title: "Opening night", body: "Reception, keynote, and panel." },
  { title: "Founders showcase and pitch competition", body: "Founders present real ventures to investors and judges." },
  { title: "Panels and keynotes", body: "Due diligence, stewardship, partnership, and what founders wish investors understood." },
  { title: "Networking", body: "Curated introductions across founders, investors, churches, nonprofits, and universities." },
];

export const investmentModel = [
  { title: "Growth-first", share: "75% of portfolio", body: "Superior economic returns, strong product/market fit, seed through Series A/B." },
  { title: "Impact-first", share: "25% of portfolio", body: "Sustainable solutions to poverty, healthcare, education, and affordable housing." },
];

export type Speaker = { name: string; org: string; role?: string; photo?: string };

export const keynote: Speaker & { location: string; bio: string } = {
  name: "Stephen Ellsworth", org: "poppi", role: "Co-Founder", location: "Dallas–Fort Worth 2026 keynote",
  bio: "Co-founded poppi in 2016. Acquired by PepsiCo in March 2025 for $1.95 billion.",
};

export const speakers: Speaker[] = [
  { name: "Mark McClain", org: "SailPoint Technologies", role: "Founder and CEO", photo: "/speakers/mark-mcclain.jpg" },
  { name: "Renji Bijoy", org: "Immersed", role: "Founder and CEO", photo: "/speakers/renji-bijoy.jpg" },
  { name: "Joel Trammell", org: "XpertLoop.ai", role: "CEO and Co-Founder", photo: "/speakers/joel-trammell.jpg" },
  { name: "Jake Thomsen", org: "Sovereign's Capital", role: "Managing Partner", photo: "/speakers/jake-thomsen.jpg" },
  { name: "Caren Kelleher", org: "Gold Rush Vinyl", role: "Founder and CEO", photo: "/speakers/caren-kelleher.jpg" },
  { name: "Rich Carney", org: "In the City for the City", role: "Founder", photo: "/speakers/rich-carney.jpg" },
  { name: "Jon Werner", org: "FIESTA", role: "Co-Founder", photo: "/speakers/jon-werner.jpg" },
  { name: "Jeff Johns", org: "Impact Foundation", role: "Co-Founder and CEO", photo: "/speakers/jeff-johns.jpg" },
  { name: "Ryan Streeter", org: "The Civitas Institute, University of Austin", role: "Executive Director", photo: "/speakers/ryan-streeter.jpg" },
  { name: "Richard Cunningham", org: "Sovereign's Capital", role: "VP, Faith Driven Investing", photo: "/speakers/richard-cunningham.jpg" },
  { name: "Wesley Fang", org: "Kingdom Capital Network", role: "Executive Director", photo: "/speakers/wesley-fang.jpg" },
  { name: "Cameron Deike", org: "Prosper CFO", role: "President and Founder", photo: "/speakers/cameron-deike.jpg" },
  { name: "Derek Welborn", org: "Saints Western", role: "Founder", photo: "/speakers/derek-welborn.jpg" },
  { name: "Scott Harris", org: "Social Factor", role: "Co-Founder", photo: "/speakers/scott-harris.jpg" },
  { name: "Brett Ender & Harry Gray", org: "Noble Origins", role: "Founders", photo: "/speakers/brett-ender-harry-gray.jpg" },
  { name: "Sean Riley", org: "The Stony Brook School", role: "Chief Strategy Officer", photo: "/speakers/sean-riley.jpg" },
  { name: "Patrick Farrell", org: "Keystone Investing", role: "Founder and Executive Director", photo: "/speakers/patrick-farrell.jpg" },
  { name: "Todd Engstrom", org: "Greater Austin Mission Society", role: "Executive Director", photo: "/speakers/todd-engstrom.jpg" },
  { name: "Jenn Mazzola", org: "Northpoint Austin", role: "MC", photo: "/speakers/jenn-mazzola.jpg" },
  { name: "Ryan O'Keefe", org: "ATX Technology Prayer Breakfast", role: "Co-Founder", photo: "/speakers/ryan-okeefe.jpg" },
  { name: "Luke Cochran", org: "PRAY ATX", role: "Prayer Partner", photo: "/speakers/luke-cochran.jpg" },
];

export const winners2026 = {
  heading: "2026 pitch winners, Dallas–Fort Worth",
  items: [
    { award: "Overall winner", company: "Haiven" },
    { award: "Best Kingdom impact", company: "reFrontier Group" },
    { award: "Best financial impact", company: "Theo App from Familify" },
  ],
};

export const foundersShowcase = [
  { name: "Noble Origins", logo: "/logos/noble-origins.png", href: "https://nobleorigins.com" },
  { name: "Social Factor", logo: "/logos/social-factor.png", href: "https://socialfactor.com" },
  { name: "Prosper CFO", logo: "/logos/prosper-cfo.png", href: "https://prospercfo.com" },
  { name: "Sycamore Equity", logo: "/logos/sycamore-equity.png", href: "https://sycamoreequity.com/austin-ministry-housing-fund" },
  { name: "Saints Western", logo: "/logos/saints-western.png", href: "https://saintswestern.com" },
];

export const partners = [
  { name: "Sovereign's Capital", logo: "/logos/sovereigns.png" },
  { name: "Impact Foundation", logo: "/logos/impact-foundation-color.png" },
  { name: "Immersed", logo: "/logos/immersed-logo.png" },
  { name: "Orderly AI", logo: "/logos/orderly-ai-logo.png" },
  { name: "SVC", logo: "/logos/svc.svg" },
  { name: "Fiesta", logo: "/logos/fiesta.png" },
  { name: "LiftUp", logo: "/logos/liftup.png" },
  { name: "LivingWater", logo: "/logos/livingwater.png" },
  { name: "Lamp Post Coffee", logo: "/logos/lamppost.png" },
  { name: "Austin Christian University", logo: "/logos/acu.png" },
  { name: "Concordia University Texas", logo: "/logos/concordia.png" },
];
// Other sponsors named on the source sites (text only, no logo files):
export const partnerNames = ["Ronald Blue Trust", "Terra Firma Foods", "GuideStone", "Faith Driven Investor", "Harvard Grace Capital", "Ten Capital", "Coca-Cola Consolidated", "Global Hope Network"];

export const vision = {
  heading: "Vision",
  body: "Venture Forge exists to fuel the growth of the Kingdom economy by investing in transformative, faith-driven entrepreneurship. Our vision is to be the hub where faith-driven capital, ventures, and leaders meet.",
  quote: "Great ventures aren't simply launched. They're forged.",
};

export const testimonials = [
  { quote: "Compelling content and great connections." },
  { quote: "The network dinner is an amazing event. It proved a wonderful way to meet both other entrepreneurs and investors potentially interested in our companies." },
  { quote: "It was really valuable to see other startup pitch decks and to hear the feedback of the investors." },
  { quote: "You will leave a legacy. What's that legacy going to be?", name: "Ed Pearce", role: "Founder, Dallas–Fort Worth" },
];

export const video = {
  recap: { src: "/video/recap.mp4", poster: "/video/recap-poster.jpg", label: "Austin 2026 recap", duration: "1:04", hasAudio: true },
  skyline: { src: "/video/austin-skyline.mp4", poster: "/video/austin-skyline-poster.jpg", label: "Austin skyline loop (7s, silent, for backgrounds)" },
};

// Real event photos (1100px wide unless noted). Names describe the shot.
export const photos = {
  wide: ["/photos/ballroom-wide.jpg", "/photos/ballroom-wide-2.jpg", "/photos/auditorium-wide.jpg", "/photos/auditorium-audience.jpg", "/photos/banquet-wide.jpg", "/photos/expo-crowd.jpg"],
  stage: ["/photos/speaker-podium.jpg", "/photos/speaker-woman-stage.jpg", "/photos/fireside-chat.jpg", "/photos/panel-two-men.jpg", "/photos/panel-stage-blue.jpg", "/photos/speaker-dark-room.jpg", "/photos/panel-four-men.jpg", "/photos/speaker-mic-dark.jpg", "/photos/speaker-blue-screen.jpg", "/photos/panel-four-stage.jpg", "/photos/panel-bright-room.jpg", "/photos/birmingham-panel.jpg"],
  people: ["/photos/conversation-two-men.jpg", "/photos/handshake.jpg", "/photos/networking-three-men.jpg", "/photos/lunch-table.jpg", "/photos/two-women-smiling.jpg", "/photos/two-women-laptop.jpg", "/photos/table-conversation.jpg", "/photos/conversation-two.jpg", "/photos/audience-smiling.jpg", "/photos/networking-lanyards.jpg", "/photos/founders-laptops.jpg", "/photos/one-on-one-meeting.jpg", "/photos/audience-taking-notes.jpg", "/photos/networking-handshake-2.jpg", "/photos/two-women-greeting.jpg", "/photos/audience-listening.jpg"],
  groups: ["/photos/finalists-on-stage.jpg", "/photos/winners-on-stage.jpg", "/photos/group-portrait.jpg"],
  cities: ["/photos/austin-skyline.jpg", "/photos/dallas-skyline.jpg"],
  // Stock-looking images from the Austin site. Prefer the real photos above.
  stock: ["/photos/forge-sparks.jpg", "/photos/summit-attendees.jpg"],
};

export const footer = {
  legal: "© 2026 Venture Forge. All rights reserved.",
  columns: [
    { title: "Locations", items: locations.map((l) => ({ label: l.city, href: "#locations" })) },
    { title: "Get involved", items: [
      { label: "Register", href: links.register },
      { label: "Apply to pitch", href: links.applyToPitch },
      { label: "Sponsor", href: links.sponsor },
      { label: "Give", href: links.give },
    ] },
  ],
};

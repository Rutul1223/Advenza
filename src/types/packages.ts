export interface TravelPackage {
  id: number;
  image: string;
  title: string;
  duration: string;
  price: string;
  details: string;
  description: string;
  category?: string;
  status: 'active' | 'inactive';
  rating?: number;
  location?: string;
  reviewsCount?: number;
  itinerary?: string[];
  inclusions?: string[];
  exclusions?: string[];
  availability?: {
    startDate: string; // ISO date string, e.g., "2025-10-01"
    duration: string; // Specific duration for this batch, e.g., "7 Days"
    totalTickets: number; // Total tickets available for this batch
    bookedTickets: number; // Tickets booked for this batch
    availableTickets?: number; // Calculated as totalTickets - bookedTickets
  }[];
  tags?: string[];
  mapEmbedUrl?: string;
  bookingUrl?: string;
  readyToPickup?: {
    city: string;
    spots: {
      location: string;
      timing: string;
    }[];
  }[];
};
export interface Booking {
  id: number;
  packageId: number;
  packageTitle: string;
  customerName: string;
  customerEmail: string;
  travelDate: string;
  travelers: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
};

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  lastBookingDate: string | null;
};

export const packagesData: TravelPackage[] = [
  {
    id: 1,
    title: "Rajasthan Desert Safari",
    description: "Camel rides, cultural shows, and desert camping under the stars.",
    details: "Experience the thrill of the Thar Desert. Ride camels across dunes, enjoy folk music, and sleep under the stars in traditional tents.",
    image: "https://media1.thrillophilia.com/filestore/edx1f0kp585fn1eyoc1v7d0oezgw_Desert-Safari.jpg?w=400&dpr=2",
    duration: "3 Days",
    price: "9,500",
    location: "Jaisalmer, Rajasthan",
    category: "Desert",
    status: 'active',
    rating: 4.6,
    reviewsCount: 210,
    itinerary: ["Day 1: Arrival & Welcome Dinner", "Day 2: Camel Safari & Cultural Night", "Day 3: Morning Ride & Departure"],
    inclusions: ["Camel Ride", "Folk Show", "2 Night Accommodation", "Meals"],
    exclusions: ["Airfare", "Travel Insurance"],
    availability: [
      { startDate: "2025-10-01", duration: "3 Days", totalTickets: 30, bookedTickets: 20, availableTickets: 10 },
      { startDate: "2025-11-15", duration: "4 Days", totalTickets: 40, bookedTickets: 25, availableTickets: 15 },
      { startDate: "2025-12-10", duration: "3 Days", totalTickets: 30, bookedTickets: 20, availableTickets: 10 },
    ],
    tags: ["Adventure", "Culture", "Desert"],
    mapEmbedUrl: "https://maps.google.com/...",
    bookingUrl: "https://yourwebsite.com/checkout/rajasthan-safari",
    readyToPickup: [
      {
        city: "Ahmedabad",
        spots: [
          { location: "ISKCON Temple", timing: "6:00 AM" },
          { location: "Sabarmati Ashram", timing: "6:30 AM" },
          { location: "Airport", timing: "5:00 AM" }
        ]
      },
      {
        city: "Rajasthan",
        spots: [
          { location: "Jaisalmer", timing: "6:00 AM" },
          { location: "Jaipur", timing: "6:30 AM" },
          { location: "Kota", timing: "5:00 AM" }
        ]
      },
      {
        city: "Jaisalmer",
        spots: [
          { location: "Jaisalmer", timing: "6:00 AM" },
          { location: "Jaipur", timing: "6:30" },
          { location: "Kota", timing: "5:00 AM" }
        ]
      },

    ]
  },
  {
    id: 2,
    title: "Kerala Backwater Escape",
    description: "A serene houseboat journey through Kerala's backwaters.",
    details: "Sail through the tranquil backwaters of Alleppey in a traditional houseboat. Enjoy fresh seafood, coconut groves, and a glimpse into rural Kerala life.",
    image: "https://dwq3yv87q1b43.cloudfront.net/public/blogs/fit-in/1200x675/Blog_20241010-942624340-1728560023.jpg",
    duration: "4 Days",
    price: "10,500",
    location: "Alleppey, Kerala",
    category: "Backwater",
    status: 'active',
    rating: 4.8,
    reviewsCount: 185,
    itinerary: ["Day 1: Houseboat Check-in & Cruise", "Day 2: Village Tour & Local Cuisine", "Day 3: Bird Watching & Sunset View", "Day 4: Checkout & Return"],
    inclusions: ["Houseboat Stay", "Meals", "Guide", "Transfers"],
    exclusions: ["Flights", "Alcohol"],
    availability: [
      { startDate: "2025-11-05", duration: "4 Days", totalTickets: 20, bookedTickets: 20, availableTickets: 0 },
      { startDate: "2025-12-20", duration: "5 Days", totalTickets: 25, bookedTickets: 13, availableTickets: 12 },
      { startDate: "2026-01-10", duration: "4 Days", totalTickets: 20, bookedTickets: 10, availableTickets: 10 },
    ],
    tags: ["Nature", "Relaxation", "Houseboat"],
    mapEmbedUrl: "https://maps.google.com/...",
    bookingUrl: "https://yourwebsite.com/checkout/kerala-backwaters",
    readyToPickup: [
      {
        city: "Ahmedabad",
        spots: [
          { location: "ISKCON Temple", timing: "6:00 AM" },
          { location: "Sabarmati Ashram", timing: "6:30 AM" },
          { location: "Airport", timing: "5:00 AM" }
        ]
      },
      {
        city: "Uttarakhand",
        spots: [
          {location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },
      {
        city: "Delhi",
        spots: [
          { location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },
    ]
  },
  {
    id: 3,
    title: "Manali Snow Adventure",
    description: "Snow activities, scenic views, and cozy stays in Manali.",
    details: "Engage in thrilling snow sports, soak in the mountain views, and enjoy warm hospitality in the heart of Himachal Pradesh.",
    image: "https://solangvalleyresorts.com/wp-content/uploads/2021/12/venture.jpg",
    duration: "5 Days",
    price: "11,000",
    location: "Manali, Himachal Pradesh",
    category: "Snow",
    status: 'active',
    rating: 4.7,
    reviewsCount: 152,
    itinerary: ["Day 1: Arrival & Mall Road Visit", "Day 2: Snow Sports in Solang Valley", "Day 3: Rohtang Pass", "Day 4: Local Markets", "Day 5: Departure"],
    inclusions: ["Stay", "Meals", "Ski Equipment", "Local Tours"],
    exclusions: ["Permits for Rohtang", "Travel to Manali"],
    availability: [
      { startDate: "2025-12-01", duration: "5 Days", totalTickets: 30, bookedTickets: 20, availableTickets: 10 },
      { startDate: "2026-01-15", duration: "6 Days", totalTickets: 30, bookedTickets: 20, availableTickets: 10 },
      { startDate: "2026-02-10", duration: "5 Days", totalTickets: 30, bookedTickets: 20, availableTickets: 10 },
    ],
    tags: ["Adventure", "Snow", "Hills"],
    mapEmbedUrl: "https://maps.google.com/...",
    bookingUrl: "https://yourwebsite.com/checkout/manali-snow",
    readyToPickup: [{
        city: "Ahmedabad",
        spots: [
          { location: "ISKCON Temple", timing: "6:00 AM" },
          { location: "Sabarmati Ashram", timing: "6:30 AM" },
          { location: "Airport", timing: "5:00 AM" }
        ]
      },
      {
        city: "Uttarakhand",
        spots: [
          {location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },
      {
        city: "Delhi",
        spots: [
          { location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },],
  },
  {
    id: 4,
    title: "Meghalaya Cave Exploration",
    description: "Discover hidden caves and waterfalls in lush Meghalaya.",
    details: "Explore natural limestone caves, trek through green valleys, and witness pristine waterfalls in the abode of clouds.",
    image: "https://images.unsplash.com/photo-1572587356426-b33bf42f999b?ixid=M3wxMzcxOTN8MHwxfHNlYXJjaHw2fHxjYXZlfGVufDB8fHx8MTcwODU2ODU4OHww&ixlib=rb-4.0.3&fm=jpg&w=5774&h=3849&fit=max",
    duration: "6 Days",
    price: "13,200",
    location: "Cherrapunji, Meghalaya",
    category: "Cave",
    status: 'active',
    rating: 4.5,
    reviewsCount: 98,
    itinerary: ["Day 1: Shillong Arrival", "Day 2: Mawsmai & Arwah Caves", "Day 3: Nohkalikai Falls", "Day 4: Mawlynnong Village", "Day 5: Dawki River", "Day 6: Departure"],
    inclusions: ["Guided Tours", "Accommodation", "Transfers"],
    exclusions: ["Personal Expenses", "Meals on Travel Days"],
    availability: [
      { startDate: "2025-07-10", duration: "6 Days", totalTickets: 20, bookedTickets: 12, availableTickets: 8 },
      { startDate: "2025-08-15", duration: "7 Days", totalTickets: 25, bookedTickets: 13, availableTickets: 12 },
      { startDate: "2025-09-05", duration: "6 Days", totalTickets: 20, bookedTickets: 10, availableTickets: 10 },
    ],
    tags: ["Exploration", "Waterfalls", "Caves"],
    mapEmbedUrl: "https://maps.google.com/...",
    bookingUrl: "https://yourwebsite.com/checkout/meghalaya-caves",
    readyToPickup: [{
        city: "Ahmedabad",
        spots: [
          { location: "ISKCON Temple", timing: "6:00 AM" },
          { location: "Sabarmati Ashram", timing: "6:30 AM" },
          { location: "Airport", timing: "5:00 AM" }
        ]
      },
      {
        city: "Uttarakhand",
        spots: [
          {location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },
      {
        city: "Delhi",
        spots: [
          { location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },],
  },
  {
    id: 5,
    title: "Andaman Island Hopping",
    description: "Snorkeling, scuba diving, and turquoise beaches await you.",
    details: "Hop between Andaman's most scenic islands including Havelock, Neil, and Ross. Enjoy marine life, beach dinners, and coral reefs.",
    image: "https://i0.wp.com/weekendyaari.in/wp-content/uploads/2024/11/andam-tour-.jpg?fit=1280%2C721&ssl=1",
    duration: "5 Days",
    price: "18,000",
    location: "Port Blair, Andaman & Nicobar",
    category: "Beach",
    status: 'active',
    rating: 4.9,
    reviewsCount: 204,
    itinerary: ["Day 1: Arrival at Port Blair", "Day 2: Havelock Island", "Day 3: Neil Island", "Day 4: Ross Island", "Day 5: Departure"],
    inclusions: ["Ferry Transfers", "Beach Stays", "Water Activities"],
    exclusions: ["Scuba Equipment Charges", "Airfare"],
    availability: [
      { startDate: "2025-10-05", duration: "5 Days", totalTickets: 30, bookedTickets: 20, availableTickets: 10 },
      { startDate: "2025-11-20", duration: "6 Days", totalTickets: 30, bookedTickets: 20, availableTickets: 10 },
      { startDate: "2025-12-15", duration: "5 Days", totalTickets: 30, bookedTickets: 20, availableTickets: 10 },
    ],
    tags: ["Beach", "Diving", "Island"],
    mapEmbedUrl: "https://maps.google.com/...",
    bookingUrl: "https://yourwebsite.com/checkout/andaman-hopping",
    readyToPickup: [{
        city: "Ahmedabad",
        spots: [
          { location: "ISKCON Temple", timing: "6:00 AM" },
          { location: "Sabarmati Ashram", timing: "6:30 AM" },
          { location: "Airport", timing: "5:00 AM" }
        ]
      },
      {
        city: "Uttarakhand",
        spots: [
          {location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },
      {
        city: "Delhi",
        spots: [
          { location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },],
  },
  {
    id: 6,
    title: "Ladakh Biking Expedition",
    description: "An adrenaline-packed bike ride through high-altitude terrains.",
    details: "Embark on a thrilling biking expedition",
    image: "https://thedreamridersgroup.com/listing/9/Explore%20Ladakh%20on%20two%20wheels,Morey%20Plains.jpg",
    duration: "8 Days",
    price: "22,000",
    location: "Leh-Ladakh",
    category: "Bike Ride",
    status: 'active',
    rating: 4.9,
    reviewsCount: 233,
    itinerary: ["Day 1: Leh Acclimatization", "Day 2: Khardung La", "Day 3: Nubra Valley", "Day 4: Pangong Lake", "Day 5-7: Local Exploration", "Day 8: Departure"],
    inclusions: ["Bike", "Fuel", "Meals", "Guide", "Helmet"],
    exclusions: ["Damage Charges", "Airfare"],
    availability: [
      { startDate: "2025-06-10", duration: "8 Days", totalTickets: 40, bookedTickets: 30, availableTickets: 10 },
      { startDate: "2025-07-15", duration: "9 Days", totalTickets: 40, bookedTickets: 30, availableTickets: 10 },
      { startDate: "2025-08-05", duration: "8 Days", totalTickets: 40, bookedTickets: 30, availableTickets: 10 },
    ],
    tags: ["Adventure", "Motorcycle", "High Altitude"],
    mapEmbedUrl: "https://maps.google.com/...",
    bookingUrl: "https://yourwebsite.com/checkout/ladakh-ride",
    readyToPickup: [{
        city: "Ahmedabad",
        spots: [
          { location: "ISKCON Temple", timing: "6:00 AM" },
          { location: "Sabarmati Ashram", timing: "6:30 AM" },
          { location: "Airport", timing: "5:00 AM" }
        ]
      },
      {
        city: "Uttarakhand",
        spots: [
          {location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },
      {
        city: "Delhi",
        spots: [
          { location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },],
  },
  {
    id: 7,
    title: "Coorg Coffee Trail",
    description: "Explore coffee plantations, waterfalls, and misty hills.",
    details: "Breathe in the aroma of coffee estates, trek to waterfalls, and enjoy Kodava hospitality.",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/03/f3/a7/4b/coffee-trails-coorg.jpg",
    duration: "3 Days",
    price: "9,000",
    location: "Coorg, Karnataka",
    category: "Nature",
    status: 'active',
    rating: 4.3,
    reviewsCount: 121,
    itinerary: ["Day 1: Plantation Walk", "Day 2: Abbey Falls", "Day 3: Local Cuisine & Return"],
    inclusions: ["Homestay", "Guide", "Breakfast"],
    exclusions: ["Lunch & Dinner", "Travel Insurance"],
    availability: [
      { startDate: "2025-08-01", duration: "3 Days", totalTickets: 20, bookedTickets: 12, availableTickets: 8 },
      { startDate: "2025-09-10", duration: "4 Days", totalTickets: 25, bookedTickets: 13, availableTickets: 12 },
      { startDate: "2025-10-05", duration: "3 Days", totalTickets: 20, bookedTickets: 10, availableTickets: 10 },
    ],
    tags: ["Hills", "Coffee", "Relaxation"],
    mapEmbedUrl: "https://maps.google.com/...",
    bookingUrl: "https://yourwebsite.com/checkout/coorg-trail",
    readyToPickup: [{
        city: "Ahmedabad",
        spots: [
          { location: "ISKCON Temple", timing: "6:00 AM" },
          { location: "Sabarmati Ashram", timing: "6:30 AM" },
          { location: "Airport", timing: "5:00 AM" }
        ]
      },
      {
        city: "Bangalore",
        spots: [
          {location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },
      ],
  },
  {
    id: 8,
    title: "Rishikesh River Rafting",
    description: "White water rafting and spiritual serenity in Rishikesh.",
    details: "Challenge the rapids of the Ganges by day and attend Ganga Aarti by night.",
    image: "https://thetravelboat.com/wp-content/uploads/2022/12/camping-banner.jpg",
    duration: "2 Days",
    price: "7,500",
    location: "Rishikesh, Uttarakhand",
    category: "Adventure",
    status: 'active',
    rating: 4.6,
    reviewsCount: 169,
    itinerary: ["Day 1: Arrival & Rafting", "Day 2: Ganga Aarti & Checkout"],
    inclusions: ["Rafting", "Camp Stay", "Meals"],
    exclusions: ["Transport to Rishikesh"],
    availability: [
      { startDate: "2025-04-10", duration: "2 Days", totalTickets: 25, bookedTickets: 15, availableTickets: 10 },
      { startDate: "2025-05-15", duration: "3 Days", totalTickets: 25, bookedTickets: 15, availableTickets: 10 },
      { startDate: "2025-06-05", duration: "2 Days", totalTickets: 25, bookedTickets: 15, availableTickets: 10 },
    ],
    tags: ["Adventure", "Spiritual", "Camping"],
    mapEmbedUrl: "https://maps.google.com/...",
    bookingUrl: "https://yourwebsite.com/checkout/rishikesh-rafting",
    readyToPickup: [{
        city: "Ahmedabad",
        spots: [
          { location: "ISKCON Temple", timing: "6:00 AM" },
          { location: "Sabarmati Ashram", timing: "6:30 AM" },
          { location: "Airport", timing: "5:00 AM" }
        ]
      },
      {
        city: "Delhi",
        spots: [
          {location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      }],
  },
  {
    id: 9,
    image: "https://cdn.prod.website-files.com/675fdb38b60bc5242af8cd9f/675fdb38b60bc5242af8ce55_Trip%2009%20full.avif",
    title: "Amazon Rainforest Expedition",
    description: "Explore the lush rainforest, witness wildlife, and experience the beauty of nature.",
    details: "Embark on a thrilling adventure through the Amazon rainforest, witness wildlife, and witness the beauty of nature.",
    duration: "7 Days",
    price: "799",
    location: "Amazon Rainforest",
    category: "Adventure",
    status: 'active',
    rating: 4.8,
    reviewsCount: 123,
    itinerary: ["Day 1: Arrival & Camping", "Day 2-6: Rainforest Exploration", "Day 7: Departure"],
    inclusions: ["Camping", "Guide", "Meals"],
    exclusions: ["Airfare"],
    availability: [
      { startDate: "2025-06-05", duration: "7 Days", totalTickets: 30, bookedTickets: 20, availableTickets: 10 },
      { startDate: "2025-07-10", duration: "8 Days", totalTickets: 30, bookedTickets: 20, availableTickets: 10 },
      { startDate: "2025-08-15", duration: "7 Days", totalTickets: 30, bookedTickets: 20, availableTickets: 10 },
    ],
    tags: ["Adventure", "Rainforest", "Camping"],
    mapEmbedUrl: "https://maps.google.com/...",
    bookingUrl: "https://yourwebsite.com/checkout/amazon-expedition",
    readyToPickup: [
      {
        city: "Delhi",
        spots: [
          {location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },
      {
        city: "Ahmedabad",
        spots: [
          { location: "ISKCON Temple", timing: "6:00 AM" },
          { location: "Sabarmati Ashram", timing: "6:30 AM" },
          { location: "Airport", timing: "7:00 AM" }
        ]
      }
    ],
  },
  {
    id: 10,
    image: "https://cdn.prod.website-files.com/675fdb38b60bc5242af8cd9f/675fdb38b60bc5242af8ce53_Trip%2008%20ull.avif",
    description: "Discover the vibrant city of Rome, Italy, and its iconic landmarks.",
    details: "Experience the vibrant city of Rome, Italy, and its iconic landmarks, including the Colosseum, the Vatican, and the Pantheon.",
    title: "Roma City Adventure",
    duration: "5 Days",
    price: "799",
    location: "Rome, Italy",
    category: "Culture",
    status: 'inactive',
    rating: 4.7,
    reviewsCount: 78,
    itinerary: ["Day 1: Arrival & Sightseeing", "Day 2-4: City Exploration", "Day 5: Departure"],
    inclusions: ["Transportation", "Guide", "Meals"],
    exclusions: ["Airfare"],
    availability: [
      { startDate: "2025-05-10", duration: "5 Days", totalTickets: 20, bookedTickets: 10, availableTickets: 10 },
      { startDate: "2025-06-15", duration: "6 Days", totalTickets: 20, bookedTickets: 10, availableTickets: 10 },
      { startDate: "2025-07-05", duration: "5 Days", totalTickets: 20, bookedTickets: 10, availableTickets: 10 },
    ],
    tags: ["Culture", "City", "Sightseeing"],
    mapEmbedUrl: "https://maps.google.com/...",
    bookingUrl: "https://yourwebsite.com/checkout/rome-adventure",
    readyToPickup: [
      {
        city: "Delhi",
        spots: [
          {location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },
      {
        city: "Ahmedabad",
        spots: [
          { location: "ISKCON Temple", timing: "6:00 AM" },
          { location: "Sabarmati Ashram", timing: "6:30 AM" },
          { location: "Airport", timing: "5:00 AM" }
        ]
      }
    ],
  },
  {
    id: 11,
    image: "https://cdn.prod.website-files.com/675fdb38b60bc5242af8cd9f/675fdb38b60bc5242af8ce51_Trip%2007%20Full.avif",
    description: "Experience the beauty of the Mediterranean Sea and its historical sites.",
    details: "Embark on a journey through the Mediterranean Sea and its historical sites, including the Colosseum, the Vatican, and the Pantheon.",
    title: "Historic Mediterranean Voyage",
    duration: "5 Days",
    price: "1899",
    location: "Mediterranean Sea",
    category: "Culture",
    status: 'active',
    rating: 4.9,
    reviewsCount: 102,
    itinerary: ["Day 1: Arrival & Sightseeing", "Day 2-4: City Exploration", "Day 5: Departure"],
    inclusions: ["Transportation", "Guide", "Meals"],
    exclusions: ["Airfare"],
    availability: [
      { startDate: "2025-05-15", duration: "5 Days", totalTickets: 25, bookedTickets: 15, availableTickets: 10 },
      { startDate: "2025-06-20", duration: "6 Days", totalTickets: 25, bookedTickets: 15, availableTickets: 10 },
      { startDate: "2025-07-10", duration: "5 Days", totalTickets: 25, bookedTickets: 15, availableTickets: 10 },
    ],
    tags: ["Culture", "City", "Sightseeing"],
    mapEmbedUrl: "https://maps.google.com/...",
    bookingUrl: "https://yourwebsite.com/checkout/mediterranean-voyage",
    readyToPickup: [
      {
        city: "Delhi",
        spots: [
          {location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },
      {
        city: "Ahmedabad",
        spots: [
          { location: "ISKCON Temple", timing: "6:00 AM" },
          { location: "Sabarmati Ashram", timing: "6:30 AM" },
          { location: "Airport", timing: "5:00 AM" }
        ]
      }
    ],
  },
  {
    id: 12,
    image: "https://cdn.prod.website-files.com/675fdb38b60bc5242af8cd9f/675fdb38b60bc5242af8ce4f_Trip%2006%20Full.avif",
    description: "Discover the natural wonders of the Amazon Rainforest.",
    details: "Embark on a thrilling adventure through the Amazon rainforest, witness wildlife, and witness the beauty of nature.",
    title: "Wildlife Safari Expedition",
    duration: "7 Days",
    price: "1899",
    location: "Amazon Rainforest",
    category: "Adventure",
    status: 'active',
    rating: 4.8,
    reviewsCount: 123,
    itinerary: ["Day 1: Arrival & Camping", "Day 2-6: Rainforest Exploration", "Day 7: Departure"],
    inclusions: ["Camping", "Guide", "Meals"],
    exclusions: ["Airfare"],
    availability: [
      { startDate: "2025-06-10", duration: "7 Days", totalTickets: 30, bookedTickets: 20, availableTickets: 10 },
      { startDate: "2025-07-15", duration: "8 Days", totalTickets: 30, bookedTickets: 20, availableTickets: 10 },
      { startDate: "2025-08-20", duration: "7 Days", totalTickets: 30, bookedTickets: 20, availableTickets: 10 },
    ],
    tags: ["Adventure", "Rainforest", "Camping"],
    mapEmbedUrl: "https://maps.google.com/...",
    bookingUrl: "https://yourwebsite.com/checkout/amazon-expedition",
    readyToPickup: [
      {
        city: "Delhi",
        spots: [
          {location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },
      {
        city: "Ahmedabad",
        spots: [
          { location: "ISKCON Temple", timing: "6:00 AM" },
          { location: "Sabarmati Ashram", timing: "6:30 AM" },
          { location: "Airport", timing: "5:00 AM" }
        ]
      }
    ],
  },
  {
    id: 13,
    title: "Himalayan Trek",
    description: "A 7-day thrilling trek through the majestic Himalayas.",
    details: "Embark on an unforgettable journey through the rugged terrains of the Himalayas. Discover serene monasteries, snow-covered peaks, and local cultures while staying in eco-friendly camps. Meals, guides, permits, and transportation are included.",
    price: "12,500",
    duration: "7 Days",
    image: "https://www.himalayan-treks.com/wp-content/uploads/2019/01/20181024_140649_Avedis.jpg",
    location: "Himalayas",
    category: "Adventure",
    status: 'active',
    rating: 4.9,
    reviewsCount: 78,
    itinerary: ["Day 1: Arrival & Camping", "Day 2-6: Trekking", "Day 7: Departure"],
    inclusions: ["Camping", "Guide", "Meals"],
    exclusions: ["Airfare"],
    availability: [
      { startDate: "2025-05-05", duration: "7 Days", totalTickets: 35, bookedTickets: 20, availableTickets: 15 },
      { startDate: "2025-06-10", duration: "8 Days", totalTickets: 35, bookedTickets: 20, availableTickets: 15 },
      { startDate: "2025-07-15", duration: "7 Days", totalTickets: 35, bookedTickets: 20, availableTickets: 15 },
    ],
    tags: ["Adventure", "Himalayas", "Camping"],
    mapEmbedUrl: "https://maps.google.com/...",
    bookingUrl: "https://yourwebsite.com/checkout/himalayan-trek",
    readyToPickup: [
      {
        city: "Delhi",
        spots: [
          {location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM" },
          { location: "pqr", timing: "5:00 AM" }
        ]
      },
      {
        city: "Ahmedabad",
        spots: [
          { location: "ISKCON Temple", timing: "6:00 AM" },
          { location: "Sabarmati Ashram", timing: "6:30 AM" },
          { location: "Airport", timing: "5:00 AM" }
        ]
      }
    ],
  },
  {
    id: 14,
    title: "Goa Beach Retreat",
    description: "Relax and enjoy the vibrant beaches of Goa.",
    details: "Unwind with golden sands, tropical breeze, and soulful sunsets. This package includes beachfront stay, water sports, yoga sessions, seafood dinners, and beach club access.",
    price: "8,000",
    duration: "4 Days",
    image: "https://assets.cntraveller.in/photos/65169715f1f1534fc4e0f24d/4:3/w_1640,h_1230,c_limit/W%20Goa.jpg",
    location: "Goa",
    category: "Beach",
    status: 'active',
    rating: 4.7,
    reviewsCount: 56,
    itinerary: ["Day 1: Arrival & Beachfront Stay", "Day 2-4: Beach Activities", "Day 5: Departure"],
    inclusions: ["Beachfront Stay", "Water Sports", "Yoga Sessions"],
    exclusions: ["Airfare"],
    availability: [
      { startDate: "2025-05-10", duration: "4 Days", totalTickets: 20, bookedTickets: 10, availableTickets: 10 },
      { startDate: "2025-06-15", duration: "5 Days", totalTickets: 20, bookedTickets: 10, availableTickets: 10 },
      { startDate: "2025-07-05", duration: "4 Days", totalTickets: 20, bookedTickets: 10, availableTickets: 10 },
    ],
    tags: ["Relaxation", "Beach", "Water Sports"],
    mapEmbedUrl: "https://maps.google.com/...",
    bookingUrl: "https://yourwebsite.com/checkout/goa-beach-retreat",
    readyToPickup: [
      {
        city: "Delhi",
        spots: [
          {location: "abc", timing: "6:00 AM" },
          { location: "xyz", timing: "6:30 AM - 7:30 AM" },
          { location: "pqr", timing: "5:00 AM - 6:00 AM" }
        ]
      },
      {
        city: "Ahmedabad",
        spots: [
          { location: "ISKCON Temple", timing: "6:00 AM" },
          { location: "Sabarmati Ashram", timing: "6:30 AM" },
          { location: "Airport", timing: "5:00 AM" }
        ]
      }
    ],
  },
];
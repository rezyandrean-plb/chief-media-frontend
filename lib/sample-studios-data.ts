import type { Studio, Booking } from "@/types/studio"



export const sampleStudios: Studio[] = [

  {

    id: "studio-1",

    name: "Studio A - Main Production",

    description: "Our flagship studio with professional lighting and green screen capabilities",

    location: "Building 1, Floor 2",

    capacity: 15,

    hourlyRate: 150,

    photos: ["/studio-a-main.jpg", "/studio-a-greenscreen.jpg", "/studio-a-equipment.jpg"],

    equipment: [

      { id: "eq-1", name: "Sony A7S III", quantity: 2, category: "camera" },

      { id: "eq-2", name: "Aputure 600D", quantity: 4, category: "lighting" },

      { id: "eq-3", name: "Rode NTG5", quantity: 2, category: "audio" },

      { id: "eq-4", name: "C-Stand", quantity: 8, category: "grip" },

    ],

    availability: [

      { dayOfWeek: 1, startTime: "09:00", endTime: "18:00" },

      { dayOfWeek: 2, startTime: "09:00", endTime: "18:00" },

      { dayOfWeek: 3, startTime: "09:00", endTime: "18:00" },

      { dayOfWeek: 4, startTime: "09:00", endTime: "18:00" },

      { dayOfWeek: 5, startTime: "09:00", endTime: "18:00" },

    ],

    amenities: ["Green Screen", "Cyclorama Wall", "Client Lounge", "WiFi", "Parking"],

    size: "1,200 sq ft",

    status: "active",

    createdAt: "2024-01-15T10:00:00Z",

  },

  {

    id: "studio-2",

    name: "Studio B - Photography",

    description: "Intimate photography studio with natural light options",

    location: "Building 1, Floor 3",

    capacity: 8,

    hourlyRate: 100,

    photos: ["/studio-b-main.jpg", "/studio-b-natural-light.jpg"],

    equipment: [

      { id: "eq-5", name: "Canon R5", quantity: 1, category: "camera" },

      { id: "eq-6", name: "Profoto B10", quantity: 3, category: "lighting" },

      { id: "eq-7", name: "Backdrop Stand", quantity: 2, category: "grip" },

    ],

    availability: [

      { dayOfWeek: 1, startTime: "08:00", endTime: "20:00" },

      { dayOfWeek: 2, startTime: "08:00", endTime: "20:00" },

      { dayOfWeek: 3, startTime: "08:00", endTime: "20:00" },

      { dayOfWeek: 4, startTime: "08:00", endTime: "20:00" },

      { dayOfWeek: 5, startTime: "08:00", endTime: "20:00" },

      { dayOfWeek: 6, startTime: "10:00", endTime: "18:00" },

    ],

    amenities: ["Natural Light", "Backdrops", "WiFi", "Parking"],

    size: "800 sq ft",

    status: "active",

    createdAt: "2024-01-20T10:00:00Z",

  },

  {

    id: "studio-3",

    name: "Studio C - Podcast Room",

    description: "Soundproof podcast recording studio with professional audio setup",

    location: "Building 2, Floor 1",

    capacity: 6,

    hourlyRate: 75,

    photos: ["/studio-c-podcast.jpg"],

    equipment: [

      { id: "eq-8", name: "Shure SM7B", quantity: 4, category: "audio" },

      { id: "eq-9", name: "Scarlett 18i20", quantity: 1, category: "audio" },

      { id: "eq-10", name: "Sony A6400", quantity: 2, category: "camera" },

    ],

    availability: [

      { dayOfWeek: 1, startTime: "09:00", endTime: "21:00" },

      { dayOfWeek: 2, startTime: "09:00", endTime: "21:00" },

      { dayOfWeek: 3, startTime: "09:00", endTime: "21:00" },

      { dayOfWeek: 4, startTime: "09:00", endTime: "21:00" },

      { dayOfWeek: 5, startTime: "09:00", endTime: "21:00" },

    ],

    amenities: ["Soundproof", "Audio Interface", "Headphones", "WiFi"],

    size: "400 sq ft",

    status: "active",

    createdAt: "2024-02-01T10:00:00Z",

  },

]

export const sampleBookings: Booking[] = [

  {

    id: "booking-1",

    studioId: "studio-1",

    studioName: "Studio A - Main Production",

    userId: "user-1",

    userName: "Sarah Johnson",

    userEmail: "sarah.j@example.com",

    userAvatar: "/professional-woman-diverse.png",

    startTime: "10:00",

    endTime: "14:00",

    date: "2025-01-22",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 600,

    guests: [

      { id: "g1", name: "Mike Chen", email: "mike@example.com", status: "confirmed" },

      { id: "g2", name: "Lisa Park", email: "lisa@example.com", status: "confirmed" },

    ],

    equipment: ["Sony A7S III", "Aputure 600D"],

    notes: "Commercial shoot for real estate client",

    createdAt: "2025-01-15T09:00:00Z",

  },

  {

    id: "booking-2",

    studioId: "studio-2",

    studioName: "Studio B - Photography",

    userId: "user-2",

    userName: "David Martinez",

    userEmail: "david.m@example.com",

    userAvatar: "/professional-man.jpg",

    startTime: "15:00",

    endTime: "18:00",

    date: "2025-01-22",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 300,

    guests: [],

    equipment: ["Canon R5", "Profoto B10"],

    notes: "Portrait session",

    createdAt: "2025-01-16T10:00:00Z",

  },

  {

    id: "booking-3",

    studioId: "studio-3",

    studioName: "Studio C - Podcast Room",

    userId: "user-3",

    userName: "Emily Rodriguez",

    userEmail: "emily.r@example.com",

    userAvatar: "/hispanic-professional-woman.png",

    startTime: "09:00",

    endTime: "12:00",

    date: "2025-01-23",

    status: "pending",

    paymentStatus: "pending",

    totalAmount: 225,

    guests: [{ id: "g3", name: "Tom Wilson", email: "tom@example.com", status: "invited" }],

    equipment: ["Shure SM7B", "Scarlett 18i20"],

    notes: "Weekly podcast recording",

    createdAt: "2025-01-18T11:00:00Z",

  },

  {

    id: "booking-4",

    studioId: "studio-1",

    studioName: "Studio A - Main Production",

    userId: "user-4",

    userName: "James Anderson",

    userEmail: "james.a@example.com",

    userAvatar: "/professional-man-beard.png",

    startTime: "14:00",

    endTime: "18:00",

    date: "2025-01-24",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 600,

    guests: [],

    equipment: ["Sony A7S III"],

    createdAt: "2025-01-17T14:00:00Z",

  },

  {

    id: "booking-5",

    studioId: "studio-2",

    studioName: "Studio B - Photography",

    userId: "user-5",

    userName: "Maria Garcia",

    userEmail: "maria.g@example.com",

    startTime: "10:00",

    endTime: "13:00",

    date: "2025-01-25",

    status: "cancelled",

    paymentStatus: "refunded",

    totalAmount: 300,

    guests: [],

    equipment: ["Canon R5"],

    notes: "Client cancelled due to scheduling conflict",

    createdAt: "2025-01-19T09:00:00Z",

  },

  {

    id: "booking-oct-1",

    studioId: "studio-1",

    studioName: "Studio A - Main Production",

    userId: "user-1",

    userName: "Sarah Johnson",

    userEmail: "sarah.j@example.com",

    userAvatar: "/professional-woman-diverse.png",

    startTime: "09:00",

    endTime: "13:00",

    date: "2025-10-03",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 600,

    guests: [{ id: "g4", name: "Alex Kim", email: "alex@example.com", status: "confirmed" }],

    equipment: ["Sony A7S III", "Aputure 600D"],

    notes: "Property showcase video production",

    createdAt: "2025-09-28T10:00:00Z",

  },

  {

    id: "booking-oct-2",

    studioId: "studio-2",

    studioName: "Studio B - Photography",

    userId: "user-2",

    userName: "David Martinez",

    userEmail: "david.m@example.com",

    userAvatar: "/professional-man.jpg",

    startTime: "14:00",

    endTime: "17:00",

    date: "2025-10-03",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 300,

    guests: [],

    equipment: ["Canon R5", "Profoto B10"],

    notes: "Headshot session for real estate team",

    createdAt: "2025-09-29T11:00:00Z",

  },

  {

    id: "booking-oct-3",

    studioId: "studio-3",

    studioName: "Studio C - Podcast Room",

    userId: "user-3",

    userName: "Emily Rodriguez",

    userEmail: "emily.r@example.com",

    userAvatar: "/hispanic-professional-woman.png",

    startTime: "10:00",

    endTime: "12:00",

    date: "2025-10-07",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 150,

    guests: [{ id: "g5", name: "Rachel Green", email: "rachel@example.com", status: "confirmed" }],

    equipment: ["Shure SM7B", "Scarlett 18i20"],

    notes: "Real estate market insights podcast",

    createdAt: "2025-10-01T09:00:00Z",

  },

  {

    id: "booking-oct-4",

    studioId: "studio-1",

    studioName: "Studio A - Main Production",

    userId: "user-4",

    userName: "James Anderson",

    userEmail: "james.a@example.com",

    userAvatar: "/professional-man-beard.png",

    startTime: "15:00",

    endTime: "19:00",

    date: "2025-10-10",

    status: "pending",

    paymentStatus: "pending",

    totalAmount: 600,

    guests: [],

    equipment: ["Sony A7S III"],

    notes: "Luxury home tour video",

    createdAt: "2025-10-05T14:00:00Z",

  },

  {

    id: "booking-oct-5",

    studioId: "studio-2",

    studioName: "Studio B - Photography",

    userId: "user-5",

    userName: "Maria Garcia",

    userEmail: "maria.g@example.com",

    startTime: "09:00",

    endTime: "12:00",

    date: "2025-10-14",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 300,

    guests: [],

    equipment: ["Canon R5", "Profoto B10"],

    notes: "Interior design photography",

    createdAt: "2025-10-08T10:00:00Z",

  },

  {

    id: "booking-oct-6",

    studioId: "studio-3",

    studioName: "Studio C - Podcast Room",

    userId: "user-1",

    userName: "Sarah Johnson",

    userEmail: "sarah.j@example.com",

    userAvatar: "/professional-woman-diverse.png",

    startTime: "13:00",

    endTime: "15:00",

    date: "2025-10-14",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 150,

    guests: [],

    equipment: ["Shure SM7B"],

    notes: "Client testimonial recording",

    createdAt: "2025-10-09T11:00:00Z",

  },

  {

    id: "booking-oct-7",

    studioId: "studio-1",

    studioName: "Studio A - Main Production",

    userId: "user-2",

    userName: "David Martinez",

    userEmail: "david.m@example.com",

    userAvatar: "/professional-man.jpg",

    startTime: "10:00",

    endTime: "14:00",

    date: "2025-10-17",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 600,

    guests: [

      { id: "g6", name: "Chris Brown", email: "chris@example.com", status: "confirmed" },

      { id: "g7", name: "Nina Patel", email: "nina@example.com", status: "confirmed" },

    ],

    equipment: ["Sony A7S III", "Aputure 600D", "C-Stand"],

    notes: "Commercial real estate promotional video",

    createdAt: "2025-10-10T09:00:00Z",

  },

  {

    id: "booking-oct-8",

    studioId: "studio-2",

    studioName: "Studio B - Photography",

    userId: "user-3",

    userName: "Emily Rodriguez",

    userEmail: "emily.r@example.com",

    userAvatar: "/hispanic-professional-woman.png",

    startTime: "16:00",

    endTime: "19:00",

    date: "2025-10-21",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 300,

    guests: [],

    equipment: ["Canon R5", "Profoto B10"],

    notes: "Architectural photography session",

    createdAt: "2025-10-15T12:00:00Z",

  },

  {

    id: "booking-oct-9",

    studioId: "studio-3",

    studioName: "Studio C - Podcast Room",

    userId: "user-4",

    userName: "James Anderson",

    userEmail: "james.a@example.com",

    userAvatar: "/professional-man-beard.png",

    startTime: "09:00",

    endTime: "11:00",

    date: "2025-10-24",

    status: "pending",

    paymentStatus: "pending",

    totalAmount: 150,

    guests: [{ id: "g8", name: "Sophie Turner", email: "sophie@example.com", status: "invited" }],

    equipment: ["Shure SM7B", "Scarlett 18i20"],

    notes: "Real estate investment podcast",

    createdAt: "2025-10-18T10:00:00Z",

  },

  {

    id: "booking-oct-10",

    studioId: "studio-1",

    studioName: "Studio A - Main Production",

    userId: "user-5",

    userName: "Maria Garcia",

    userEmail: "maria.g@example.com",

    startTime: "14:00",

    endTime: "18:00",

    date: "2025-10-28",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 600,

    guests: [],

    equipment: ["Sony A7S III", "Aputure 600D"],

    notes: "Virtual home tour production",

    createdAt: "2025-10-20T13:00:00Z",

  },

  {

    id: "booking-oct-11",

    studioId: "studio-2",

    studioName: "Studio B - Photography",

    userId: "user-1",

    userName: "Sarah Johnson",

    userEmail: "sarah.j@example.com",

    userAvatar: "/professional-woman-diverse.png",

    startTime: "10:00",

    endTime: "13:00",

    date: "2025-10-31",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 300,

    guests: [],

    equipment: ["Canon R5", "Profoto B10"],

    notes: "Halloween-themed property photos",

    createdAt: "2025-10-25T11:00:00Z",

  },

  {

    id: "booking-nov-1",

    studioId: "studio-1",

    studioName: "Studio A - Main Production",

    userId: "user-1",

    userName: "Sarah Johnson",

    userEmail: "sarah.j@example.com",

    userAvatar: "/professional-woman-diverse.png",

    startTime: "09:00",

    endTime: "13:00",

    date: "2025-11-04",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 600,

    guests: [

      { id: "g9", name: "Kevin White", email: "kevin@example.com", status: "confirmed" },

    ],

    equipment: ["Sony A7S III", "Aputure 600D"],

    notes: "Luxury condo walkthrough video",

    createdAt: "2025-10-28T10:00:00Z",

  },

  {

    id: "booking-nov-2",

    studioId: "studio-2",

    studioName: "Studio B - Photography",

    userId: "user-2",

    userName: "David Martinez",

    userEmail: "david.m@example.com",

    userAvatar: "/professional-man.jpg",

    startTime: "14:00",

    endTime: "17:00",

    date: "2025-11-04",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 300,

    guests: [],

    equipment: ["Canon R5", "Profoto B10"],

    notes: "Real estate portfolio photos",

    createdAt: "2025-10-30T11:00:00Z",

  },

  {

    id: "booking-nov-3",

    studioId: "studio-3",

    studioName: "Studio C - Podcast Room",

    userId: "user-3",

    userName: "Emily Rodriguez",

    userEmail: "emily.r@example.com",

    userAvatar: "/hispanic-professional-woman.png",

    startTime: "10:00",

    endTime: "12:00",

    date: "2025-11-07",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 150,

    guests: [

      { id: "g10", name: "Marcus Lee", email: "marcus@example.com", status: "confirmed" },

    ],

    equipment: ["Shure SM7B", "Scarlett 18i20"],

    notes: "Home buyer tips podcast episode",

    createdAt: "2025-11-01T09:00:00Z",

  },

  {

    id: "booking-nov-4",

    studioId: "studio-1",

    studioName: "Studio A - Main Production",

    userId: "user-4",

    userName: "James Anderson",

    userEmail: "james.a@example.com",

    userAvatar: "/professional-man-beard.png",

    startTime: "15:00",

    endTime: "19:00",

    date: "2025-11-11",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 600,

    guests: [

      { id: "g11", name: "Amanda Brooks", email: "amanda@example.com", status: "confirmed" },

      { id: "g12", name: "Tyler Chen", email: "tyler@example.com", status: "confirmed" },

    ],

    equipment: ["Sony A7S III", "Aputure 600D", "C-Stand"],

    notes: "Commercial property showcase",

    createdAt: "2025-11-04T14:00:00Z",

  },

  {

    id: "booking-nov-5",

    studioId: "studio-2",

    studioName: "Studio B - Photography",

    userId: "user-5",

    userName: "Maria Garcia",

    userEmail: "maria.g@example.com",

    startTime: "09:00",

    endTime: "12:00",

    date: "2025-11-14",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 300,

    guests: [],

    equipment: ["Canon R5", "Profoto B10", "Backdrop Stand"],

    notes: "Agent headshots and branding photos",

    createdAt: "2025-11-07T10:00:00Z",

  },

  {

    id: "booking-nov-6",

    studioId: "studio-3",

    studioName: "Studio C - Podcast Room",

    userId: "user-1",

    userName: "Sarah Johnson",

    userEmail: "sarah.j@example.com",

    userAvatar: "/professional-woman-diverse.png",

    startTime: "13:00",

    endTime: "15:00",

    date: "2025-11-14",

    status: "pending",

    paymentStatus: "pending",

    totalAmount: 150,

    guests: [],

    equipment: ["Shure SM7B"],

    notes: "Property investment strategies discussion",

    createdAt: "2025-11-10T11:00:00Z",

  },

  {

    id: "booking-nov-7",

    studioId: "studio-1",

    studioName: "Studio A - Main Production",

    userId: "user-2",

    userName: "David Martinez",

    userEmail: "david.m@example.com",

    userAvatar: "/professional-man.jpg",

    startTime: "10:00",

    endTime: "14:00",

    date: "2025-11-18",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 600,

    guests: [

      { id: "g13", name: "Jessica Wong", email: "jessica@example.com", status: "confirmed" },

    ],

    equipment: ["Sony A7S III", "Aputure 600D"],

    notes: "Residential property video tour",

    createdAt: "2025-11-11T09:00:00Z",

  },

  {

    id: "booking-nov-8",

    studioId: "studio-2",

    studioName: "Studio B - Photography",

    userId: "user-3",

    userName: "Emily Rodriguez",

    userEmail: "emily.r@example.com",

    userAvatar: "/hispanic-professional-woman.png",

    startTime: "16:00",

    endTime: "19:00",

    date: "2025-11-21",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 300,

    guests: [],

    equipment: ["Canon R5", "Profoto B10"],

    notes: "Thanksgiving-themed property staging photos",

    createdAt: "2025-11-14T12:00:00Z",

  },

  {

    id: "booking-nov-9",

    studioId: "studio-3",

    studioName: "Studio C - Podcast Room",

    userId: "user-4",

    userName: "James Anderson",

    userEmail: "james.a@example.com",

    userAvatar: "/professional-man-beard.png",

    startTime: "09:00",

    endTime: "11:00",

    date: "2025-11-25",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 150,

    guests: [

      { id: "g14", name: "Diana Martinez", email: "diana@example.com", status: "confirmed" },

    ],

    equipment: ["Shure SM7B", "Scarlett 18i20", "Sony A6400"],

    notes: "Year-end market review podcast",

    createdAt: "2025-11-18T10:00:00Z",

  },

  {

    id: "booking-nov-10",

    studioId: "studio-1",

    studioName: "Studio A - Main Production",

    userId: "user-5",

    userName: "Maria Garcia",

    userEmail: "maria.g@example.com",

    startTime: "14:00",

    endTime: "18:00",

    date: "2025-11-27",

    status: "pending",

    paymentStatus: "pending",

    totalAmount: 600,

    guests: [],

    equipment: ["Sony A7S III", "Aputure 600D"],

    notes: "Holiday property marketing video",

    createdAt: "2025-11-20T13:00:00Z",

  },

  {

    id: "booking-nov-11",

    studioId: "studio-2",

    studioName: "Studio B - Photography",

    userId: "user-1",

    userName: "Sarah Johnson",

    userEmail: "sarah.j@example.com",

    userAvatar: "/professional-woman-diverse.png",

    startTime: "10:00",

    endTime: "13:00",

    date: "2025-11-28",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 300,

    guests: [],

    equipment: ["Canon R5", "Profoto B10"],

    notes: "Black Friday promotional content",

    createdAt: "2025-11-22T11:00:00Z",

  },

  {

    id: "booking-nov-12",

    studioId: "studio-3",

    studioName: "Studio C - Podcast Room",

    userId: "user-2",

    userName: "David Martinez",

    userEmail: "david.m@example.com",

    userAvatar: "/professional-man.jpg",

    startTime: "15:00",

    endTime: "17:00",

    date: "2025-11-28",

    status: "confirmed",

    paymentStatus: "paid",

    totalAmount: 150,

    guests: [],

    equipment: ["Shure SM7B"],

    notes: "Client testimonial interviews",

    createdAt: "2025-11-23T14:00:00Z",

  },

]




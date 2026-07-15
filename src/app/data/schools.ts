export interface School {
  id: number;
  name: string;
  location: string;
  address: string;
  board: string;
  founded: number;
  students: number;
  rating: number;
  reviews: number;
  verified: boolean;
  image: string;
  languages: string[];
  sports: string[];
  infrastructureScore: number;
  phone: string;
  email: string;
  website: string;
  management: {
    type: string;
    affiliationNumber: string;
    principal: string;
    establishedBy: string;
  };
  syllabus: {
    board: string;
    curriculum: string;
    subjects: string[];
    streams: string[];
  };
  facilities: {
    sports: {
      ground: string;
      facilities: string[];
    };
    infrastructure: {
      classrooms: string;
      labs: string[];
      library: string;
      auditorium: string;
      cafeteria: string;
      medical: string;
      transport: string;
      security: string;
    };
  };
  activities: {
    curricular: string[];
    clubs: string[];
    sports: string[];
  };
  gallery: string[];
}

export const schools: School[] = [
  {
    id: 1,
    name: 'Delhi Public School',
    location: 'Mysore, Karnataka',
    address: '123 Education Street, Vijayanagar, Mysore - 570017, Karnataka, India',
    board: 'CBSE',
    founded: 1998,
    students: 1200,
    rating: 4.8,
    reviews: 156,
    verified: true,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
    languages: ['English', 'Hindi', 'Kannada', 'Sanskrit', 'French'],
    sports: ['Cricket', 'Football', 'Basketball', 'Swimming', 'Tennis', 'Badminton', 'Athletics', 'Yoga'],
    infrastructureScore: 92,
    phone: '+91 821 2345678',
    email: 'info@dpsmysore.edu.in',
    website: 'www.dpsmysore.edu.in',
    management: {
      type: 'CBSE Affiliated',
      affiliationNumber: '123456',
      principal: 'Dr. Rajesh Kumar',
      establishedBy: 'Delhi Public School Society',
    },
    syllabus: {
      board: 'CBSE',
      curriculum: 'National Curriculum Framework',
      subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Computer Science', 'Physical Education'],
      streams: ['Science', 'Commerce', 'Humanities'],
    },
    facilities: {
      sports: {
        ground: 'Yes - 5 acres',
        facilities: ['Cricket Ground', 'Football Field', 'Basketball Courts (2)', 'Tennis Courts (2)', 'Swimming Pool', 'Indoor Sports Complex', 'Athletics Track'],
      },
      infrastructure: {
        classrooms: '60 Smart Classrooms',
        labs: ['Physics Lab', 'Chemistry Lab', 'Biology Lab', 'Computer Lab (50 systems)', 'Math Lab', 'Language Lab'],
        library: 'Yes - 15,000+ books',
        auditorium: 'Yes - 500 seating capacity',
        cafeteria: 'Yes - Hygienic food court',
        medical: 'Yes - 24/7 Medical room with qualified nurse',
        transport: 'Yes - 25 buses covering entire city',
        security: '24/7 CCTV surveillance with trained guards',
      },
    },
    activities: {
      curricular: ['Music', 'Dance', 'Drama', 'Art & Craft', 'Debate', 'Public Speaking'],
      clubs: ['Robotics Club', 'Science Club', 'Eco Club', 'Quiz Club', 'Literary Club', 'Math Club'],
      sports: ['Cricket', 'Football', 'Basketball', 'Swimming', 'Tennis', 'Badminton', 'Athletics', 'Yoga'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
      'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
      'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    ],
  },
  {
    id: 2,
    name: 'Jain International School',
    location: 'Bangalore, Karnataka',
    address: '456 Tech Park Road, Whitefield, Bangalore - 560066, Karnataka, India',
    board: 'ICSE',
    founded: 2005,
    students: 850,
    rating: 4.6,
    reviews: 89,
    verified: true,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
    languages: ['English', 'Hindi', 'French'],
    sports: ['Tennis', 'Badminton', 'Athletics', 'Yoga'],
    infrastructureScore: 88,
    phone: '+91 80 98765432',
    email: 'admissions@jaininternational.edu.in',
    website: 'www.jaininternational.edu.in',
    management: {
      type: 'ICSE Affiliated',
      affiliationNumber: 'KA-098',
      principal: 'Mrs. Shalini Murthy',
      establishedBy: 'Jain Group of Institutions',
    },
    syllabus: {
      board: 'ICSE',
      curriculum: 'ICSE/ISC Curriculum',
      subjects: ['English', 'Hindi', 'French', 'Mathematics', 'Science (Physics, Chemistry, Biology)', 'History & Civics', 'Geography', 'Computer Applications'],
      streams: ['Science', 'Commerce'],
    },
    facilities: {
      sports: {
        ground: 'Yes - 4 acres',
        facilities: ['Tennis Courts (4)', 'Badminton Courts (3)', 'Athletics Track', 'Yoga Hall', 'Swimming Pool (Olympic size)'],
      },
      infrastructure: {
        classrooms: '40 Smart Classrooms',
        labs: ['Physics Lab', 'Chemistry Lab', 'Biology Lab', 'Computer Lab (40 systems)', 'Innovation Hub'],
        library: 'Yes - 10,000+ books',
        auditorium: 'Yes - 400 seating capacity',
        cafeteria: 'Yes - Multi-cuisine cafeteria',
        medical: 'Yes - On-campus clinic with doctor',
        transport: 'Yes - 15 GPS-tracked buses',
        security: '24/7 security with CCTV & RFID access tags',
      },
    },
    activities: {
      curricular: ['Drama', 'Public Speaking', 'Music (Classical/Western)', 'Art & Design', 'Coding'],
      clubs: ['Science Club', 'Eco Club', 'Interact Club', 'Media Club', 'Astronomy Club'],
      sports: ['Tennis', 'Badminton', 'Athletics', 'Yoga', 'Swimming'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80',
    ],
  },
  {
    id: 3,
    name: 'Kendriya Vidyalaya',
    location: 'Mysore, Karnataka',
    address: '789 Heritage Road, Siddharthanagar, Mysore - 570011, Karnataka, India',
    board: 'CBSE',
    founded: 1985,
    students: 1500,
    rating: 4.5,
    reviews: 234,
    verified: true,
    image: 'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=600&q=80',
    languages: ['English', 'Hindi', 'Sanskrit'],
    sports: ['Cricket', 'Volleyball', 'Kabaddi', 'Athletics'],
    infrastructureScore: 85,
    phone: '+91 821 2412345',
    email: 'mysore.kv@gov.in',
    website: 'mysore.kvs.ac.in',
    management: {
      type: 'CBSE Affiliated',
      affiliationNumber: '190012',
      principal: 'Mr. S. K. Prasad',
      establishedBy: 'Kendriya Vidyalaya Sangathan',
    },
    syllabus: {
      board: 'CBSE',
      curriculum: 'NCERT Curriculum',
      subjects: ['English', 'Hindi', 'Sanskrit', 'Mathematics', 'Science', 'Social Science', 'Sanskrit', 'Work Education'],
      streams: ['Science', 'Commerce', 'Humanities'],
    },
    facilities: {
      sports: {
        ground: 'Yes - 6 acres',
        facilities: ['Cricket Pitch', 'Volleyball Court', 'Kabaddi Ground', 'Athletics Track', 'Football Ground'],
      },
      infrastructure: {
        classrooms: '50 Classrooms',
        labs: ['Physics Lab', 'Chemistry Lab', 'Biology Lab', 'Computer Lab (30 systems)', 'Language Lab'],
        library: 'Yes - 12,000+ books',
        auditorium: 'Yes - Multi-purpose hall',
        cafeteria: 'Yes - Small canteen',
        medical: 'Yes - First Aid room with visiting doctor',
        transport: 'No - Parents / Public transport',
        security: '24/7 security guards at main gates',
      },
    },
    activities: {
      curricular: ['Cultural Programs', 'Music (Vocal)', 'Drawing & Painting', 'Debate'],
      clubs: ['NCC', 'Scouts & Guides', 'Eco Club', 'Social Service Group'],
      sports: ['Cricket', 'Volleyball', 'Kabaddi', 'Athletics'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800&q=80',
      'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    ],
  },
  {
    id: 4,
    name: 'The Oakwood IB World School',
    location: 'Bangalore, Karnataka',
    address: '88 Lily Valley Road, Indiranagar, Bangalore - 560038, Karnataka, India',
    board: 'IB Schools',
    founded: 2012,
    students: 620,
    rating: 4.9,
    reviews: 74,
    verified: true,
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&q=80',
    languages: ['English', 'French', 'Spanish', 'Hindi'],
    sports: ['Swimming', 'Basketball', 'Football', 'Squash', 'Golf'],
    infrastructureScore: 96,
    phone: '+91 80 44556677',
    email: 'contact@oakwoodib.edu.in',
    website: 'www.oakwoodib.edu.in',
    management: {
      type: 'IB Authorized',
      affiliationNumber: 'IB-9901',
      principal: 'Dr. Sarah Jenkins',
      establishedBy: 'Oakwood Educational Foundation',
    },
    syllabus: {
      board: 'IB Schools',
      curriculum: 'IB Diploma Programme (IBDP)',
      subjects: ['English Literature', 'Mathematics: Analysis & Approaches', 'Physics HL', 'Chemistry HL', 'Economics HL', 'Theory of Knowledge'],
      streams: ['IB Diploma', 'IB Certificates'],
    },
    facilities: {
      sports: {
        ground: 'Yes - 3 acres',
        facilities: ['Indoor Swimming Pool', 'Squash Courts (3)', 'Basketball Court', 'Soccer Turf'],
      },
      infrastructure: {
        classrooms: '35 Collaborative Smart Classrooms',
        labs: ['Integrated Science Lab', 'Design Technology Lab', 'Apple IMac Lab'],
        library: 'Yes - 20,000+ digital & physical resources',
        auditorium: 'Yes - 350-seater Amphitheatre',
        cafeteria: 'Yes - Organic Cafeteria',
        medical: 'Yes - Doctor on duty',
        transport: 'Yes - AC Smart Buses with CCTV',
        security: 'Strict Biometric access controls & 24/7 security',
      },
    },
    activities: {
      curricular: ['MUN (Model United Nations)', 'Robotics & AI', 'Orchestra', 'Creative Writing'],
      clubs: ['Interact Club', 'TEDx Club', 'Young Entrepreneurs Club', 'Visual Arts Society'],
      sports: ['Swimming', 'Basketball', 'Football', 'Squash', 'Golf'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    ],
  },
  {
    id: 5,
    name: 'Vidyodaya State School',
    location: 'Mysore, Karnataka',
    address: '12 Palace View Road, Chamundipuram, Mysore - 570004, Karnataka, India',
    board: 'State Board',
    founded: 1978,
    students: 1100,
    rating: 4.4,
    reviews: 142,
    verified: false,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
    languages: ['Kannada', 'English', 'Hindi', 'Sanskrit'],
    sports: ['Cricket', 'Volleyball', 'Kabaddi', 'Badminton', 'Chess'],
    infrastructureScore: 78,
    phone: '+91 821 2511223',
    email: 'admin@vidyodayamysore.org',
    website: 'www.vidyodayamysore.org',
    management: {
      type: 'Government Aided',
      affiliationNumber: 'MYS-ST-004',
      principal: 'Sri. M. Lakshmana',
      establishedBy: 'Vidyodaya Education Trust',
    },
    syllabus: {
      board: 'State Board',
      curriculum: 'Karnataka State SSLC Syllabus',
      subjects: ['Kannada (First Lang)', 'English (Second Lang)', 'Hindi (Third Lang)', 'Mathematics', 'Science', 'Social Science'],
      streams: ['SSLC (General)'],
    },
    facilities: {
      sports: {
        ground: 'Yes - 2 acres',
        facilities: ['Volleyball Court', 'Kabaddi Sand Pit', 'Kho-Kho Ground', 'Table Tennis room'],
      },
      infrastructure: {
        classrooms: '28 Standard Classrooms',
        labs: ['Science Lab', 'Basic Computer Lab (15 systems)'],
        library: 'Yes - 5,000 books',
        auditorium: 'Yes - Open air stage',
        cafeteria: 'Yes - Mid-day meal kitchen',
        medical: 'Yes - Annual health checkups & first-aid',
        transport: 'No - Local buses preferred',
        security: 'Compound wall & security guard at gate',
      },
    },
    activities: {
      curricular: ['Kannada Debate', 'Classical Music', 'NSS (National Service Scheme)', 'Drama'],
      clubs: ['Eco Club', 'Science Club', 'Heritage Club'],
      sports: ['Cricket', 'Volleyball', 'Kabaddi', 'Badminton', 'Chess'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    ],
  },
  {
    id: 6,
    name: 'Greenwood International Academy',
    location: 'Bangalore, Karnataka',
    address: '102 Golden Gate Boulevard, Sarjapur Road, Bangalore - 560087, Karnataka, India',
    board: 'International',
    founded: 2008,
    students: 950,
    rating: 4.8,
    reviews: 112,
    verified: true,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
    languages: ['English', 'French', 'German', 'Spanish'],
    sports: ['Soccer', 'Tennis', 'Cricket', 'Swimming', 'Horse Riding', 'Gymnastics'],
    infrastructureScore: 95,
    phone: '+91 80 22338899',
    email: 'admissions@greenwoodacademy.com',
    website: 'www.greenwoodacademy.com',
    management: {
      type: 'International Board',
      affiliationNumber: 'INT-409',
      principal: 'Mr. David Fletcher',
      establishedBy: 'Greenwood Educational Group',
    },
    syllabus: {
      board: 'International',
      curriculum: 'Cambridge Assessment International Education (CAIE)',
      subjects: ['English First Language', 'Mathematics', 'Global Perspectives', 'Physics', 'Chemistry', 'Art & Design'],
      streams: ['IGCSE', 'Cambridge A Levels'],
    },
    facilities: {
      sports: {
        ground: 'Yes - 10 acres sports fields',
        facilities: ['Professional Turf Soccer Field', 'All-weather Tennis Courts (6)', 'Semi-Olympic Swimming Pool', 'Equestrian Center', 'Indoor Gymnastics Arena'],
      },
      infrastructure: {
        classrooms: '50 Air-conditioned Interactive Classrooms',
        labs: ['Advanced Physics Lab', 'Advanced Chemistry Lab', 'Advanced Biology Lab', 'Robotics & 3D Printing Lab', 'ICT Center'],
        library: 'Yes - 25,005 books & Online journals',
        auditorium: 'Yes - 600 seats with surround sound',
        cafeteria: 'Yes - Multi-cuisine dining hall',
        medical: 'Yes - Fully equipped medical room with 2 beds & resident nurse',
        transport: 'Yes - GPS-tracked AC buses with panic buttons',
        security: '24/7 CCTV surveillance, biometric locks & security guards',
      },
    },
    activities: {
      curricular: ['Debate Society', 'School Band', 'MUN', 'Drama & Stagecraft'],
      clubs: ['Astronomy Club', 'Eco & Organic Farming Club', 'Robotics Club', 'Code Club'],
      sports: ['Soccer', 'Tennis', 'Cricket', 'Swimming', 'Horse Riding', 'Gymnastics'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    ],
  },
  {
    id: 7,
    name: 'National Open Schooling Center',
    location: 'Mysore, Karnataka',
    address: '45 Kuvempunagar Ring Road, Mysore - 570023, Karnataka, India',
    board: 'NIOS',
    founded: 2015,
    students: 310,
    rating: 4.2,
    reviews: 32,
    verified: true,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
    languages: ['English', 'Hindi', 'Kannada'],
    sports: ['Table Tennis', 'Badminton', 'Yoga', 'Carrom', 'Chess'],
    infrastructureScore: 80,
    phone: '+91 821 2990011',
    email: 'info@niosmysore.org',
    website: 'www.niosmysore.org',
    management: {
      type: 'NIOS Accredited Institution',
      affiliationNumber: 'NIOS-29311',
      principal: 'Mrs. Rekha Sundar',
      establishedBy: 'Mysore Alternative Education Society',
    },
    syllabus: {
      board: 'NIOS',
      curriculum: 'National Institute of Open Schooling Curriculum',
      subjects: ['English', 'Home Science', 'Data Entry Operations', 'Business Studies', 'Psychology', 'Painting'],
      streams: ['Secondary (10th)', 'Senior Secondary (12th)'],
    },
    facilities: {
      sports: {
        ground: 'Yes - Indoor sports center',
        facilities: ['Badminton Court', 'Table Tennis room', 'Yoga & Meditation studio'],
      },
      infrastructure: {
        classrooms: '12 Digital Learning Rooms',
        labs: ['Practical Home Science Lab', 'Computer & Data Entry Lab (20 systems)'],
        library: 'Yes - NIOS study guides & multimedia library',
        auditorium: 'Yes - Seminar Room (100 capacity)',
        cafeteria: 'Yes - Self-service kitchen',
        medical: 'Yes - Doctor on call & basic first aid kits',
        transport: 'No - Easily accessible via city transit',
        security: 'CCTV monitored rooms and security guards',
      },
    },
    activities: {
      curricular: ['Vocational Training (Tailoring, Baking)', 'Painting & Art', 'Life Skills Workshops'],
      clubs: ['Eco Club', 'Digital Skills Club', 'Creative Expression Club'],
      sports: ['Table Tennis', 'Badminton', 'Yoga', 'Carrom', 'Chess'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
      'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80',
    ],
  },
];


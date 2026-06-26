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
    name: 'ABC Public School',
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
    email: 'info@ABCmysore.edu.in',
    website: 'www.ABCmysore.edu.in',
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
    name: 'XYZ International School',
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
    email: 'admissions@xyzinternational.edu.in',
    website: 'www.xyzinternational.edu.in',
    management: {
      type: 'ICSE Affiliated',
      affiliationNumber: 'KA-098',
      principal: 'Mrs. Shalini Murthy',
      establishedBy: 'XYZ Group of Institutions',
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
    name: 'ABC Vidyalaya',
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
    email: 'info@ABCmysore.ac.in',
    website: 'www.ABCmysore.ac.in',
    management: {
      type: 'CBSE Affiliated',
      affiliationNumber: '190012',
      principal: 'Mr. S. K. Prasad',
      establishedBy: 'ABC Group',
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
];

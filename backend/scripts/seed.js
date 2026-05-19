const pool = require('../config/database');

// Seed initial services for Prof. Odera
const seedServices = async () => {
  const services = [
    // Counseling & Psychological Support
    {
      name: 'Individual Therapy',
      description: 'Professional guidance for managing personal life challenges, self-esteem, grief, and emotional well-being.',
      duration_minutes: 60,
      price_kes: 2500,
      category: 'Counseling & Psychological Support'
    },
    {
      name: 'Relationship & Family Counseling',
      description: 'Helping couples and families navigate communication issues, conflict resolution, and relational dynamics.',
      duration_minutes: 75,
      price_kes: 2200,
      category: 'Counseling & Psychological Support'
    },

    // Trauma Therapy
    {
      name: 'Trauma Recovery',
      description: 'Specialized therapeutic interventions for individuals healing from past trauma, PTSD, or sudden crisis situations.',
      duration_minutes: 60,
      price_kes: 3000,
      category: 'Trauma Therapy'
    },
    {
      name: 'Stress & Anxiety Management',
      description: 'Evidence-based techniques to help clients cope with chronic stress, panic, and anxiety disorders.',
      duration_minutes: 45,
      price_kes: 2000,
      category: 'Trauma Therapy'
    },

    // Career Guidance & Development
    {
      name: 'Career Assessment & Counseling',
      description: 'Helping students, job seekers, and professionals align their personalities, skills, and interests with the right career path.',
      duration_minutes: 60,
      price_kes: 2200,
      category: 'Career Guidance & Development'
    },
    {
      name: 'Professional Clarity & Transition Coaching',
      description: 'Assisting individuals looking to switch careers, navigate workplace challenges, or advance professionally.',
      duration_minutes: 60,
      price_kes: 2500,
      category: 'Career Guidance & Development'
    },

    // Educational Psychology
    {
      name: 'Academic Assessments',
      description: 'Identifying learning styles, academic difficulties, or giftedness in students to help them optimize their learning.',
      duration_minutes: 90,
      price_kes: 3500,
      category: 'Educational Psychology'
    },
    {
      name: 'Student Counseling & Behavioral Support',
      description: 'Supporting children, adolescents, and university students with academic stress, exam anxiety, and behavioral adjustments.',
      duration_minutes: 45,
      price_kes: 1500,
      category: 'Educational Psychology'
    }
  ];

  try {
    for (const service of services) {
      const result = await pool.query(
        'SELECT * FROM services WHERE name = $1',
        [service.name]
      );
      
      if (result.rows.length === 0) {
        await pool.query(
          'INSERT INTO services (name, description, duration_minutes, price_kes, category) VALUES ($1, $2, $3, $4, $5)',
          [service.name, service.description, service.duration_minutes, service.price_kes, service.category]
        );
        console.log(`✓ Added service: ${service.name}`);
      }
    }
    
    console.log('✓ Services seeded successfully!');
  } catch (err) {
    console.error('Error seeding services:', err);
  }
};

// Seed availability (Monday-Friday, 9 AM - 5 PM)
const seedAvailability = async () => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM availability');
    
    if (result.rows[0].count == 0) {
      for (let day = 1; day <= 5; day++) { // Monday to Friday
        await pool.query(
          'INSERT INTO availability (day_of_week, start_time, end_time, is_available) VALUES ($1, $2, $3, $4)',
          [day, '09:00', '17:00', true]
        );
      }
      console.log('✓ Availability seeded successfully!');
    }
  } catch (err) {
    console.error('Error seeding availability:', err);
  }
};

const seed = async () => {
  try {
    console.log('Starting database seeding...');
    await seedServices();
    await seedAvailability();
    process.exit(0);
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  }
};

seed();

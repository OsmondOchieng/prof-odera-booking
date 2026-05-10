const pool = require('../config/database');

// Seed initial services for Prof. Odera
const seedServices = async () => {
  const services = [
    {
      name: 'Individual Counseling Session',
      description: 'One-on-one counseling focused on personal challenges and mental health',
      duration_minutes: 60,
      price_kes: 2000,
      category: 'Counseling'
    },
    {
      name: 'Career Guidance Consultation',
      description: 'Career path planning, subject choice guidance, and professional development',
      duration_minutes: 45,
      price_kes: 1500,
      category: 'Career'
    },
    {
      name: 'Educational Psychology Assessment',
      description: 'Assessment of learning challenges and educational support strategies',
      duration_minutes: 90,
      price_kes: 3000,
      category: 'Education'
    },
    {
      name: 'Trauma & PTSD Therapy',
      description: 'Specialized counseling for trauma, PTSD, and stress management',
      duration_minutes: 60,
      price_kes: 2500,
      category: 'Therapy'
    },
    {
      name: 'Family/Relationship Counseling',
      description: 'Family dynamics, relationship issues, and interpersonal skills',
      duration_minutes: 75,
      price_kes: 2200,
      category: 'Family'
    },
    {
      name: 'Academic Performance Coaching',
      description: 'Study strategies, academic motivation, and performance improvement',
      duration_minutes: 45,
      price_kes: 1200,
      category: 'Academic'
    },
    {
      name: 'Personality Development & Self-Esteem',
      description: 'Personal growth, self-concept improvement, and confidence building',
      duration_minutes: 60,
      price_kes: 1800,
      category: 'Personal Development'
    },
    {
      name: 'Group Workshop - Stress Management',
      description: 'Interactive workshop on stress management techniques and resilience',
      duration_minutes: 120,
      price_kes: 500,
      category: 'Workshop'
    },
    {
      name: 'Motivational Speaking/Training',
      description: 'Motivational talks for schools, universities, and organizations',
      duration_minutes: 120,
      price_kes: 5000,
      category: 'Speaking'
    },
    {
      name: 'Consultation for Educational Institutions',
      description: 'Educational psychology consultation for schools and universities',
      duration_minutes: 120,
      price_kes: 10000,
      category: 'Institutional'
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

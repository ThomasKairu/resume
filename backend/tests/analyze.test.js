const request = require('supertest');
const app = require('../server');

describe('POST /api/analyze', () => {
  const validPayload = {
    resumeText: 'Experienced software engineer with expertise in JavaScript, React, Node.js, and MongoDB. Built scalable web applications and RESTful APIs. Strong problem-solving skills and team collaboration experience.',
    jobDescription: 'We are looking for a Senior Software Engineer with experience in JavaScript, React, Node.js, Python, AWS, and machine learning. Must have strong analytical skills and experience with agile development.'
  };

  test('should return analysis results for valid input', async () => {
    const response = await request(app)
      .post('/api/analyze')
      .send(validPayload)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('matchScore');
    expect(response.body.data).toHaveProperty('missingKeywords');
    expect(response.body.data).toHaveProperty('matchedKeywords');
    expect(response.body.data).toHaveProperty('suggestedAdditions');
    expect(typeof response.body.data.matchScore).toBe('number');
    expect(Array.isArray(response.body.data.missingKeywords)).toBe(true);
    expect(Array.isArray(response.body.data.matchedKeywords)).toBe(true);
  });

  test('should return 400 for missing resumeText', async () => {
    const response = await request(app)
      .post('/api/analyze')
      .send({ jobDescription: validPayload.jobDescription })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe('VALIDATION_ERROR');
  });

  test('should return 400 for missing jobDescription', async () => {
    const response = await request(app)
      .post('/api/analyze')
      .send({ resumeText: validPayload.resumeText })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe('VALIDATION_ERROR');
  });

  test('should return 400 for too short resumeText', async () => {
    const response = await request(app)
      .post('/api/analyze')
      .send({
        resumeText: 'Too short',
        jobDescription: validPayload.jobDescription
      })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe('VALIDATION_ERROR');
  });

  test('should return 400 for invalid JSON', async () => {
    const response = await request(app)
      .post('/api/analyze')
      .send('invalid json')
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe('INVALID_JSON');
  });
});

describe('GET /api/health', () => {
  test('should return health status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.status).toBe('healthy');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('memory');
  });
});

describe('404 handling', () => {
  test('should return 404 for unknown endpoints', async () => {
    const response = await request(app)
      .get('/api/unknown')
      .expect(404);

    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe('NOT_FOUND');
  });
});
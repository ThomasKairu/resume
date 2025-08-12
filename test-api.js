// Test the API directly
const testPayload = {
  resumeText: "John Doe - Software Engineer with 3 years experience in JavaScript, React, Node.js",
  jobDescription: "Looking for Senior Software Engineer with Python, AWS, Docker experience"
};

fetch('http://localhost:3003/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testPayload)
})
.then(response => {
  console.log('Response status:', response.status);
  console.log('Response headers:', response.headers);
  return response.json();
})
.then(data => {
  console.log('Response data:', JSON.stringify(data, null, 2));
})
.catch(error => {
  console.error('Error:', error);
});
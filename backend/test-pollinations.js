// Quick test script to verify Pollinations.AI integration
const keywordService = require('./services/keywordService');

async function testPollinationsAPI() {
  console.log('🧪 Testing Pollinations.AI integration...\n');
  
  const sampleResume = `
    John Doe
    Software Engineer
    
    Experience:
    - 3 years of JavaScript development
    - Built React applications
    - Worked with Node.js and Express
    - Experience with MongoDB databases
    - Git version control
    
    Skills:
    - JavaScript, HTML, CSS
    - React, Node.js
    - MongoDB, Express
    - Problem-solving, teamwork
  `;
  
  const sampleJobDescription = `
    Senior Software Engineer Position
    
    Requirements:
    - 5+ years JavaScript experience
    - React and Node.js expertise
    - Python programming skills
    - AWS cloud experience
    - Docker containerization
    - Machine learning knowledge
    - Strong communication skills
    - Team leadership experience
  `;
  
  try {
    console.log('📝 Analyzing resume against job description...');
    const result = await keywordService.analyzeResume(sampleResume, sampleJobDescription);
    
    console.log('\n✅ Analysis Results:');
    console.log('📊 Match Score:', result.matchScore + '%');
    console.log('🎯 Analysis Method:', result.analysisMethod);
    console.log('✅ Matched Keywords:', result.matchedKeywords);
    console.log('❌ Missing Keywords:', result.missingKeywords);
    console.log('💡 Suggestions:', result.suggestedAdditions);
    console.log('\n🎉 Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the test
testPollinationsAPI();
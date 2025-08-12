const natural = require('natural');
const { removeStopwords, eng } = require('stopword');

class KeywordService {
  constructor() {
    // Initialize stemmer for better keyword matching
    this.stemmer = natural.PorterStemmer;
    
    // Pollinations.AI API endpoint
    this.pollinationsAPI = 'https://text.pollinations.ai/openai';
    
    // Common technical skills and industry terms that should be preserved
    this.preservedTerms = new Set([
      'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node',
      'express', 'mongodb', 'sql', 'postgresql', 'mysql', 'aws', 'azure',
      'docker', 'kubernetes', 'git', 'github', 'api', 'rest', 'graphql',
      'html', 'css', 'typescript', 'php', 'ruby', 'golang', 'rust',
      'machine learning', 'ai', 'data science', 'analytics', 'agile',
      'scrum', 'devops', 'ci/cd', 'testing', 'automation', 'security'
    ]);
  }

  /**
   * Use Pollinations.AI to analyze resume against job description
   * @param {string} resumeText - Resume content
   * @param {string} jobDescription - Job description content
   * @returns {Object} - AI analysis results
   */
  async analyzeWithAI(resumeText, jobDescription) {
    try {
      const prompt = `You are an expert resume analyzer. Analyze the following resume against the job description and provide a detailed assessment.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Please analyze and respond with a JSON object containing:
1. matchScore: A percentage (0-100) indicating how well the resume matches the job requirements
2. missingKeywords: Array of important keywords/skills from the job description that are missing from the resume
3. matchedKeywords: Array of keywords/skills that are present in both the resume and job description
4. suggestedAdditions: A detailed string with specific suggestions for improving the resume

Focus on technical skills, relevant experience, and industry-specific terminology. Be thorough but concise.

Respond only with valid JSON in this exact format:
{
  "matchScore": 75,
  "missingKeywords": ["keyword1", "keyword2"],
  "matchedKeywords": ["keyword3", "keyword4"],
  "suggestedAdditions": "Detailed suggestions here..."
}`;

      const response = await fetch(this.pollinationsAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai',
          messages: [
            {
              role: 'system',
              content: 'You are an expert resume analyzer. Always respond with valid JSON only.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1500,
          temperature: 0.3,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Pollinations API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Pollinations API response:', data);
      
      // Handle OpenAI-compatible response format
      const aiResponse = data.choices?.[0]?.message?.content || data.content || data.response;

      if (!aiResponse) {
        console.error('Unexpected API response format:', data);
        throw new Error('No response from AI service');
      }

      // Parse the AI response
      let analysisResult;
      try {
        // Clean the response to extract JSON
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysisResult = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in AI response');
        }
      } catch (parseError) {
        console.error('Failed to parse AI response:', aiResponse);
        // Fallback to basic analysis if AI parsing fails
        return this.fallbackAnalysis(resumeText, jobDescription);
      }

      // Validate and sanitize the AI response
      return {
        matchScore: Math.min(100, Math.max(0, parseInt(analysisResult.matchScore) || 0)),
        missingKeywords: Array.isArray(analysisResult.missingKeywords) 
          ? analysisResult.missingKeywords.slice(0, 15) 
          : [],
        matchedKeywords: Array.isArray(analysisResult.matchedKeywords) 
          ? analysisResult.matchedKeywords.slice(0, 20) 
          : [],
        suggestedAdditions: typeof analysisResult.suggestedAdditions === 'string' 
          ? analysisResult.suggestedAdditions 
          : 'Consider tailoring your resume to better match the job requirements.',
        totalJobKeywords: this.extractKeywords(jobDescription).length,
        aiPowered: true
      };

    } catch (error) {
      console.error('AI analysis failed:', error);
      // Fallback to basic keyword analysis
      return this.fallbackAnalysis(resumeText, jobDescription);
    }
  }

  /**
   * Fallback analysis when AI service is unavailable
   * @param {string} resumeText - Resume content
   * @param {string} jobDescription - Job description content
   * @returns {Object} - Basic analysis results
   */
  fallbackAnalysis(resumeText, jobDescription) {
    console.log('Using fallback keyword analysis');
    
    const resumeKeywords = this.extractKeywords(resumeText);
    const jobKeywords = this.extractKeywords(jobDescription);
    const matchResults = this.calculateMatch(resumeKeywords, jobKeywords);
    
    const totalJobKeywords = jobKeywords.length;
    const matchScore = totalJobKeywords > 0 
      ? Math.round((matchResults.matchedKeywords.length / totalJobKeywords) * 100)
      : 0;

    return {
      matchScore: Math.min(100, Math.max(0, matchScore)),
      missingKeywords: matchResults.missingKeywords.slice(0, 15),
      matchedKeywords: matchResults.matchedKeywords.slice(0, 20),
      suggestedAdditions: this.generateSuggestions(
        matchResults.missingKeywords,
        matchResults.matchedKeywords
      ),
      totalJobKeywords,
      aiPowered: false
    };
  }

  /**
   * Normalize and extract keywords from text
   * @param {string} text - Input text to process
   * @returns {Array} - Array of normalized keywords
   */
  extractKeywords(text) {
    if (!text || typeof text !== 'string') {
      return [];
    }

    // Convert to lowercase and remove extra whitespace
    let normalized = text.toLowerCase().trim();
    
    // Remove special characters but preserve hyphens and periods in technical terms
    normalized = normalized.replace(/[^\w\s\-\.]/g, ' ');
    
    // Split into words and filter
    let words = normalized.split(/\s+/).filter(word => word.length > 2);
    
    // Remove common stopwords but preserve technical terms
    words = removeStopwords(words, eng).filter(word => {
      // Keep preserved technical terms
      if (this.preservedTerms.has(word)) return true;
      
      // Filter out very common words and single characters
      return word.length > 2 && !this.isCommonWord(word);
    });

    // Extract multi-word technical phrases
    const phrases = this.extractPhrases(normalized);
    
    // Combine single words and phrases
    const allKeywords = [...words, ...phrases];
    
    // Remove duplicates and return
    return [...new Set(allKeywords)];
  }

  /**
   * Extract common technical phrases from text
   * @param {string} text - Input text
   * @returns {Array} - Array of extracted phrases
   */
  extractPhrases(text) {
    const phrases = [];
    const commonPhrases = [
      /machine\s+learning/g,
      /data\s+science/g,
      /software\s+engineer/g,
      /full\s+stack/g,
      /front\s+end/g,
      /back\s+end/g,
      /web\s+development/g,
      /project\s+management/g,
      /business\s+analysis/g,
      /quality\s+assurance/g,
      /user\s+experience/g,
      /user\s+interface/g,
      /database\s+design/g,
      /system\s+design/g,
      /cloud\s+computing/g,
      /artificial\s+intelligence/g
    ];

    commonPhrases.forEach(regex => {
      const matches = text.match(regex);
      if (matches) {
        phrases.push(...matches.map(match => match.replace(/\s+/g, ' ').trim()));
      }
    });

    return phrases;
  }

  /**
   * Check if a word is too common to be meaningful
   * @param {string} word - Word to check
   * @returns {boolean} - True if word is too common
   */
  isCommonWord(word) {
    const commonWords = new Set([
      'experience', 'work', 'team', 'project', 'company', 'business',
      'management', 'development', 'application', 'system', 'service',
      'client', 'customer', 'solution', 'process', 'support', 'analysis',
      'design', 'implementation', 'requirements', 'responsible', 'ensure',
      'provide', 'develop', 'create', 'manage', 'lead', 'coordinate',
      'collaborate', 'maintain', 'improve', 'optimize', 'implement'
    ]);
    
    return commonWords.has(word);
  }

  /**
   * Calculate similarity between two keyword sets
   * @param {Array} resumeKeywords - Keywords from resume
   * @param {Array} jobKeywords - Keywords from job description
   * @returns {Object} - Match analysis results
   */
  calculateMatch(resumeKeywords, jobKeywords) {
    const resumeSet = new Set(resumeKeywords.map(k => k.toLowerCase()));
    const jobSet = new Set(jobKeywords.map(k => k.toLowerCase()));
    
    // Find exact matches
    const exactMatches = [...jobSet].filter(keyword => resumeSet.has(keyword));
    
    // Find partial matches using stemming
    const partialMatches = [];
    const stemmedResume = new Set(resumeKeywords.map(k => this.stemmer.stem(k.toLowerCase())));
    
    [...jobSet].forEach(jobKeyword => {
      if (!exactMatches.includes(jobKeyword)) {
        const stemmedJob = this.stemmer.stem(jobKeyword.toLowerCase());
        if (stemmedResume.has(stemmedJob)) {
          partialMatches.push(jobKeyword);
        }
      }
    });
    
    const allMatches = [...exactMatches, ...partialMatches];
    const missingKeywords = [...jobSet].filter(k => !allMatches.includes(k));
    
    return {
      matchedKeywords: allMatches,
      missingKeywords: missingKeywords,
      exactMatches: exactMatches.length,
      partialMatches: partialMatches.length
    };
  }

  /**
   * Generate suggestions based on missing keywords
   * @param {Array} missingKeywords - Keywords missing from resume
   * @param {Array} matchedKeywords - Keywords already matched
   * @returns {string} - Formatted suggestions
   */
  generateSuggestions(missingKeywords, matchedKeywords) {
    if (missingKeywords.length === 0) {
      return "Excellent keyword alignment! Your resume matches well with the job requirements. Consider adding specific metrics and achievements to strengthen your application.";
    }

    const priorityKeywords = missingKeywords.slice(0, 8); // Focus on top missing keywords
    const suggestions = [];

    // Categorize missing keywords
    const technicalSkills = priorityKeywords.filter(k => this.isTechnicalSkill(k));
    const softSkills = priorityKeywords.filter(k => this.isSoftSkill(k));
    const other = priorityKeywords.filter(k => !this.isTechnicalSkill(k) && !this.isSoftSkill(k));

    if (technicalSkills.length > 0) {
      suggestions.push(`Technical Skills: Consider highlighting experience with ${technicalSkills.slice(0, 4).join(', ')} in your skills section or project descriptions.`);
    }

    if (softSkills.length > 0) {
      suggestions.push(`Soft Skills: Incorporate examples demonstrating ${softSkills.slice(0, 3).join(', ')} in your experience descriptions.`);
    }

    if (other.length > 0) {
      suggestions.push(`Industry Terms: Include relevant keywords like ${other.slice(0, 3).join(', ')} to better match the job requirements.`);
    }

    suggestions.push(`Overall: Focus on quantifiable achievements and use action verbs. Consider tailoring your resume summary to include 3-4 key terms from the job posting.`);

    return suggestions.join(' ');
  }

  /**
   * Check if keyword is a technical skill
   * @param {string} keyword - Keyword to check
   * @returns {boolean} - True if technical skill
   */
  isTechnicalSkill(keyword) {
    const technicalPatterns = [
      /^(javascript|python|java|react|angular|vue|node|express)$/i,
      /^(mongodb|sql|postgresql|mysql|redis|elasticsearch)$/i,
      /^(aws|azure|gcp|docker|kubernetes|jenkins|git)$/i,
      /^(html|css|typescript|php|ruby|golang|rust|scala)$/i,
      /^(api|rest|graphql|microservices|devops|ci\/cd)$/i
    ];
    
    return technicalPatterns.some(pattern => pattern.test(keyword));
  }

  /**
   * Check if keyword is a soft skill
   * @param {string} keyword - Keyword to check
   * @returns {boolean} - True if soft skill
   */
  isSoftSkill(keyword) {
    const softSkills = [
      'leadership', 'communication', 'teamwork', 'collaboration',
      'problem-solving', 'analytical', 'creative', 'adaptable',
      'organized', 'detail-oriented', 'self-motivated', 'proactive'
    ];
    
    return softSkills.some(skill => keyword.toLowerCase().includes(skill));
  }

  /**
   * Main analysis function - now uses AI-powered analysis
   * @param {string} resumeText - Resume content
   * @param {string} jobDescription - Job description content
   * @returns {Object} - Complete analysis results
   */
  async analyzeResume(resumeText, jobDescription) {
    try {
      // Use AI-powered analysis with Pollinations.AI
      const result = await this.analyzeWithAI(resumeText, jobDescription);
      
      return {
        ...result,
        analysisMethod: result.aiPowered ? 'AI-Powered' : 'Keyword-Based'
      };

    } catch (error) {
      console.error('Resume analysis error:', error);
      throw new Error('Failed to perform resume analysis');
    }
  }
}

module.exports = new KeywordService();
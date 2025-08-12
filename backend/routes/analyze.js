const express = require('express');
const Joi = require('joi');
const keywordService = require('../services/keywordService');
const router = express.Router();

// Input validation schema
const analyzeSchema = Joi.object({
  resumeText: Joi.string()
    .min(50)
    .max(50000)
    .required()
    .messages({
      'string.empty': 'Resume text is required',
      'string.min': 'Resume text must be at least 50 characters',
      'string.max': 'Resume text must not exceed 50,000 characters',
      'any.required': 'Resume text is required'
    }),
  jobDescription: Joi.string()
    .min(50)
    .max(20000)
    .required()
    .messages({
      'string.empty': 'Job description is required',
      'string.min': 'Job description must be at least 50 characters',
      'string.max': 'Job description must not exceed 20,000 characters',
      'any.required': 'Job description is required'
    })
});

/**
 * POST /api/analyze
 * Analyzes resume against job description
 */
router.post('/analyze', async (req, res) => {
  try {
    // Validate input
    const { error, value } = analyzeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
        code: 'VALIDATION_ERROR'
      });
    }

    const { resumeText, jobDescription } = value;

    // Perform keyword analysis
    const analysisResult = await keywordService.analyzeResume(resumeText, jobDescription);

    // Return successful response
    res.status(200).json({
      success: true,
      data: {
        matchScore: analysisResult.matchScore,
        missingKeywords: analysisResult.missingKeywords,
        matchedKeywords: analysisResult.matchedKeywords,
        suggestedAdditions: analysisResult.suggestedAdditions,
        totalJobKeywords: analysisResult.totalJobKeywords,
        analysisTimestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze resume',
      code: 'ANALYSIS_ERROR'
    });
  }
});

module.exports = router;
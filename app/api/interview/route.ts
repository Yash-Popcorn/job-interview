import { generateObject, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const evaluationSchema = z.object({
  relevance: z.number().min(1).max(10),
  clarity: z.number().min(1).max(10),
  technicalAccuracy: z.number().min(1).max(10),
  specificStrengths: z.array(z.string()),
  improvementAreas: z.array(z.string()),
  followUpQuestions: z.array(z.string()),
  meetsCriteria: z.boolean()
});

async function generateOptimizedResponse(context: any, messages: any[]) {
  let currentResponse = '';
  let iterations = 0;
  const MAX_ITERATIONS = 3;

  // Initial response generation
  const initialResponse = await generateText({
    model: openai('gpt-4o'),
    system: context.systemPrompt,
    messages,
  });

  currentResponse = initialResponse;

  // Evaluation-optimization loop
  while (iterations < MAX_ITERATIONS) {
    // Evaluate current response
    const evaluation = await generateObject({
      model: openai('gpt-4o'),
      schema: evaluationSchema,
      system: `You are an expert interview evaluator. Analyze the AI interviewer's response.
Job Description: ${context.jobDescription}
Required Skills: ${context.requiredSkills}`,
      messages: [
        { role: 'user', content: `Evaluate this interviewer response: ${currentResponse}` }
      ]
    });

    // Check if quality meets threshold
    if (
      evaluation.relevance >= 8 &&
      evaluation.clarity >= 8 &&
      evaluation.technicalAccuracy >= 8 &&
      evaluation.meetsCriteria
    ) {
      break;
    }

    // Safely join improvement areas (if defined) or provide a fallback message.
    const improvementFeedback =
      evaluation.improvementAreas?.join('\n') || 'No improvement suggestions provided.';

    // Generate improved response based on feedback
    const improvedResponse = await generateText({
      model: openai('gpt-4o'),
      system: context.systemPrompt,
      messages: [
        ...messages,
        {
          role: 'system',
          content: `Improve your previous response based on this feedback:
          Areas to improve: ${improvementFeedback}
          Previous response: ${currentResponse}`
        }
      ]
    });

    currentResponse = improvedResponse;
    iterations++;
  }

  return {
    response: currentResponse,
    iterationsRequired: iterations
  };
}

export async function POST(req: Request) {
  const { messages, context } = await req.json();
  const { jobDescription, resumeContext, requiredSkills, chatContext } = context;

  // Get the last message (candidate's response) if it exists
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
  
  // Get evaluation if there's a candidate response
  let evaluationResult = null;
  if (lastMessage && lastMessage.role === 'user') {
    evaluationResult = await generateObject({
      model: openai('gpt-4o'),
      schema: evaluationSchema,
      system: `You are an expert interview evaluator. Analyze the candidate's response in the context of the job requirements.
Job Description: ${jobDescription}
Required Skills: ${requiredSkills}`,
      messages: [
        { role: 'user', content: `Evaluate this interview response: ${lastMessage.content}` }
      ]
    });
  }

  const systemPrompt = `You are an expert AI recruiting assistant conducting job interviews.
Current interview context:
- Job Description: ${jobDescription}
- Required Skills: ${requiredSkills}
${chatContext ? `- Additional Context: ${chatContext}` : ''}

Candidate Background:
${resumeContext}

${evaluationResult ? `
Last response evaluation:
- Relevance: ${evaluationResult.relevance}/10
- Clarity: ${evaluationResult.clarity}/10
- Technical Accuracy: ${evaluationResult.technicalAccuracy}/10
- Strengths: ${evaluationResult.specificStrengths?.join(', ') || 'None'}
- Areas for Improvement: ${evaluationResult.improvementAreas?.join(', ') || 'None'}
- Suggested Follow-ups: ${evaluationResult.followUpQuestions?.join(', ') || 'None'}` : ''}

Your objectives:
1. Ask relevant questions based on the candidate's resume and job requirements
2. Focus on experience gaps and skill verification
3. Probe deeper when answers need clarification
4. Maintain professional, conversational tone
5. Ask one question at a time
6. Start with a brief introduction and then begin with your first question
${evaluationResult ? '7. Use the evaluation insights to guide your next question' : ''}`;

  // Generate optimized interview response
  const { response, iterationsRequired } = await generateOptimizedResponse(
    { systemPrompt, jobDescription, requiredSkills },
    messages
  );
  
  // Ensure we're returning a string for the nextQuestion
  return Response.json({
    evaluation: evaluationResult,
    nextQuestion: typeof response === 'object' ? response.text || String(response) : response,
    iterationsRequired
  });
}


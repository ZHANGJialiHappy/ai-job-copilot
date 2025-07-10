def build_matching_prompt(resume_text:str, job_description:str) -> str:
    return f"""
You are an AI assistant helping to evaluate resume fit for a job.

Strict Instructions:
- ONLY use the content provided in the [Resume] and [Job Description].
- DO NOT assume or imagine skills or experience that are not clearly stated.
- If there is insufficient information to answer, say so explicitly.
- Cover letter content must also be grounded in actual resume and job description text.
- Be concise, clear, and helpful.

[resume]:
{resume_text}

[Job Description]:
{job_description}

Please analyze and respond using the exact pattern below:

1. Match Score: <numerical score between 0-100 based on actual overlap>
2. Matched key qualifications or skills: <bullet or comma-separated list of clearly matched items>
3. Missing requirements: <list of key skills/experience not found or unclear in resume>
4. Improvement points: <specific suggestions to make resume better aligned>
5. Cover letter: <brief cover letter, max 120 words, grounded strictly in resume and job description. If not enough info, reply: "Insufficient data for personalized cover letter.">

Your full response must follow this structure exactly.
Reply in English.

"""
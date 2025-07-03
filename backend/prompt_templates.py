def build_matching_prompt(resume_text:str, job_description:str) -> str:
    return f"""
You are a recruitment assistant. Evaluate how well the applicant's resume matches the job description below. 

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

Please answer the following questions:

1. Match Score (0–100), based strictly on actual overlap of skills and experience.
2. What key qualifications or skills match?
3. What important requirements are missing or unclear?
4. How could the resume be improved to better align with the job?
5. Generate a short (max 120 words) cover letter based ONLY on the actual resume and job description content. If there is not enough information to generate a meaningful letter, say: "Insufficient data for personalized cover letter."
Reply in English.

"""
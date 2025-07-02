def build_matching_prompt(resume_text:str, job_description:str) -> str:
    return f"""
You are a recruitment expert. Please evaluate the match between the applicant and the position based on the following two contents and give suggestions.

[resume]:
{resume_text}

[Job Description]:
{job_description}

Please answer the following questions:
1. Match score (0-100):
2. What are the key skills that match?
3. What are the key skills or experiences that are missing?
4. How to optimize your resume?
5. Please help me generate a short cover letter.
Reply in English.

"""
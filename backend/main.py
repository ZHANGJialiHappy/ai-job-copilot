from fastapi import FastAPI, Form

from openrouter_client import ask_model
from prompt_templates import build_matching_prompt


app=FastAPI()

@app.post("/analyze")
def analyze(resume: str = Form(...), jd: str = Form(...)):
    prompt = build_matching_prompt(resume, jd)
    result = ask_model(prompt)
    return {"result": result}
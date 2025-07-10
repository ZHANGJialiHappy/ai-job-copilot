from fastapi import FastAPI, UploadFile
import pdfplumber
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
from openrouter_client import ask_model
from prompt_templates import build_matching_prompt


app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 或者指定你的前端地址，如 http://localhost:3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_pdf(file: BytesIO) -> str:
    text = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text.strip()

@app.post("/analyze")
async def analyze(resume: UploadFile, jd: UploadFile):
    resume_contents = await resume.read()  # 从上传的PDF文件中读取二进制内容(bytes)
    resume_text = extract_text_from_pdf(BytesIO(resume_contents)) # 用BytesIO把bytes包装成类文件对象，供pdfplumber读取并提取文本
    
    jd_contents = await jd.read()
    jd_text = extract_text_from_pdf(BytesIO(jd_contents))
    
    prompt = build_matching_prompt(resume_text, jd_text)
    result = ask_model(prompt)
    return {"result": result}
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_model():
    # โหลดโมเดลจริง
    return None

model = load_model()

def predict(image: Image.Image):
    # จำลองผลลัพธ์จากโมเดล
    # เปลี่ยนเป็นการทำนายจากโมเดลของคุณได้
    return "ready"

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    result = predict(image)
    return {"result": result}

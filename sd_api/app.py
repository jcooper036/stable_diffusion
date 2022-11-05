import base64
from io import BytesIO
import os

from diffusers import StableDiffusionPipeline
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import torch
from torch import autocast

app = FastAPI()
auth_token = os.environ['HUGGINGFACE_AUTH_TOKEN']
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

device = 'cuda'
model_id = "CompVis/stable-diffusion-v1-4"
pipe = StableDiffusionPipeline.from_pretrained(
    model_id,
    revision='fp16',
    torch_dtype=torch.float16,
    use_auth_token=auth_token,
)
pipe.to(device)


@app.get("/")
def generate(prompt: str):
    with autocast(device):
        image = pipe(prompt, guidance_scale=8.5).images[0]

    image.save("testimage.png")
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    imgstr = base64.b64decode(buffer.getvalue())
    return Response(content=imgstr, media_type="image/png")

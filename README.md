# stable_diffusion
Some code practice for stable diffusion and react. Mostly because some guy
on youtube put up a video about FastAPI and react. I've used FastAPI before
and thought it would be cool to get another perspective. I've been wanting to
try react and though this was a good place to jump in.


From this tutorial:
https://www.youtube.com/watch?v=3l16wCsDglU

# Python API
Build using FastAPI

## deploy
### get an auth token from huggingface for the model
The model comes from Hugging Face, and you'll need an [api tokem](https://huggingface.co/docs/hub/security-tokens)
to download it. Set the token as an env variable called `HUGGINGFACE_AUTH_TOKEN`
```bash
echo auth_token="$API_TOKEN" > sd_api/auth_token.py
```
### run locally
```bash
python -m uvicorn sd_api.app:app
```
The first time running this it will need to download the model, which takes few 
minutes. Following that, the docs page can be found at http://127.0.0.1:8000/docs.


## SIGTERM vs SIGKILL
If there is an error about this beacuse Windows, replace
```python
signal=signal.SIGKILL ->> signal=signal.SIGTERM 
```
at the path in the virtualenv. This is awful cause it changes the source code, 
but it's the solution that I've been able to work out so far.

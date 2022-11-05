# Stable Diffusion FastAPI and React app
This repo is some code practice that follows a tutorial for building a python FastAPI backend to serve Stable Diffusion models to a React frontend. I did this because YouTube recommended a [video version of this tutorial](https://www.youtube.com/watch?v=3l16wCsDglU), and I have some experience with FastAPI plus I've been wanting to learn React. This turns out to be a good jumping point for learning both, since the video is laser focused on building an MVP but uses some cool features of both frameworks to do so.

Some of the real challenge is the enviornment set up, which the video doesn't go into at all. This turned out to be more of a test of enviroment construction than anything else. But what else is there to programing really 🤷?

# Python API
Build using [FastAPI](https://fastapi.tiangolo.com/)

## CUDA
You'll need to be able to install and use the pytorch cuda implimentation. Make sure that you build pytorch for the cuda source (the requirements file should have the index).

## deploy
### get an auth token from huggingface for the model
The model comes from Hugging Face, and you'll need an [api tokem](https://huggingface.co/docs/hub/security-tokens) to download it. Set the token as an env variable called `HUGGINGFACE_AUTH_TOKEN`
```bash
echo auth_token="$API_TOKEN" > sd_api/auth_token.py
```
### run locally
```bash
python -m uvicorn sd_api.app:app
```
The first time running this it will need to download the model, which takes few minutes. Following that, the docs page can be found at http://127.0.0.1:8000/docs.


# React App
## Install npm
Broadly, I had to install node.js for windows, then install [nvm for windows[(https://github.com/coreybutler/nvm-windows)]. After that, I was able to create a new react project with 
```bash
npx create-react-app sd-app
cd my-app
npm start
```
I'll adimit that being new to this I don't really understand dependency management for js, and it looks like there would probably be a way to build the npm env using the `package-lock.json` or the `package.json` (the packages that I installed are listed in there at least). I think the only two that I installed for this were `axios` and `chakra-ui`. 

The `create-react-app` function builds more than you need, but that's fine. I think I left the App.css in because it looks neat and it's fun to play around with, but it and the logo obviosly aren't needed.

## Developing
Developing turns out to be super simple. Just run `npm start` (as seen above) 

# Notes
This was much more about eviornment construction than anything, it was 95% of the work. This is quite easy to get going if the enviornment is set up.

## CUDA doesn't really work on WSL
After a lot of reading and trouble shooting, it seems like the consensus is "it's complicated" and "you might have done something a long time ago that, short of a system wipe and reboot, will be tought to get around". I had a much easier time getting it to work out of the Windows enviornment, but in turn that meant setting up my dev enviornment in Windows (where previously I had relied on WSL)

### Window dev env
While it is way better than it used to be, there are some quirks.
- never take for granted that something exists, be ready to be flexible and look for a windows specific implimentation or change tactics entirely
- no python sub functions work for me unless I do `python -m` first (`pip`, `uvivorn`, etc) within the virtual enviornment. This is a known thing apparently.
- Somewhere there are zombie paths that try to run python that can't. I didn't fix them but they haven't blocked anything yet.
- `virtualenv` doesn't work, you have to use `venv`


## SIGTERM vs SIGKILL
If there is an error about this beacuse Windows, replace
```python
signal=signal.SIGKILL ->> signal=signal.SIGTERM 
```
at the path in the virtualenv. This is awful cause it changes the source code, but it's the solution that I've been able to work out so far.

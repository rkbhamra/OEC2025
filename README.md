# DisasterMaster

The project uses Flask for server hosting, Python as the backend, HTML and JS for the frontend, and spaCy as the NLP model library. To run the project, please make sure you have all those installed. To install spaCy, please use the following commands:
1. `pip install spacy`
2. `python -m spacy download en_core_web_sm`

Gemini uses an API key. In order to run the project, an API key will be needed in the file `gemini.py` inside the backend folder.This project also uses two different APIs to get the user's IP address and data:
1. `https://api.ipify.org?format=json`
2. `https://api.ipapi.is?q=${data.ip}`

```javascript
async function getUserLocation() {
    return fetch("https://api.ipify.org?format=json")
        .then((res) => res.json())
        .then((data) => {
            return fetch(`https://api.ipapi.is?q=${data.ip}`).then((res2) => res2.json());
        });
}
```

To run the program,
1. Download the zip file from GitHub into a desktop folder.
2. Run the command `python backend/server.py`
3. Open up the html page `frontend/home/index.html`
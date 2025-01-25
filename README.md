#REQUIREMENTS TO DOWNLOAD LIBRARIES

The porject uses Flask for server hosting, python as the backend, html and JS for the frontend and spaCy as the NLP model library. To run the project, please make sure you have all those installed. To install spaCy please use the following commands:
1. pip install spacy
2. python -m spacy download en_core_web_sm

This project also uses two different APIs to get the user's IP address and data:
1. https://api.ipify.org?format=json
2. https://api.ipapi.is?q=${data.ip}

```
async function getUserLocation() {
  return fetch("https://api.ipify.org?format=json")
    .then((res) => res.json())
    .then((data) => {
      return fetch(`https://api.ipapi.is?q=${data.ip}`).then((res2) => res2.json());
    });
}
```




import axios from "axios";

export const translate = async (text: string, from: string, to: string, setValue: (e: string) => void) => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", from);
    encodedParams.append("target_language", to);
    encodedParams.append("text", text);

    const options = {
        method: 'POST',
        url: 'https://text-translator2.p.rapidapi.com/translate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'ceb5fda5b5msha42fac6af934d1cp1fc8c1jsn2d311a06007b',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        data: encodedParams
    };

    axios.request(options).then(function (response) {
        setValue(response.data.data.translatedText);
    }).catch(function (error) {
        setValue(error);
    });
};
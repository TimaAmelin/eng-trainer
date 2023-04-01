import { useState } from "react";
import { translate } from "../../functions/translate";
import { addDoc, collection } from 'firebase/firestore';

import './Translator.css'
import { db } from "../../firebase/firebase";

export const Translator = () => {
	const [value, setValue] = useState<string>('');
	const [from, setFrom] = useState<string>('');
	const [to, setTo] = useState<string>('');
	const [translatedValue, setTranslatedValue] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const wordsCollectionRef = collection(db, 'words');

    const saveWord = async (word: {en: string, ru: string, memoryCounter: number}) => {
        if (!word.en || !word.ru) {
            setMessage('Введите слово!');
            return
        }
        setMessage('');
        await addDoc(wordsCollectionRef, word).then(() => {
            setMessage('Добавлено!');
            setValue('');
            setTranslatedValue('');
        });
    };

    return (
        <div className="translator">
			<textarea className="input" value={value} onChange={(e) => {
                setValue(e.target.value);
                if (
                    e.target.value.includes('a') ||
                    e.target.value.includes('e') ||
                    e.target.value.includes('u') ||
                    e.target.value.includes('o') ||
                    e.target.value.includes('a') ||
                    e.target.value.includes('i')
                ) {
                    setFrom('en');
                    setTo('ru');
                } else if (
                    e.target.value.includes('а') ||
                    e.target.value.includes('о') ||
                    e.target.value.includes('у') ||
                    e.target.value.includes('ы') ||
                    e.target.value.includes('э') ||
                    e.target.value.includes('я') ||
                    e.target.value.includes('ю') ||
                    e.target.value.includes('и') ||
                    e.target.value.includes('е') ||
                    e.target.value.includes('ё')
                ) {
                    setFrom('ru');
                    setTo('en');
                };
            }} />
            <div>
                <input value={from} onChange={(e) => setFrom(e.target.value)} className="lang" list="from" />
                <datalist id="from">
                    <option value="en" />
                    <option value="ru" />
                </datalist>
			    <button className="button" onClick={() => translate(value, from, to, setTranslatedValue)}>Перевести</button>
                <input value={to} onChange={(e) => setTo(e.target.value)} className="lang" list="to" />
                <datalist id="to">
                    <option value="en" />
                    <option value="ru" />
                </datalist>
            </div>
            <textarea className="input" value={translatedValue} onChange={(e) => setTranslatedValue(e.target.value)} />
            <button className="button" onClick={() => saveWord({
                en: from === 'en' ? value : translatedValue,
                ru: from === 'en' ? translatedValue : value,
                memoryCounter: 5
            })}>Сохранить</button>
            <div className="row message">{message}</div>
        </div>
    )
}
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';

import { db } from "../../firebase/firebase";

import './Trainer.css';

export const Trainer = ({wordCollection} : {wordCollection: string}) => {
	const [value, setValue] = useState<string>('');
	const [fromTo, setFromTo] = useState<string>('');
	const [userValue, setUserValue] = useState<string>('');
	const [translatedValue, setTranslatedValue] = useState<string>('');
    const [words, setWords] = useState<any[]>([]);
    const [word, setWord] = useState<any>({});
    const [message, setMessage] = useState<string>('');

    const wordsCollectionRef = collection(db, wordCollection);

    const getWords = async () => {
        await getDocs(wordsCollectionRef).then(data => {
            const docs = data.docs as any[];
            const wordsGotten = docs.map(doc => ({
                ...doc._document.data.value.mapValue.fields,
                key: doc._document.key.path.segments[6]
            }));
            setWords(wordsGotten);
        });
    };

    const editWord = async (word: {en: any, ru: any, memoryCounter: number, key: string}) => {
        updateDoc(doc(db, wordCollection, word.key), {en: word.en.stringValue, ru: word.ru.stringValue, memoryCounter: word.memoryCounter}).then(() => setMessage(word.memoryCounter === 5 ? 'Не расстраивайся, все получится!' : 'Ты умница!'));
        setWords(words.map(wrd => wrd.key !== word.key ? wrd : {...wrd, memoryCounter: {integerValue: String(word.memoryCounter)}}));
        chooseWord(words.map(wrd => wrd.key !== word.key ? wrd : {...wrd, memoryCounter: {integerValue: String(word.memoryCounter)}}), fromTo)
    }

    const chooseWord = (words: any[], fromTo: string) => {
        setWord('');
        setTranslatedValue('');
        setUserValue('');
        const wordsWithoutZero = words.filter(word => word.memoryCounter.integerValue !== '0')
        if (wordsWithoutZero.length) {
            const wordNumber = Math.floor(Math.random() * wordsWithoutZero.length);
            const chosenWord = wordsWithoutZero[wordNumber];
            if (chosenWord.key !== word.key) {
                setWord(chosenWord);
    
                if (fromTo === 'ru -> en') {
                    setValue(chosenWord.ru.stringValue);
                } else {
                    setValue(chosenWord.en.stringValue);
                };
            } else {
                chooseWord(words, fromTo);
            };
        };
    };

    useEffect(() => {
        getWords();
    }, []);

    return (
        <div className="trainer">
			<textarea className="input" value={value} onChange={(e) => setValue(e.target.value)} />
            <div>
                <input value={fromTo} onChange={(e) => {
                    setFromTo(e.target.value);
                    chooseWord(words, e.target.value);
                }} className="lang2" list="from" />
                <datalist id="from">
                    <option value="en -> ru" />
                    <option value="ru -> en" />
                </datalist>
			    <button className="button" onClick={() => setTranslatedValue(fromTo === 'ru -> en' ? word.en.stringValue : word.ru.stringValue)}>Проверить</button>
            </div>
            <div className="row">
                <textarea className="input" value={userValue} onChange={(e) => setUserValue(e.target.value)} />
                <textarea className="input" value={translatedValue} onChange={(e) => setTranslatedValue(e.target.value)} />
            </div>
            <div className="row">
                <button className="button" onClick={() => editWord({...word, memoryCounter: 5})}>Неправильно</button>
                <button className="button" onClick={() => editWord({...word, memoryCounter: word.memoryCounter.integerValue - 1})}>Правильно</button>
            </div>
            <div className="row message">{message}</div>
        </div>
    )
}
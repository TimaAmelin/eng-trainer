import { useState } from 'react';
import './App.css';
import { Trainer } from './components/Trainer/Trainer';
import { Translator } from './components/Translator/Translator';
function App() {
	const [page, setPage] = useState('translator');
	const [wordCollection, setWordCollection] = useState('');
	const [wordCollectionFinal, setWordCollectionFinal] = useState('');

	return (
		!wordCollectionFinal ? (
			<div className="App">
				<h1>Введите название вашей коллекции слов</h1>
				<input className="input" value={wordCollection} onChange={e => setWordCollection(e.target.value)} />
				<button className="button" onClick={() => setWordCollectionFinal(wordCollection)}>Приступим!</button>
			</div>
		) : (
			<div className="App">
				{page === 'translator' ? <Translator wordCollection={wordCollection} /> : <Trainer wordCollection={wordCollection} />}
				<button className="button" onClick={() => {
					setPage(page === 'trainer' ? 'translator' : 'trainer');
				}}>{page === 'translator' ? 'Учить' : 'Добавить слова'}</button>
			</div>
		)
	);
}

export default App;

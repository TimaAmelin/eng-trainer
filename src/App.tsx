import { useState } from 'react';
import './App.css';
import { Trainer } from './components/Trainer/Trainer';
import { Translator } from './components/Translator/Translator';
function App() {
	const [page, setPage] = useState('translator');

	return (
		<div className="App">
			{page === 'translator' ? <Translator /> : <Trainer />}
			<button className="button" onClick={() => {
				setPage(page === 'trainer' ? 'translator' : 'trainer');
			}}>{page === 'translator' ? 'Учить' : 'Добавить слова'}</button>
		</div>
	);
}

export default App;

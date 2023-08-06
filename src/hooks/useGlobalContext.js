import { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);

	const [Uid, setUid] = useState('');
	const [UserNum, setUserNum] = useState(-1);
	const [DisplayName, setDisplayName] = useState('');

	return (
		<GlobalContext.Provider
			value={{
				MenuOpen,
				setMenuOpen,
				Uid,
				setUid,
				UserNum,
				setUserNum,
				DisplayName,
				setDisplayName,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}

export function useGlobalData() {
	const globalContext = useContext(GlobalContext);
	if (!globalContext) throw new Error('useGlobalData hook은 GlobalProvider 컴포넌트안에서만 호출이 가능합니다.');

	return globalContext;
}

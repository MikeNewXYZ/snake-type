import { DirectionWordsProvider } from "./DirectionWordsContext";

type AppProviderProps = {
	children: React.ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
	return <DirectionWordsProvider>{children}</DirectionWordsProvider>;
}

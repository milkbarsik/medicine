import { AxiosError } from "axios";
import { useState } from "react";

type error = {
	message: string;
	status: number | undefined;
}

type UseFetchReturn = {
  isLoading: boolean;
  error: error;
  fetching: () => Promise<void>;
};

export function useFetch (foo: () => Promise<any>): UseFetchReturn {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<error>({message: '', status: undefined});

	const fetching = async () => {
		try {
			setIsLoading(true);
			setError({message: '', status: undefined});
			await foo();
		} catch (e) {
			if (e instanceof Error) {
				setError({message: e.message, status: undefined});
			}
			if (e instanceof AxiosError) {
				setError({message: e.response?.data.message, status: e.response?.status});
			}
		} finally {
			setIsLoading(false);
		}
	}
	
	return { fetching, isLoading, error }
}
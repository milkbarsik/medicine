import { type ChangeEvent, useState } from "react"

const useInput = (defaultValue: unknown) => {
	const [value, setValue] = useState<unknown>(defaultValue);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}

	return { value, onChange }
}

export default useInput;
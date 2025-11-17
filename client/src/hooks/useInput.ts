import { type ChangeEvent, useState } from "react"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useInput = (defaultValue: any) => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [value, setValue] = useState<any>(defaultValue);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}

	return { value, onChange }
}

export default useInput;
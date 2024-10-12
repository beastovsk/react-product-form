"use client";

import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import type { AutoCompleteProps } from "antd";

export type Option = {
	value: string;
	label: string;
};

export interface AutocompleteProps {
	initialOptions: Option[] | [];
	buttonWidth?: string;
	placeholderText?: string;
	onValueChange: (newValue: string) => void; // Callback для возврата значения наверх
}

export const Autocomplete = ({
	initialOptions,
	placeholderText,
	onValueChange,
	...props
}: AutocompleteProps) => {
	const [value, setValue] = useState("");
	const [options, setOptions] = useState<AutoCompleteProps["options"]>(
		initialOptions ?? []
	);

	// Обновляем опции при изменении initialOptions
	useEffect(() => {
		setOptions(initialOptions);
	}, [initialOptions]);

	const onSelect = (data: string) => {
		onValueChange(data);
		setValue(data);
	};

	const onChange = (data: string) => {
		onValueChange(data);
		setValue(data);
	};

	return (
		<AutoComplete
			value={value}
			options={options}
			style={{ width: 200 }}
			onSelect={onSelect}
			onChange={onChange}
			placeholder={placeholderText}
			{...props}
		/>
	);
};

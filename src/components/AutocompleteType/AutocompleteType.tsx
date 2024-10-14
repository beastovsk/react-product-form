import { useState, useEffect } from "react";
import { Autocomplete, AutocompleteProps } from "../ui/autocomplete";
import type { AutoCompleteProps } from "antd";

export const AutocompleteType = ({
	nameValue,
	...props
}: Omit<AutocompleteProps, "initialOptions"> & { nameValue?: string }) => {
	const [defaultOptions, setDefaultOptions] = useState<
		AutoCompleteProps["options"]
	>([]);

	useEffect(() => {
		if (nameValue) {
			getTypeOptions();
		} else {
			setDefaultOptions([]);
		}
	}, [nameValue]);

	const getTypeOptions = () => {
		switch (nameValue) {
			case "Цвет":
				setDefaultOptions([
					{ label: "Красный", value: "Красный" },
					{ label: "Синий", value: "Синий" },
					{ label: "Зелёный", value: "Зелёный" },
				]);
				break;
			case "Прочность":
				setDefaultOptions([
					{ label: "Низкая", value: "Низкая" },
					{ label: "Средняя", value: "Средняя" },
					{ label: "Высокая", value: "Высокая" },
				]);
				break;
			case "Тип упаковки":
				setDefaultOptions([
					{ label: "Картонная коробка", value: "Картонная коробка" },
					{
						label: "Пластиковая упаковка",
						value: "Пластиковая упаковка",
					},
					{
						label: "Металлическая банка",
						value: "Металлическая банка",
					},
				]);
				break;
			default:
				setDefaultOptions([]);
		}
	};

	return <Autocomplete initialOptions={defaultOptions} {...props} />;
};

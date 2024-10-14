import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "./components/ui";
import { Autocomplete } from "./components/ui/autocomplete";
import { useEffect, useState } from "react";
import { AutocompleteType } from "./components/AutocompleteType/AutocompleteType";

const productSchema = z.object({
	productName: z
		.string()
		.min(1, "Обязательное поле")
		.max(20, "Не более 20 символов")
		.regex(/^[А-Яа-я\s]+$/, "Используйте только кириллицу"),
	productCode: z
		.string()
		.min(3, "Минимум 3 символа")
		.max(10, "Максимум 10 символов")
		.regex(/^\d+$/, "Используйте только цифры"),
	characteristics: z
		.array(
			z.object({
				name: z
					.string()
					.min(3, "Минимум 3 символа")
					.regex(/^[А-Яа-я\s]+$/, "Используйте только кириллицу"),
				type: z
					.string()
					.min(3, "Минимум 3 символа")
					.regex(/^[А-Яа-я\s]+$/, "Используйте только кириллицу"),
			})
		)
		.min(1, "Добавьте хотя бы одну характеристику")
		.refine(
			(items) =>
				new Set(items.map((item) => item.name)).size === items.length,
			{
				message: "Названия характеристик должны быть уникальными",
				path: ["characteristics"],
			}
		),
});

const defaultNames = [
	{ label: "Цвет", value: "Цвет" },
	{ label: "Прочность", value: "Прочность" },
	{ label: "Тип упаковки", value: "Тип упаковки" },
];

const ProductForm = () => {
	const {
		register,
		control,
		handleSubmit,
		setValue,
		getValues,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(productSchema),
		defaultValues: {
			productName: "",
			productCode: "",
			characteristics: [{ name: "", type: "" }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "characteristics",
	});

	const onSubmit = (data) => {
		console.log({ ...data, productCode: `A2-${data.productCode}` });
	};

	const characteristics = useWatch({
		control,
		name: "characteristics",
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<div>
				<label className="text-sm">Название товара</label>
				<Input
					{...register("productName")}
					placeholder="Название товара"
				/>
				{errors.productName && (
					<p className="text-sm text-red-500 font-medium">
						{errors.productName.message}
					</p>
				)}
			</div>
			<div>
				<label className="text-sm">Код товара</label>
				<div className="flex items-center gap-2">
					<h3>A2-</h3>{" "}
					<Input
						{...register("productCode")}
						placeholder="Код товара"
					/>{" "}
				</div>
				{errors.productCode && (
					<p className="text-sm text-red-500 font-medium">
						{errors.productCode.message}
					</p>
				)}
			</div>
			<div>
				<Button
					type="button"
					className="w-full mb-5"
					onClick={() => append({ name: "", type: "" })}
				>
					Добавить характеристику
				</Button>
			</div>
			{fields.map((field, index) => {
				return (
					<div
						key={field.id}
						className="flex flex-col gap-3 border border-opacity-30 p-5 rounded-xl"
					>
						<h2 className="text-lg">Характеристика {index + 1}</h2>
						<div className="flex gap-3">
							<div className="flex flex-col">
								<label className="text-sm">Название</label>
								<Autocomplete
									initialOptions={defaultNames}
									onValueChange={(value) => {
										setValue(
											`characteristics.${index}.name`,
											value
										);
									}}
									{...register(
										`characteristics.${index}.name`
									)}
								/>
								{errors.characteristics?.[index]?.name && (
									<p className="text-sm text-red-500 font-medium">
										{
											errors.characteristics[index].name
												.message
										}
									</p>
								)}
							</div>

							<div className="flex flex-col">
								<label className="text-sm">Вид</label>
								<AutocompleteType
									onValueChange={(value) =>
										setValue(
											`characteristics.${index}.type`,
											value
										)
									}
									nameValue={
										getValues(
											`characteristics.${index}.name`
										) || ""
									}
									{...register(
										`characteristics.${index}.type`
									)}
								/>
								{errors.characteristics?.[index]?.type && (
									<p className="text-sm text-red-500 font-medium">
										{
											errors.characteristics[index].type
												.message
										}
									</p>
								)}
							</div>
						</div>

						<Button
							variant="destructive"
							type="button"
							onClick={() => remove(index)}
						>
							Удалить характеристику
						</Button>
					</div>
				);
			})}
			{errors.characteristics?.message && (
				<p className="text-sm text-red-500 font-medium">
					{errors.characteristics.message}
				</p>
			)}
			<Button type="submit" variant="outline" className="mt-10">
				Отправить
			</Button>
		</form>
	);
};

export default ProductForm;

import { Button, Flex, Form, Input, Select, Spin } from "antd";
import {
	CampaignEditT,
	CampaignI,
	CampaignNewT,
} from "../../entities/campaign/model";
import { CharacterI } from "../../entities/character/model";
import { useEffect } from "react";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

type FormValuesT = CampaignEditT | CampaignNewT;

interface CampaignFormPropsI {
	onSubmit?: (data: FormValuesT) => void;
	onTouched?: (isTouched: boolean) => void;
	initialValues?: CampaignI | { characters: string[] };
	isDisabled?: boolean;
	isPending?: boolean;
	characters: CharacterI[];
}

const defaultInitialValues: CampaignFormPropsI["initialValues"] = {
	characters: [],
};

function CampaignForm({
	onSubmit,
	onTouched,
	initialValues = defaultInitialValues,
	isDisabled = false,
	isPending = false,
	characters = [],
}: CampaignFormPropsI) {
	const [campaignForm] = Form.useForm<FormValuesT>();
	const formCharacters = Form.useWatch("characters", campaignForm);

	useEffect(() => {
		campaignForm.resetFields();
	}, [initialValues]);

	const onFinish = (values: any) => {
		onSubmit?.(values);
	};

	const onValuesChange = () => {
		onTouched?.(true);
	};
	return (
		<Form
			form={campaignForm}
			initialValues={initialValues}
			layout={"horizontal"}
			disabled={isDisabled || isPending}
			onFinish={onFinish}
			onFieldsChange={onValuesChange}
		>
			<Form.Item
				name="name"
				label="Имя"
				rules={[{ required: true, max: 50, type: "string" }]}
				style={{ maxWidth: 600 }}
			>
				<Input />
			</Form.Item>
			{characters.length > 0 && (
				<Form.List name="characters">
					{(campaignCharacters, { add, remove }) => (
						<div>
							{campaignCharacters.map((campaignCharacter, index) => {
								//TODO: тут приложение периодически падает, т.к. formCharacters == undefined
								const characterId = formCharacters[index];
								const characterFullData = characters.find(
									({ id }) => id === characterId,
								);
								return (
									<Flex
										key={campaignCharacter.key}
										gap="middle"
										align="baseline"
									>
										<Form.Item
											{...campaignCharacter}
											style={{ width: "25%" }}
											rules={[
												{ required: true, message: "Выберите персонажа" },
											]}
										>
											<Select
												options={characters.map(({ id, name, playerName }) => ({
													value: id,
													label: `${name} (${playerName})`,
													disabled: !!formCharacters.find(
														(char) => char === id,
													),
												}))}
												showSearch
												placeholder="Выберите персонажа"
												optionFilterProp="label"
											/>
										</Form.Item>
										<Form.Item>
											<Input
												placeholder="Имя игрока"
												disabled={true}
												value={characterFullData?.playerName}
											/>
										</Form.Item>
										<Form.Item>
											<Input
												placeholder="Здоровье"
												disabled={true}
												value={characterFullData?.health}
											/>
										</Form.Item>
										<Form.Item>
											<Input
												placeholder="Броня"
												disabled={true}
												value={characterFullData?.armor}
											/>
										</Form.Item>

										<CloseOutlined
											onClick={() => remove(campaignCharacter.name)}
										/>
									</Flex>
								);
							})}
							<Form.Item style={{ maxWidth: "25%" }}>
								<Button
									type="dashed"
									onClick={() => add()}
									block
									icon={<PlusOutlined />}
								>
									Добавить персонажа
								</Button>
							</Form.Item>
						</div>
					)}
				</Form.List>
			)}

			<Form.Item>
				<Flex gap={"small"} align={"center"}>
					<Button type="primary" htmlType="submit">
						Сохранить
					</Button>
					{isPending && <Spin />}
				</Flex>
			</Form.Item>
		</Form>
	);
}

export default CampaignForm;

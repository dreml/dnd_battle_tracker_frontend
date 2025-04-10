import {
	Button,
	Col,
	Divider,
	Flex,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Spin,
} from "antd";
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
			<div style={{ maxWidth: "600px" }}>
				<Divider orientation="left">Персонажи</Divider>
				<Row justify="space-between">
					<Col span={8}>Имя</Col>
					<Col span={4}>Здоровье</Col>
					<Col span={4}>Броня</Col>
					<Col span={1}></Col>
				</Row>
			</div>
			{characters.length > 0 && (
				<Form.List name="characters">
					{(campaignCharacters, { add, remove }) => (
						<div style={{ maxWidth: "600px" }}>
							{campaignCharacters.map((campaignCharacter, index) => {
								const characterId =
									campaignForm.getFieldValue("characters")[index];
								const characterFullData = characters.find(
									({ id }) => id === characterId,
								);
								return (
									<Row key={campaignCharacter.key} justify="space-between">
										<Col span={8}>
											<Form.Item
												{...campaignCharacter}
												rules={[
													{ required: true, message: "Выберите персонажа" },
												]}
											>
												<Select
													options={characters.map(
														({ id, name, playerName }) => ({
															value: id,
															label: `${name} (${playerName})`,
															disabled: campaignForm
																.getFieldValue("characters")
																.find((char: string) => char === id),
														}),
													)}
													showSearch
													placeholder="Выберите персонажа"
													optionFilterProp="label"
												/>
											</Form.Item>
										</Col>
										<Col span={4}>
											<Form.Item>
												<InputNumber
													placeholder="Здоровье"
													disabled={true}
													value={characterFullData?.health}
												/>
											</Form.Item>
										</Col>
										<Col span={4}>
											<Form.Item>
												<InputNumber
													placeholder="Броня"
													disabled={true}
													value={characterFullData?.armor}
												/>
											</Form.Item>
										</Col>
										<Col span={1}>
											<CloseOutlined
												onClick={() => remove(campaignCharacter.name)}
											/>
										</Col>
									</Row>
								);
							})}
							<Form.Item>
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

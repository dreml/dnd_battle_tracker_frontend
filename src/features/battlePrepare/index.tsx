import { CampaignI } from "../../entities/campaign/model";
import {
	CharacterForBattleI,
	CharacterI,
} from "../../entities/character/model";
import { MonsterForBattleI, MonsterI } from "../../entities/monster/model";
import { BattleTemplateI } from "../../entities/battleTemplate/model";
import { BattleI } from "../../entities/battle/model";
import { useEffect, useState } from "react";
import { Form, Input } from "antd";

interface BattlePreparePropsI {
	campaign: CampaignI;
	characters: CharacterI[];
	monsters: MonsterI[];
	battleTemplates: BattleTemplateI[];
	// initialValues?: BattlePrepareFormI | { characters: []; monsters: [] };
	isPending?: boolean;
	onBattleStart: (battleData: BattleI) => void;
}

interface BattlePrepareFormI {
	campaignId: CampaignI["id"];
	characters: CharacterForBattleI[];
	monsters: MonsterForBattleI[];
}

// const defaultInitialValues: BattlePreparePropsI["initialValues"] = {
// 	characters: [],
// 	monsters: [],
// };

function BattlePrepare({
	campaign,
	characters,
	monsters,
	battleTemplates,
	isPending = false,
	onBattleStart,
}: BattlePreparePropsI) {
	const [battlePrepareForm] = Form.useForm<BattlePrepareFormI>();
	const [formInitialValues, setFormInitialValues] =
		useState<BattlePrepareFormI>();

	useEffect(() => {
		const formValue: BattlePrepareFormI = {
			campaignId: campaign.id,
			characters: campaign?.characters.map((id) => ({
				id,
				initiative: 0,
			})),
			monsters: [],
		};
		setFormInitialValues(formValue);
		battlePrepareForm.resetFields();
	}, [campaign]);

	return (
		<Form form={battlePrepareForm} initialValues={formInitialValues}>
			<Form.Item name="campaignId" hidden>
				<Input />
			</Form.Item>
		</Form>
	);
}

export default BattlePrepare;

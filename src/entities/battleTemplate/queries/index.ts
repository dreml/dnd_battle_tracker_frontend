import { getBattleTemplate, getBattleTemplates } from "../api";

enum BattleTemplateQueryKey {
	battleTemplates = "battleTemplates",
	battleTemplate = "battleTemplate",
}

const battleTemplatesQueryOptions = () => ({
	queryKey: [BattleTemplateQueryKey.battleTemplates],
	queryFn: () => getBattleTemplates(),
});

const battleTemplateQueryOptions = (id: string) => ({
	queryKey: [BattleTemplateQueryKey.battleTemplate],
	queryFn: () => getBattleTemplate(id),
});

export {
	BattleTemplateQueryKey,
	battleTemplatesQueryOptions,
	battleTemplateQueryOptions,
};

export enum BattleQueryKey {
	battle = "battle",
}
export const battleQueryOptions = (id: string) => ({
	queryKey: [BattleQueryKey.battle, id],
	// queryFn: () => getCampaign(id),
});

import PageWrapper from "../../shared/ui/pageWrapper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CampaignI } from "../../entities/campaign/model";
import CharacterForm from "../../features/characterForm";
import { RouteProps, useParams } from "react-router";
import { CharacterNewT } from "../../entities/character/model";
import { campaignsQueryOptions } from "../../entities/campaign/queries";
import {
	CharacterQueryKey,
	characterQueryOptions,
} from "../../entities/character/queries";
import { characterUpdateMutation } from "../../entities/character/mutations";

function characterEdit() {
	const params: RouteProps = useParams();
	const characterId = params.id ?? "";

	const queryClient = useQueryClient();
	const campaignsQuery = useQuery(campaignsQueryOptions());
	const characterQuery = useQuery(characterQueryOptions(characterId));
	const editMutation = characterUpdateMutation(characterId, () => {
		void queryClient.invalidateQueries({
			queryKey: [CharacterQueryKey.character],
		});
		void queryClient.invalidateQueries({
			queryKey: [CharacterQueryKey.characters],
		});
	});
	const campaigns: CampaignI[] = campaignsQuery.data ?? [];
	const character = characterQuery?.data;
	const onSubmit = (data: CharacterNewT) => editMutation.mutate(data);

	const isPending =
		editMutation.isPending ||
		characterQuery.isPending ||
		campaignsQuery.isPending;

	const isError =
		editMutation.isError || characterQuery.isError || campaignsQuery.isError;

	const errorMessage =
		editMutation.error?.message ||
		characterQuery.error?.message ||
		campaignsQuery.error?.message;
	return (
		<PageWrapper
			header={character?.name || "Загружаем..."}
			isError={isError}
			errorMessage={errorMessage}
		>
			<CharacterForm
				campaigns={campaigns}
				initialValues={character}
				onSubmit={onSubmit}
				isDisabled={isPending}
				isPending={isPending}
			/>
		</PageWrapper>
	);
}

export default characterEdit;

import PageWrapper from "../../shared/ui/pageWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { getCampaigns } from "../../entities/campaign/api";
import { CampaignI } from "../../entities/campaign/model";
import CharacterForm from "../../features/characterForm";
import { RouteProps, useParams } from "react-router";
import { getCharacter, updateCharacter } from "../../entities/character/api";
import { CharacterNewT } from "../../entities/character/model";
import { campaignsQueryOptions } from "../../entities/campaign/queries";

function characterEdit() {
	const params: RouteProps = useParams();
	const characterId = params.id || "";

	const queryClient = useQueryClient();
	const campaignsQuery = useQuery(campaignsQueryOptions);
	const characterQuery = useQuery({
		queryKey: ["character"],
		queryFn: () => getCharacter(characterId),
	});
	const editMutation = useMutation({
		mutationFn: (data: CharacterNewT) => updateCharacter(characterId, data),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["character"] });
			void queryClient.invalidateQueries({ queryKey: ["characters"] });
		},
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

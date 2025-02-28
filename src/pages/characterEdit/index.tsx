import PageWrapper from "../../shared/ui/pageWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCampaigns } from "../../entities/campaign/api";
import { CampaignI } from "../../entities/campaign/model";
import CharacterForm from "../../features/characterForm";
import { RouteProps, useParams } from "react-router";
import { getCharacter, updateCharacter } from "../../entities/character/api";
import { CharacterI, CharacterNewT } from "../../entities/character/model";

function characterEdit() {
	const params: RouteProps = useParams();
	const characterId = params.id || "";

	const queryClient = useQueryClient();
	const campaignsQuery = useQuery({
		queryKey: ["campaigns"],
		queryFn: getCampaigns,
	});
	const characterQuery = useQuery({
		queryKey: ["character"],
		queryFn: () => getCharacter(characterId),
	});
	const editMutation = useMutation({
		mutationFn: (data: CharacterNewT) => updateCharacter(characterId, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["character"] }),
	});
	const campaigns: CampaignI[] = campaignsQuery.data ?? [];
	//TODO: разобраться с типом
	const character: CharacterI = characterQuery?.data;
	const onSubmit = (data: CharacterNewT) => editMutation.mutate(data);
	return (
		<PageWrapper
			header={character?.name || "Загружаем..."}
			isError={campaignsQuery.isError || editMutation.isError}
			errorMessage={
				campaignsQuery.error?.message || editMutation.error?.message
			}
		>
			<CharacterForm
				campaigns={campaigns}
				initialValues={character || {}}
				onSubmit={onSubmit}
				isDisabled={editMutation.isPending}
				isPending={editMutation.isPending}
			/>
		</PageWrapper>
	);
}

export default characterEdit;

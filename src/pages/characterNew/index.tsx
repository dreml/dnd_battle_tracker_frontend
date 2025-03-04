import PageWrapper from "../../shared/ui/pageWrapper";
import CharacterForm from "../../features/characterForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCampaigns } from "../../entities/campaign/api";
import { CampaignI } from "../../entities/campaign/model";
import { useNavigate } from "react-router";
import { addNewCharacter } from "../../entities/character/api";
import { CharacterNewT } from "../../entities/character/model";
import { ROUTE_CHARACTER_LIST } from "../../shared/router";

function CharacterNew() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const campaignsQuery = useQuery({
		queryKey: ["campaigns"],
		queryFn: getCampaigns,
	});

	const characterNewMutation = useMutation({
		mutationFn: (newCharacter: CharacterNewT) => addNewCharacter(newCharacter),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["characters"] });
			navigate(ROUTE_CHARACTER_LIST);
		},
	});
	const onSubmit = (data: CharacterNewT) => {
		characterNewMutation.mutate(data);
	};

	const campaigns: CampaignI[] = campaignsQuery.data ?? [];
	return (
		<PageWrapper
			header="Новый персонаж"
			isError={campaignsQuery.isError || characterNewMutation.isError}
			errorMessage={
				campaignsQuery.error?.message || characterNewMutation.error?.message
			}
		>
			<CharacterForm campaigns={campaigns} onSubmit={onSubmit} />
		</PageWrapper>
	);
}

export default CharacterNew;

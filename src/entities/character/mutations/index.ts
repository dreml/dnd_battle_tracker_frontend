import { CharacterNewT } from "../model";
import { addNewCharacter, deleteCharacter, updateCharacter } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CharacterQueryKey } from "../queries";

const useCharacterUpdateMutation = (id: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: CharacterNewT) => updateCharacter(id, data),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [CharacterQueryKey.characters],
			});
		},
	});
};

const useCharacterDeleteMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteCharacter(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [CharacterQueryKey.character],
			});
			void queryClient.invalidateQueries({
				queryKey: [CharacterQueryKey.characters],
			});
		},
	});
};

const useCharacterCreateMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (newCharacter: CharacterNewT) => addNewCharacter(newCharacter),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [CharacterQueryKey.characters],
			});
		},
	});
};

export {
	useCharacterUpdateMutation,
	useCharacterDeleteMutation,
	useCharacterCreateMutation,
};

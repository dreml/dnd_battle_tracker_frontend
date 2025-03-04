import { CharacterNewT } from "../model";
import { deleteCharacter, updateCharacter } from "../api";
import { useMutation } from "@tanstack/react-query";

const characterUpdateMutation = (id: string, onSuccess: () => void) => {
	return useMutation({
		mutationFn: (data: CharacterNewT) => updateCharacter(id, data),
		onSuccess: onSuccess,
	});
};

const characterDeleteMutation = (onSuccess: () => void) =>
	useMutation({
		mutationFn: (id: string) => deleteCharacter(id),
		onSuccess: onSuccess,
	});

export { characterUpdateMutation, characterDeleteMutation };

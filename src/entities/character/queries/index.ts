import { getCharacter, getCharacters } from "../api";

enum CharacterQueryKey {
	character = "character",
	characters = "characters",
}

const characterQueryOptions = (characterId: string) => ({
	queryKey: [CharacterQueryKey.character],
	queryFn: () => getCharacter(characterId),
});

const charactersQueryOptions = () => ({
	queryKey: [CharacterQueryKey.characters],
	queryFn: () => getCharacters(),
});

export { CharacterQueryKey, characterQueryOptions, charactersQueryOptions };

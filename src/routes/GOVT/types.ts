export type AppDefinition = {
	id: string; // The unique identifier, often used for routing or folder names (e.g., "INTELLIGENCE_AND_INVESTIGATION_PNP")
	name: string; // The user-facing display name (e.g., "Intelligence & Investigation")
	description?: string; // A brief summary of the module's purpose.
	icon?: string; // An SVG string used to visually represent the module.
};

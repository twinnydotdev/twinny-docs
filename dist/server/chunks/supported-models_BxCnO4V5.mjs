async function getMod() {
						return import('./supported-models_BPw3PWRi.mjs');
					}
					const collectedLinks = [];
					const collectedStyles = [];
					const collectedScripts = [];
					const defaultMod = { __astroPropagation: true, getMod, collectedLinks, collectedStyles, collectedScripts };

export { defaultMod as default };

import PalletRuntimeError from "./PalletRuntimeError";

export interface ColorScheme {
    [key: string]: string;
}

export interface Pallet {
    version: string;
    name: string;
    color: ColorScheme;
}

export function parsePallet(input: string): Pallet {
    const lines = input.split('\n');
    const pallet: Partial<Pallet> = {};

    let colorVarContent: { [key: string]: string } = {};

    for (const line of lines) {
        const trimmedLine = line.trim();        
        if (trimmedLine.startsWith('!')) {
            continue; // Ignore comments
        } else if  (trimmedLine.startsWith('$')) {
            if (Object.keys(colorVarContent).length > 0) {
                pallet.color = colorVarContent;
                colorVarContent = {};
            }
        } else if (trimmedLine !== '') {
            const [key, value] = trimmedLine.split(':').map(part => part.trim());
            if (key !== "}") {
                if (!value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/)) {
                    throw new PalletRuntimeError(`${key} does not match ^#(?:[0-9a-fA-F]{3}){1,2}$`)
                }
                colorVarContent[key] = value;
            }
        } else if (!trimmedLine.startsWith('$')) {
            const [key, value] = trimmedLine.split(/\s*[:=]\s*/);
            switch (key) {
                case '$version':
                    pallet.version = value;
                    break;
                case '$name':
                    pallet.name = value;
                    break;
                default:
                    break;
            }
        }
    }

    if (Object.keys(colorVarContent).length > 0) {
        pallet.color = colorVarContent;
    }

    return pallet as Pallet;
}
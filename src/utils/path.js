import { fileURLToPath } from 'url';
import { dirname as getDirectoryName, join } from 'path';

const filename = join(fileURLToPath(import.meta.url), '..');
export const dirname = getDirectoryName(filename);
export const rootname = join(dirname, '..');

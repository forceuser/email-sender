import nodePath from "path";
import {fileURLToPath} from "url";
import findPackageRoot from "find-package-json";


const __filename = fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);

const packageInfo = findPackageRoot(__dirname).next();

export const packagePath = packageInfo.filename;
export const packageDir = nodePath.dirname(packagePath);
export const pkg = packageInfo.value;

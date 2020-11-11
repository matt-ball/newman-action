import { Context, Recogniser } from "./encoding";
export interface Match {
    confidence: number;
    name: string;
    lang?: string;
}
declare const _default: (det: Context, rec: Recogniser, confidence: number, name?: string | undefined, lang?: string | undefined) => Match;
export default _default;

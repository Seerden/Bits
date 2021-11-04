import { Completion } from "@shared/types/Completion";
import { makePooledQuery } from "../dbQuery";
import { constructUpdateCompletionQuery } from "./constructors/completions";

export async function updateCompletion (partialCompletionEntry: Partial<Completion>) {
    return await makePooledQuery(constructUpdateCompletionQuery(partialCompletionEntry));
}
import { CompletionInstanceProps } from "./CompletionInstance";

export type Entry = CompletionInstanceProps & { _key: string };

export type EntryProps = {
    completionEntries: Entry[][]
}
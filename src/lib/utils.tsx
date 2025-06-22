import {Asset, Entry} from "contentful";
import {TeamFields, TeamSkeleton} from "@/lib/types";

export function resolveTeam(referenceId: string, includes: Entry<TeamSkeleton>[]): TeamFields | undefined {
    return includes.find(
        (entry) => entry.sys.id === referenceId && entry.sys.contentType?.sys.id === 'team'
    )?.fields as TeamFields;
}

export function resolveAsset(assetId: string, assets: Asset[]): string | undefined {
    const asset = assets.find((a) => a.sys.id === assetId && a.fields?.file?.url);
    return asset ? `https:${asset.fields.file?.url}` : undefined;
}
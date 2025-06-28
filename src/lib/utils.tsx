import {Asset, Entry} from 'contentful';

export function resolveAsset(assetId: string, assets: Asset[]): string | undefined {
    const asset = assets.find((a) => a.sys.id === assetId && a.fields?.file?.url);
    return asset ? `https:${asset.fields.file?.url}` : undefined;
}
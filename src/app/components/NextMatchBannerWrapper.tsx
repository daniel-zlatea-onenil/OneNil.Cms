'use client';

import NextMatchBanner from './NextMatchBanner';
import { MatchViewModel } from '@/lib/viewModels';

type Props = {
  viewModel: MatchViewModel | undefined;
};

export default function NextMatchBannerWrapper({ viewModel }: Props) {
  if (!viewModel) return null;

  return <NextMatchBanner viewModel={viewModel} />;
}

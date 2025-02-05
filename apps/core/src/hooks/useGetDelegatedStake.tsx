// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useSuiClient } from '@mysten/dapp-kit';
import type { DelegatedStake } from '@mysten/sui.js/client';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

type UseGetDelegatedStakesOptions = {
	address: string;
} & UseQueryOptions<DelegatedStake[], Error>;

export function useGetDelegatedStake(options: UseGetDelegatedStakesOptions) {
	const client = useSuiClient();
	const { address, ...queryOptions } = options;

	return useQuery({
		queryKey: ['delegated-stakes', address],
		queryFn: () => client.getStakes({ owner: address }),
		...queryOptions,
	});
}

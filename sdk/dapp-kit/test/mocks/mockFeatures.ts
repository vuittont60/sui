// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { IdentifierRecord, SuiFeatures } from '@mysten/wallet-standard';

export const suiFeatures: SuiFeatures = {
	'sui:signPersonalMessage': {
		version: '1.0.0',
		signPersonalMessage: vi.fn(),
	},
	'sui:signTransactionBlock': {
		version: '1.0.0',
		signTransactionBlock: vi.fn(),
	},
	'sui:signAndExecuteTransactionBlock': {
		version: '1.0.0',
		signAndExecuteTransactionBlock: vi.fn(),
	},
};

export const superCoolFeature: IdentifierRecord<unknown> = {
	'my-dapp:super-cool-feature': {
		version: '1.0.0',
		superCoolFeature: vi.fn(),
	},
};

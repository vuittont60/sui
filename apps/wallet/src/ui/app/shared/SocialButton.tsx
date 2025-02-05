// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Text } from '_app/shared/text';
import {
	SocialFacebook24 as FacebookLogo,
	SocialGoogle24 as GoogleLogo,
	SocialMicrosoft24 as MicrosoftLogo,
	SocialTwitch24 as TwitchLogo,
} from '@mysten/icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type FunctionComponent, type Ref, type SVGProps } from 'react';

import { ButtonOrLink, type ButtonOrLinkProps } from './utils/ButtonOrLink';

const styles = cva(
	'h-10 w-full cursor-pointer rounded-xl inline-flex items-center justify-center gap-3 px-4 py-2 disabled:opacity-40 focus:opacity-80',
	{
		variants: {
			provider: {
				microsoft:
					'bg-white text-steel-dark border border-solid border-steel hover:border-steel-dark',
				google: 'bg-white text-steel-dark border border-solid border-steel hover:border-steel-dark',
				facebook: 'bg-facebook border-none text-white',
				twitch: 'bg-twitch border-none text-white',
			},
		},
	},
);

type StyleProps = VariantProps<typeof styles>;
type SocialSignInProvider = NonNullable<StyleProps['provider']>;

type SocialButtonProps = {
	showLabel?: boolean;
	provider: SocialSignInProvider;
} & Omit<ButtonOrLinkProps, 'className'> &
	StyleProps;

const socialSignInProviderInfo: Record<
	SocialSignInProvider,
	{ icon: FunctionComponent<SVGProps<SVGSVGElement>>; label: string }
> = {
	microsoft: {
		icon: MicrosoftLogo,
		label: 'Sign in with Microsoft',
	},
	google: {
		icon: GoogleLogo,
		label: 'Sign in with Google',
	},
	facebook: {
		icon: FacebookLogo,
		label: 'Sign in with Facebook',
	},
	twitch: {
		icon: TwitchLogo,
		label: 'Sign in with Twitch',
	},
};

export const SocialButton = forwardRef(
	(
		{ provider, showLabel = false, ...otherProps }: SocialButtonProps,
		forwardedRef: Ref<HTMLAnchorElement | HTMLButtonElement>,
	) => {
		const { icon: IconComponent, label } = socialSignInProviderInfo[provider];
		return (
			<ButtonOrLink
				ref={forwardedRef}
				className={styles({ provider })}
				aria-label={showLabel ? undefined : label}
				{...otherProps}
			>
				<IconComponent className="h-6 w-6" />
				{showLabel && (
					<Text variant="pBody" weight="semibold">
						{label}
					</Text>
				)}
			</ButtonOrLink>
		);
	},
);

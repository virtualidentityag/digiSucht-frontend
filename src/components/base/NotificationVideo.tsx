import React, { HTMLAttributes, ReactElement } from 'react';
import styled from 'styled-components';

export const TYPE_DEFAULT = 'default';
export const TYPE_EXTENDED = 'extended';

export type TYPE = typeof TYPE_DEFAULT | typeof TYPE_EXTENDED;

interface NotificationVideoProps extends HTMLAttributes<HTMLDivElement> {
	type?: TYPE;
	initialLetters?: string;
	userName?: string;
	text?: string;
	label?: string;
	infoText?: string;
	iconAccept?: ReactElement;
	iconVideo?: ReactElement;
	iconReject?: ReactElement;
	iconClose?: ReactElement;
}

const StyledNotificationVideo = styled.div`
	${({ theme }) => `
    font-family: ${theme.font.family};
    font-weight: ${theme.font.weight};
    font-size: ${theme.font.size};
    line-height: ${theme.font.lineHeight};

    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
    width: ${theme.notification.width};

    border-radius: ${theme.border.radius};

    color: ${theme.colors.white};
    background: ${theme.colors.backgroundLightGrey};


    &.default {
        .notification--optionBar {
            height:96px;
        }

        .notification--title {
            margin: 0 0 20px 0;
        }
    }

    &.extended {
        .notification--optionBar {
            height: 125px;
        }

        .notification--infoText {
            margin: 16px 16px 16px 16px;
        }

        .notification--adviceLabel {
            margin: 0 0 16px 0;
        }
    }

    .icon--close {
        position: absolute;
        top: 21px;
        right: 14px;
        align: right;

        svg {
            height: 16px;
            width: 16px;

            path {
                fill: white;
            }
        }
    }

    .notification--userInitials {
        display: flex;
        justify-content: center;
        align-items: center;
        border: ${theme.border.styleBold}; ${theme.colors.initialsBulse};
        border-radius: ${theme.border.radiusCircle};

        font-weight: ${theme.font.sizeMedium};
        font-size: ${theme.font.sizeLarge};
        line-height: ${theme.font.lineHeightSmall};

        background-color: ${theme.colors.initialsBackground};
        color: ${theme.colors.initialsFont};
        
        margin: 17px 0 20px 0 ;
        height: 56px;
        width: 56px;
    }

    .notification--title {
        font-weight: ${theme.font.weight};
        font-size: ${theme.font.sizeMedium};
        line-height: 131%;

        &-userName {
            font-weight: ${theme.font.weightBold};
        }
    }

    .notification--optionBar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        background-color: ${theme.colors.backgroundDarkGrey};
        border-bottom-left-radius: ${theme.border.radius};
        border-bottom-right-radius: ${theme.border.radius};
    }

    .notification--adviceLabel {
        align-self: center;
        font-weight: ${theme.font.weightBold};
    }

    .notification--phoneIcons {
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
            display:flex;
            justify-content: center;
            border-radius: ${theme.border.radiusCircle};
            background-color: ${theme.colors.acceptGreen};
            height: 48px;
            width: 48px;

            svg {
                height: ${theme.notification.svg.height};
                width: ${theme.notification.svg.width};
                align-self: center;
    
                path {
                    fill: ${theme.colors.white};
                }
            }
        }
        
        .icon--reject {
            background-color: ${theme.colors.rejectRed};
            svg {
                width: 32px;
            }
            }

        .icon--video {
            margin: 0 16px 0 16px;
        }
    }
	`}
`;

StyledNotificationVideo.defaultProps = {
	theme: {
		colors: {
			white: '#FFFFFF',
			backgroundLightGrey: '#00000099',
			backgroundDarkGrey: '#00000066',
			initialsBackground: '#3F373F',
			initialsFont: '#FFFFFF99',
			initialsBulse: '#FFFFFF66',
			acceptGreen: '#4FCC5C',
			rejectRed: '#FF0000'
		},

		font: {
			family: 'Roboto, sans-serif',
			weight: '400',
			weightMedium: '500',
			weightBold: '700',
			size: '14px',
			sizeMedium: '16px',
			sizeLarge: '20px',
			lineHeight: '143%',
			lineHeightSmall: '130%'
		},

		border: {
			styleBold: '10px solid',
			radius: '4px',
			radiusCircle: '50%'
		},

		notification: {
			width: '320px',

			svg: {
				height: '24px',
				width: '24px'
			}
		}
	}
};

export const NotificationVideo = ({
	type = TYPE_DEFAULT,
	initialLetters,
	userName,
	text,
	label,
	infoText,
	iconAccept,
	iconVideo,
	iconReject,
	iconClose,
	className,
	...props
}: NotificationVideoProps) => {
	return (
		<StyledNotificationVideo
			type="notification"
			className={`${className} ${type}`}
			{...props}
		>
			<div className="notification--icon icon--close">
				{iconClose && iconClose}
			</div>

			<div className="notification--userInitials">
				{initialLetters && initialLetters}
			</div>

			<div className="notification--title">
				<span className="notification--title-userName">
					{userName && userName} &nbsp;
				</span>
				{text && text}
			</div>

			<div className="notification--infoText">{infoText && infoText}</div>

			<div className="notification--optionBar">
				<div className="notification--adviceLabel">
					{label && label}
				</div>

				<div className="notification--phoneIcons">
					<div className="icon icon--accept">
						{iconAccept && iconAccept}
					</div>
					<div className="icon icon--video">
						{iconVideo && iconVideo}
					</div>
					<div className="icon icon--reject">
						{iconReject && iconReject}
					</div>
				</div>
			</div>
		</StyledNotificationVideo>
	);
};

import * as React from 'react';
import { useEffect, useState } from 'react';
import { translate } from '../../utils/translate';
import {
	SelectDropdown,
	SelectOption,
	SelectOptionsMulti
} from '../select/SelectDropdown';
import { ReactComponent as Info } from '../../resources/img/icons/i.svg';
import { Text } from '../text/Text';
import './askerInfoToolsOptions.styles';
import { apiGetBudibaseTools } from '../../api/apiGetBudibaseTools';
import { APIToolsInterface } from '../../globalState/interfaces/ToolsInterface';
import { OverlayWrapper, Overlay, OVERLAY_FUNCTIONS } from '../overlay/Overlay';
import { BUTTON_TYPES } from '../button/Button';
import { Checkbox } from '../checkbox/Checkbox';
import { apiPutBudibaseTools } from '../../api/apiPutBudibaseTools';

interface AskerInfoToolsOptionsInterface {
	askerId: string;
}

export const AskerInfoToolsOptions = (
	props: AskerInfoToolsOptionsInterface
) => {
	const [selectedTools, setSelectedTools] = useState<SelectOption[]>([]);
	const [availableTools, setAvailableTools] = useState<SelectOption[]>([]);
	const [infoAboutToolsModal, setInfoAboutToolsModal] = useState<
		APIToolsInterface[]
	>([]);
	const [overlayContent, setOverlayContent] = useState(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [hasError, setHasError] = useState<boolean>(false);

	const updateTools = (
		fromModal: boolean,
		selectedOption?: SelectOptionsMulti
	) => {
		let activeTools: string[];
		if (fromModal) {
			activeTools = infoAboutToolsModal
				.filter(
					(tool: APIToolsInterface) =>
						tool.sharedWithAdviceSeeker === true
				)
				.map((toolActive) => toolActive.toolId);
			setSelectedToolsOptions(infoAboutToolsModal);
		} else {
			let selected = [];
			if (selectedOption.removedValue) {
				selected = selectedTools.filter(
					(tool) => tool.value !== selectedOption.removedValue.value
				);
			} else if (selectedOption.option) {
				selected = [...selectedTools, selectedOption.option];
			}
			setSelectedTools(selected);
			activeTools = selected.map((tool) => tool.value);
			updateSharedToolsModal(activeTools, false);
		}
		apiPutBudibaseTools(props.askerId, activeTools).catch(() => {
			setHasError(true);
			setSelectedTools([]);
			const resetTools = infoAboutToolsModal.map((tool) => {
				return {
					...tool,
					sharedWithAdviceSeeker: false
				};
			});
			setInfoAboutToolsModal(resetTools);
		});
	};

	const selectHandler = (selectedOption: SelectOptionsMulti) => {
		updateTools(false, selectedOption);
	};

	const setAvailableToolsOptions = (toolsData: APIToolsInterface[]) => {
		setAvailableTools(
			toolsData.map((tool) => {
				return {
					value: tool.toolId,
					label: tool.title
				};
			})
		);
	};

	const setSelectedToolsOptions = (toolsData: APIToolsInterface[]) => {
		let toolsSelected = [];
		toolsData.forEach((tool) => {
			if (tool.sharedWithAdviceSeeker) {
				toolsSelected.push({
					value: tool.toolId,
					label: tool.title
				});
			}
		});
		setSelectedTools(toolsSelected);
	};

	const resetToolsAfterCloseModal = () => {
		const activeTools = selectedTools.map((tool) => tool.value);
		const resetTools = infoAboutToolsModal.map((tool) => {
			return activeTools.includes(tool.toolId)
				? {
						...tool,
						sharedWithAdviceSeeker: true
				  }
				: {
						...tool,
						sharedWithAdviceSeeker: false
				  };
		});
		setInfoAboutToolsModal(resetTools);
		setShowModal(false);
	};

	const handleOverlayAction = (buttonFunction: string) => {
		switch (buttonFunction) {
			case OVERLAY_FUNCTIONS.CONFIRM_EDIT:
				updateTools(true);
				setShowModal(false);
				break;
			case OVERLAY_FUNCTIONS.CLOSE:
				resetToolsAfterCloseModal();
				break;
		}
	};

	const updateSharedToolsModal = (e, fromModal: boolean) => {
		let updatedToolsModal = [];
		if (fromModal) {
			updatedToolsModal = infoAboutToolsModal.map((tool) =>
				e.id === tool.toolId
					? {
							...tool,
							sharedWithAdviceSeeker: !tool.sharedWithAdviceSeeker
					  }
					: tool
			);
		} else {
			updatedToolsModal = infoAboutToolsModal.map((tool) =>
				e.includes(tool.toolId)
					? {
							...tool,
							sharedWithAdviceSeeker: true
					  }
					: {
							...tool,
							sharedWithAdviceSeeker: false
					  }
			);
		}
		setInfoAboutToolsModal(updatedToolsModal);
	};

	useEffect(() => {
		const overlayContent = (
			<>
				{infoAboutToolsModal.map((tool: APIToolsInterface) => (
					<Checkbox
						key={tool.title}
						className="textarea__checkbox"
						item={{
							inputId: tool.toolId,
							name: tool.title,
							labelId: tool.title,
							label: tool.title,
							description: tool.description,
							checked: !!tool.sharedWithAdviceSeeker
						}}
						checkboxHandle={(e) =>
							updateSharedToolsModal(e.target, true)
						}
					/>
				))}
			</>
		);

		const overlayItem = {
			headline: translate('userProfile.tools.modal.title'),
			copy: translate('userProfile.tools.modal.description'),
			buttonSet: [
				{
					label: translate('userProfile.tools.modal.deny'),
					function: OVERLAY_FUNCTIONS.CLOSE,
					type: BUTTON_TYPES.SECONDARY
				},
				{
					label: translate('userProfile.tools.modal.confirm'),
					function: OVERLAY_FUNCTIONS.CONFIRM_EDIT,
					type: BUTTON_TYPES.PRIMARY
				}
			],
			nestedComponent: overlayContent,
			handleOverlay: () => {
				setShowModal(false);
			}
		};

		setOverlayContent(overlayItem);
	}, [infoAboutToolsModal]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (props.askerId) {
			apiGetBudibaseTools(props.askerId).then(
				(resp: APIToolsInterface[]) => {
					setAvailableToolsOptions(resp);
					setSelectedToolsOptions(resp);
					setInfoAboutToolsModal(resp);
				}
			);
		}
	}, [props.askerId]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="asker-info-tools-options">
			<Text text={translate('userProfile.tools.title')} type="divider" />
			<Text
				text={translate('userProfile.tools.description')}
				type="infoSmall"
			/>
			<button
				type="button"
				className="asker-info-tools-options__button text--tertiary primary button-as-link"
				onClick={() => setShowModal(true)}
			>
				<Info />
				{translate('userProfile.tools.openModal')}
			</button>
			<SelectDropdown
				handleDropdownSelect={(_, selectedOption: SelectOptionsMulti) =>
					selectHandler(selectedOption)
				}
				id="tools-select"
				menuPlacement="bottom"
				selectedOptions={availableTools}
				isSearchable={false}
				isMulti
				isClearable={false}
				defaultValue={selectedTools}
				placeholder={translate('userProfile.tools.optionsPlaceholder')}
				hasError={hasError}
				errorMessage={translate('userProfile.tools.options.saveError')}
			/>
			{showModal && overlayContent && (
				<OverlayWrapper>
					<Overlay
						className="asker-info-tools-options__overlay"
						item={overlayContent}
						handleOverlayClose={() => resetToolsAfterCloseModal()}
						handleOverlay={handleOverlayAction}
					/>
				</OverlayWrapper>
			)}
		</div>
	);
};
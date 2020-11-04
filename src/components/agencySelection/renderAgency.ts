import { translate } from '../../resources/scripts/i18n/translate';
import { AgencyDataInterface } from '../../globalState';

export const renderAgency = (agency: AgencyDataInterface) => {
	const suggestionWrapper = document.getElementById('suggestionLayer');

	if (suggestionWrapper) {
		suggestionWrapper.innerHTML += `
			<div class='suggestionWrapper__item' data-agency-id="${agency.id}">
				<div class='suggestionWrapper__item__content'>
					${
						agency.teamAgency
							? '<div class=\'suggestionWrapper__item__content__teamAgency\'><span class=\'suggestionWrapper__item__content__teamAgency__icon\'><svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewbox="0 0 72 72"><path d="M36,6 C52.5333333,6 66,19.4666667 66,36 C66,52.5333333 52.5333333,66 36,66 C19.4666667,66 6,52.5333333 6,36 C6,19.4666667 19.4666667,6 36,6 Z M29.3515625,50.4609375 L29.3515625,54.5625 L42.78125,54.5625 L42.78125,50.4609375 L39.5,49.7578125 L39.5,29.203125 L29,29.203125 L29,33.328125 L32.65625,34.03125 L32.65625,49.7578125 L29.3515625,50.4609375 Z M39.5,23.1328125 L39.5,18 L32.65625,18 L32.65625,23.1328125 L39.5,23.1328125 Z"/></svg></span>' +
							  translate('registration.agency.prefilled.isTeam') +
							  '</div>'
							: ''
					}
					${
						agency.postcode
							? `<span class='suggestionWrapper__item__content__postcode'><strong>${agency.postcode}<br /></strong></span>`
							: ''
					}	
					${
						agency.name
							? `<span class='suggestionWrapper__item__content__name'><strong>${agency.name}</strong></span>`
							: ''
					}	
					${
						agency.description
							? `<br /><span class='suggestionWrapper__item__content__agencyDescr'>${agency.description}</span>`
							: ''
					}	
				</div>
			</div>	
		`;
	}

};

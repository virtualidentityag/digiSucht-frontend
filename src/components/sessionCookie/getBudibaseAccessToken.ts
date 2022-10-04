import { TenantDataSettingsInterface } from '../../globalState/interfaces/TenantDataInterface';
import { appConfig } from '../../utils/appConfig';

const loginTimeout = 500;

const waitForLoginAfterSubmit = (tryCount = 0, resolve: () => void) => {
	const iframe = document.getElementById<HTMLIFrameElement>('authIframe');
	if (iframe?.contentDocument && tryCount < 3) {
		setTimeout(() => waitForLogin(tryCount + 1, resolve), loginTimeout * 2);
		return;
	} else {
		resolve(undefined);
	}
};

const waitForKeyCloakFormToBeReady = (
	username: string,
	password: string,
	tenantSettings: TenantDataInterface,
	tryCount = 0
) => {
	const iframe = document.getElementById<HTMLIFrameElement>('authIframe');
	if (!iframe?.contentDocument && tryCount < 3) {
		setTimeout(() => {
			waitForKeyCloakFormToBeReady(
				username,
				password,
				tenantSettings,
				tryCount + 1
			);
		}, loginTimeout);
		return;
	}

	const iframeContent = iframe.contentDocument;
	if (iframeContent) {
		iframeContent.getElementById('password')?.value = password;
		iframeContent.getElementById('username')?.value = username;
		iframeContent.getElementById('kc-form-login')?.submit();
	}
};

export const getBudibaseAccessToken = (
	username: string,
	password: string,
	tenantSettings: TenantDataSettingsInterface,
	tryCount = 0
): Promise<any> => {
	return new Promise(async (resolve) => {
		const budibaseUrl = appConfig.budibaseUrl;
		let calledOnce = false;
		const login = (ev) => {
			if (calledOnce) {
				// After we submit the user credentials we'll be redirected tools so we need to wait to be there
				return waitForLoginAfterSubmit(0, resolve);
			}

			// When we first start the login process we need to call the budibase sso and only then we're redirected
			// to the keycloak form so we need to wait until we can put insert the credentials in the form
			// If for some reason we still don't find the form we need to resolve it because the login will not work
			if (
				!waitForKeyCloakFormToBeReady(
					username,
					password,
					tenantSettings
				)
			) {
				resolve();
			}
			// We need to set this variable after the validation otherwise it calls right away
			calledOnce = true;
		};

		const ifrm = document.createElement<HTMLIFrameElement>('iframe');
		ifrm.src = `${budibaseUrl}/api/global/auth/default/oidc/configs/${tenantSettings.featureToolsOICDToken}`;
		ifrm.onload = login;
		ifrm.id = 'authIframe';
		ifrm.style.display = 'none';
		document.body.appendChild(ifrm);
	});
};

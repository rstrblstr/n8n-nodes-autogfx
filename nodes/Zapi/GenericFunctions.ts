import type {
    IExecuteFunctions,
    IHookFunctions,
    IDataObject,
    IHttpRequestMethods,
    IRequestOptions,
} from 'n8n-workflow';

/**
 * Make an API request to autoGfx
 *
 */
export async function autogfxApiRequest(
    this: IHookFunctions | IExecuteFunctions,
    method: IHttpRequestMethods,
    endpoint: string,
    body: IDataObject,
): Promise<any> {
    const credentials = (await this.getCredentials('autogfxApi')) as {
        instanceId: string;
        instanceToken: string;
        clientToken: string;
    };

    const options: IRequestOptions = {
        method,
        body,
        uri: `https://api.autogfx.io/instances/${credentials.instanceId}/token/${credentials.instanceToken}/${endpoint}`,
        json: true,
    };

    return await this.helpers.requestWithAuthentication.call(this, 'autogfxApi', options);
}

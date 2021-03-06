import * as errors from 'balena-errors';
import * as Promise from 'bluebird';
import * as BalenaPine from '../../typings/balena-pine';
import * as PineClient from '../../typings/pinejs-client-core';
import { isUniqueKeyViolationResponse } from './index';

export const getUpsertHelper = ({ pine }: { pine: BalenaPine.Pine }) => {
	const upsert = <T>(
		params: PineClient.PineParamsFor<T>,
		naturalKeyProps: Array<keyof T & string>,
	) =>
		Promise.try(() => {
			if (!Array.isArray(naturalKeyProps) || naturalKeyProps.length === 0) {
				throw new errors.BalenaInvalidParameterError(
					'naturalKeyProps',
					'The properties that consist the natural key of the model were not provided',
				);
			}

			if (params.options && params.options.$filter) {
				throw new errors.BalenaInvalidParameterError(
					'params',
					'The options.$filter pine parameter is not supported on upserts',
				);
			}

			const body = params.body;
			if (!body) {
				throw new errors.BalenaInvalidParameterError(
					'params',
					'The body property is missing from the provided pine parameters',
				);
			}

			const missingProp = naturalKeyProps.find((prop) => !(prop in body));
			if (missingProp) {
				throw new errors.BalenaInvalidParameterError(
					'naturalKeyProps',
					`Natural key property "${missingProp}" not defined in the provided body`,
				);
			}

			return pine.post<T>(params).catch(isUniqueKeyViolationResponse, () => {
				const filter: { [key in keyof T]?: any } = {};
				for (const naturalKeyProp of naturalKeyProps) {
					filter[naturalKeyProp] = body[naturalKeyProp]!;
					delete body[naturalKeyProp];
				}
				const patchParams = {
					...params,
					options: {
						...params.options,
						$filter: filter,
					},
					body: body as PineClient.SubmitBody<T>,
				};
				return pine.patch<T>(patchParams);
			});
		});

	return upsert;
};

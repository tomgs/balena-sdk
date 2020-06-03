/// <reference types="node" />
import * as BalenaSdk from '../typings/balena-sdk';
import { AnyObject } from '../typings/utils';
import * as PineClient from '../typings/pinejs-client-core';

const sdk: BalenaSdk.BalenaSDK = {} as any;

let aAny: any;
let aNumber: number;
let aNumberOrUndefined: number | undefined;
let aString: string;
let aStringOrUndefined: string | undefined;

// This file is in .prettierignore, since otherwise
// the $ExpectError commentswould move to the wrong place

// $select

{
	type deviceOptionsNoProps = PineClient.TypedResult<BalenaSdk.Device, {}>;

	const result: deviceOptionsNoProps = {} as any;

	aNumber = result.id;
	aString = result.device_name;
	aNumber = result.belongs_to__application.__id;
	aNumberOrUndefined = result.should_be_running__release?.__id;

	aNumber = result.should_be_running__release.__id; // $ExpectError
	aAny = result.device_tag; // $ExpectError
}

(async () => {
	const result = await sdk.pine.get({
		resource: 'device',
		id: 1,
		options: {
			$select: ['id', 'device_name'],
		},
	});

	aNumber = result.id;
	aString = result.device_name;

	aString = result.os_version; // $ExpectError
	aAny = result.belongs_to__application; // $ExpectError
	aAny = result.device_tag; // $ExpectError
})();

{
	type deviceOptionsSelectAsterisk = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$select: '*';
		}
	>;

	const result: deviceOptionsSelectAsterisk = {} as any;

	aNumber = result.id;
	aString = result.device_name;
	aNumber = result.belongs_to__application.__id;
	aNumberOrUndefined = result.should_be_running__release?.__id;

	aNumber = result.should_be_running__release.__id; // $ExpectError
	aAny = result.device_tag; // $ExpectError
}

{
	type deviceOptionsSelectId = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$select: 'id';
		}
	>;

	const result: deviceOptionsSelectId = {} as any;

	aNumber = result.id;

	aNumber = result.belongs_to__application.__id; // $ExpectError
	aNumber = result.should_be_running__release.__id; // $ExpectError
	aAny = result.device_tag; // $ExpectError
}

{
	type deviceOptionsSelectRelease = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$select: 'belongs_to__application';
		}
	>;

	const result: deviceOptionsSelectRelease = {} as any;

	aNumber = result.belongs_to__application.__id;

	aAny = result.should_be_running__release; // $ExpectError
	aNumber = result.id; // $ExpectError
	aAny = result.device_tag; // $ExpectError
}

{
	type deviceOptionsSelectRelease = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$select: 'should_be_running__release';
		}
	>;

	const result: deviceOptionsSelectRelease = {} as any;

	aNumberOrUndefined = result.should_be_running__release?.__id;

	aNumber = result.should_be_running__release.__id; // $ExpectError
	aNumber = result.id; // $ExpectError
	aAny = result.device_tag; // $ExpectError
}

{
	type deviceOptionsSelectArray = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$select: ['id', 'note', 'device_name', 'uuid', 'belongs_to__application'];
		}
	>;

	const result: deviceOptionsSelectArray = {} as any;

	aNumber = result.id;
	aString = result.device_name;
	aNumber = result.belongs_to__application.__id;

	aAny = result.device_tag; // $ExpectError
}

// $expand w/o $select

{
	type deviceOptionsExpandNavigationResourceString = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$expand: 'belongs_to__application';
		}
	>;

	const result: deviceOptionsExpandNavigationResourceString = {} as any;

	aNumber = result.belongs_to__application[0].id;
	aNumber = result.id;
	aString = result.device_name;

	aAny = result.belongs_to__application[1]; // $ExpectError
	aAny = result.device_tag; // $ExpectError
}

{
	type deviceOptionsExpandNavigationResourceString = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$expand: 'should_be_running__release';
		}
	>;

	const result: deviceOptionsExpandNavigationResourceString = {} as any;

	aNumber = result.id;
	aString = result.device_name;
	aNumberOrUndefined = result.should_be_running__release[0]?.id;

	aAny = result.should_be_running__release[0].id; // $ExpectError
	aAny = result.should_be_running__release.__id; // $ExpectError
	aAny = result.should_be_running__release[1]; // $ExpectError
	aAny = result.device_tag; // $ExpectError
}

{
	type deviceOptionsExpandReverseNavigationResourceString = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$expand: 'device_tag';
		}
	>;

	const result: deviceOptionsExpandReverseNavigationResourceString = {} as any;

	aNumber = result.device_tag[1].id;
	aNumber = result.id;
	aString = result.device_name;
	aNumber = result.belongs_to__application.__id;
	aNumberOrUndefined = result.should_be_running__release?.__id;
}

// $expand w $select

{
	type deviceOptionsExpandNavigationResourceString = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$select: 'belongs_to__application';
			$expand: 'belongs_to__application';
		}
	>;

	const result: deviceOptionsExpandNavigationResourceString = {} as any;

	aNumber = result.belongs_to__application[0].id;
	aString = result.belongs_to__application[0].app_name;

	aNumber = result.id; // $ExpectError
	aString = result.device_name; // $ExpectError
	aAny = result.belongs_to__application[1]; // $ExpectError
	aAny = result.device_tag; // $ExpectError
}

{
	type deviceOptionsExpandNavigationResourceString = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$select: 'should_be_running__release';
			$expand: 'should_be_running__release';
		}
	>;

	const result: deviceOptionsExpandNavigationResourceString = {} as any;

	aNumberOrUndefined = result.should_be_running__release[0]?.id;
	aStringOrUndefined = result.should_be_running__release[0]?.commit;

	aNumber = result.id; // $ExpectError
	aString = result.device_name; // $ExpectError
	aAny = result.should_be_running__release[1]; // $ExpectError
	aAny = result.device_tag; // $ExpectError
}

{
	type deviceOptionsExpandReverseNavigationResourceString = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$select: 'id';
			$expand: 'device_tag';
		}
	>;

	const result: deviceOptionsExpandReverseNavigationResourceString = {} as any;

	aNumber = result.device_tag[1].id;
	aString = result.device_tag[1].tag_key;
	aNumber = result.id;

	aString = result.device_name; // $ExpectError
	aNumber = result.should_be_running__release.__id; // $ExpectError
}

// empty $expand object

{
	type deviceOptionsExpandNavigationResourceString = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$select: 'belongs_to__application';
			$expand: {
				belongs_to__application: {};
			};
		}
	>;

	const result: deviceOptionsExpandNavigationResourceString = {} as any;

	aNumber = result.belongs_to__application[0].id;
	aString = result.belongs_to__application[0].app_name;

	aNumber = result.id; // $ExpectError
	aString = result.device_name; // $ExpectError
	aAny = result.belongs_to__application[1]; // $ExpectError
	aAny = result.device_tag; // $ExpectError
}

{
	type deviceOptionsExpandNavigationResourceString = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$select: 'should_be_running__release';
			$expand: {
				should_be_running__release: {};
			};
		}
	>;

	const result: deviceOptionsExpandNavigationResourceString = {} as any;

	aNumberOrUndefined = result.should_be_running__release[0]?.id;
	aStringOrUndefined = result.should_be_running__release[0]?.commit;

	aNumber = result.id; // $ExpectError
	aString = result.device_name; // $ExpectError
	aAny = result.should_be_running__release[1]; // $ExpectError
	aAny = result.device_tag; // $ExpectError
}

{
	type deviceOptionsExpandReverseNavigationResourceString = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$select: 'id';
			$expand: {
				device_tag: {};
			};
		}
	>;

	const result: deviceOptionsExpandReverseNavigationResourceString = {} as any;

	aNumber = result.device_tag[1].id;
	aString = result.device_tag[1].tag_key;
	aNumber = result.id;

	aString = result.device_name; // $ExpectError
	aNumber = result.should_be_running__release.__id; // $ExpectError
}

// $expand object w/ nested options

{
	type deviceOptionsExpandNavigationResourceString = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$select: 'id';
			$expand: {
				belongs_to__application: {
					$select: 'app_name';
				};
			};
		}
	>;

	const result: deviceOptionsExpandNavigationResourceString = {} as any;

	aNumber = result.id;
	aString = result.belongs_to__application[0].app_name;

	aNumber = result.belongs_to__application[0].id; // $ExpectError
	aString = result.device_name; // $ExpectError
	aAny = result.belongs_to__application[1]; // $ExpectError
	aAny = result.device_tag; // $ExpectError
}

{
	type deviceOptionsExpandNavigationResourceString = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$select: 'id';
			$expand: {
				should_be_running__release: {
					$select: 'commit';
				};
			};
		}
	>;

	const result: deviceOptionsExpandNavigationResourceString = {} as any;

	aNumber = result.id;
	aStringOrUndefined = result.should_be_running__release[0]?.commit;

	aNumberOrUndefined = result.should_be_running__release[0]?.id; // $ExpectError
	aString = result.device_name; // $ExpectError
	aAny = result.should_be_running__release[1]; // $ExpectError
	aAny = result.device_tag; // $ExpectError
}

{
	type deviceOptionsExpandNavigationResourceString = PineClient.TypedResult<
		AnyObject,
		{
			$select: 'id';
			$expand: {
				should_be_running__release: {
					$select: 'commit';
				};
			};
		}
	>;

	const result: deviceOptionsExpandNavigationResourceString = {} as any;

	aNumber = result.id;
	// Errors, since it could be an OptionalNavigationResource
	aStringOrUndefined = result.should_be_running__release[0].commit; // $ExpectError
	aStringOrUndefined = result.should_be_running__release[0]?.commit;
	aNumberOrUndefined = result.should_be_running__release[0]?.id; // $ExpectError
	// This also works, since the typings don't know whether this is Navigation or a Reverse Navigation Resounce
	aAny = result.should_be_running__release[1].commit;

	aString = result.device_name; // $ExpectError
	aAny = result.device_tag; // $ExpectError
}

{
	type deviceOptionsExpandReverseNavigationResourceString = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$select: 'id';
			$expand: {
				device_tag: {
					$select: 'tag_key';
				};
			};
		}
	>;

	const result: deviceOptionsExpandReverseNavigationResourceString = {} as any;

	aNumber = result.id;
	aString = result.device_tag[1].tag_key;

	aString = result.device_name; // $ExpectError
	aNumber = result.device_tag[1].id; // $ExpectError
	aNumber = result.should_be_running__release.__id; // $ExpectError
}

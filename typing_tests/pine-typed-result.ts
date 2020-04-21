/// <reference types="node" />
import * as BalenaSdk from '../typings/balena-sdk';
import * as PineClient from '../typings/pinejs-client-core';

const sdk: BalenaSdk.BalenaSDK = {} as any;

let aNumber: number;
let aString: string;
let aAny: any;

// This file is in .prettierignore, since otherwise
// the $ExpectError commentswould move to the wrong place

// $select

{
	type deviceOptionsNoProps = PineClient.TypedResult<BalenaSdk.Device, {}>;

	const result: deviceOptionsNoProps = {} as any;

	aNumber = result.id;
	aString = result.device_name;
	aNumber = result.belongs_to__application.__id;

	aAny = result.device_tag; // $ExpectError
}

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
	type deviceOptionsExpandReverseNavigationResourceString = PineClient.TypedResult<
		BalenaSdk.Device,
		{
			$expand: 'device_tag';
		}
	>;

	const result: deviceOptionsExpandReverseNavigationResourceString = {} as any;

	aNumber = result.id;
	aNumber = result.device_tag[1].id;
	aString = result.device_name;
	aNumber = result.belongs_to__application.__id;
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
	aNumber = result.belongs_to__application.__id; // $ExpectError
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
	aNumber = result.belongs_to__application.__id; // $ExpectError
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

	aNumber = result.device_tag[1].id; // $ExpectError
	aString = result.device_name; // $ExpectError
	aNumber = result.belongs_to__application.__id; // $ExpectError
}

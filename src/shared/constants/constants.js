
import displayFormatEnum from '../enums/display-format.enum';
import {  utils } from '../../utilities'


export const refreshTabId = 'rt';
export const tabsList = 'tlst';
export const setNewRt = 'srt';
export const auth = 'auth';
export const cleartimeout = 'cleartimeout';

export const pagesList = [
    { value: 10, label: 10 },
    { value: 25, label: 25 },
    { value: 50, label: 50 }
];


export const hoursFormat = [
	{
		id: 1,
		value: 1,
		label: "24 Hours"
	},
	{
		id: 2,
		value: 2,
		label: "12 Hours"
	}
];
export const timeFormat = [
	{
		id: 1,
		value: 1,
		label: "HH:MM:SS"
	},
	{
		id: 2,
		value: 2,
		label: "HH:MM"
	}
];

export const customCombotimeFormat = [
	{
		id: 0,
		value: 0,
		label: '--Select--'
	},
	{
		id: 1,
		value: 1,
		label: 'HH:MM:SS',
		convert: (val) => utils.SecondsTohhmmss(val),
		regex: '^(\d+):([0-5]?\d):([0-5]?\d)$',
		displayFormatId: displayFormatEnum.HH_MM_SS // associated displayformat
	},
	{
		id: 2,
		value: 2,
		label: 'MM:SS',
		convert: (val) => utils.SecondsTommss(val),
		regex: '^(\d+):([0-5]?\d)$',
		displayFormatId: displayFormatEnum.MM_SS // associated displayformat
	}
];

// export const NumericTypes = ["tinyint", "smallint", "mediumint", "int", "bigint", "float", "double", "decimal"];
export const NumericTypes = ["uint", "int16", "short", "int32", "int", "int64", "long", "float", "double", "decimal", "byte"];

export const DateTypes = ["Date", "datetime"];


export const IntegerDisplayFormats = [displayFormatEnum.Number, displayFormatEnum.Percentage, displayFormatEnum.HH_MM_SS, displayFormatEnum.MM_SS, displayFormatEnum.Decimal];





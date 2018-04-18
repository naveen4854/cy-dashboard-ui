
import displayFormatEnum from '../enums/display-format.enum';
import { utils } from '../../utilities'
import { ApplyToOptions, PictureStretchEnum, StatisticFunction } from '../enums';

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
		id: -1,
		value: -1,
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

export const segments = [
	"#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a", "#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f",
	"#2484c1", "#65a620", "#7b6888", "#a05d56", "#961a1a", "#d8d23a", "#e98125", "#d0743c", "#635222", "#6ada6a",
	"#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e", "#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391",
	"#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c", "#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6",
	"#807ece", "#8db27c", "#be66a2", "#9ed3c6", "#00644b", "#005064", "#77979f", "#77e079", "#9c73ab", "#1f79a7",
	"#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a", "#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f",
	"#65a620", "#2484c1", "#7b6888", "#a05d56", "#961a1a", "#d8d23a", "#e98125", "#d0743c", "#635222", "#6ada6a",
	"#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e", "#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391",
	"#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c", "#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6",
	"#807ece", "#8db27c", "#be66a2", "#9ed3c6", "#00644b", "#005064", "#77979f", "#77e079", "#9c73ab", "#1f79a7"
];

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const DefaultDashboardId = 'new';
export const pictureOptions = [
	{ value: PictureStretchEnum.ActualSize, label: 'Actual Size' },
	{ value: PictureStretchEnum.Fill, label: 'Fill' }
];

export const AllStyleOptions = [
	{
		label: "Cell",
		value: ApplyToOptions.Cell
	},
	{
		label: "Row",
		value: ApplyToOptions.Row
	},
	{
		label: "Column",
		value: ApplyToOptions.Column
	}
];

export const RowStyleOptions = [
	{
		label: "Cell",
		value: ApplyToOptions.Cell
	}, {
		label: "Column",
		value: ApplyToOptions.Column
	}
];

export const ColumnStyleOptions = [
	{
		label: "Cell",
		value: ApplyToOptions.Cell
	},
	{
		label: "Row",
		value: ApplyToOptions.Row
	}

];
export const YesNoOptions = [
	{ label: "Yes", value: true },
	{ label: "No", value: false }
];

export const AggregateOperations = [
	{
		id: StatisticFunction.Sum,
		value: StatisticFunction.Sum,
		label: "Sum",

	},
	{
		id: StatisticFunction.Average,
		value: StatisticFunction.Average,
		label: "Avg",

	},
	{
		id: StatisticFunction.Maximum,
		value: StatisticFunction.Maximum,
		label: "Max",

	},
	{
		id: StatisticFunction.Minimum,
		value: StatisticFunction.Minimum,
		label: "Min",

	}
];
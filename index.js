const protobuf = require("protobufjs");
const path = require("path");
const fs = require("fs");

files_0 = [
	"./data/GTFS_ServiceAlerts.pb",
	"./data/GTFS_TripUpdates.pb",
	"./data/GTFS_VehiclePositions.pb",
];
files_1 = [
	"./data/GTFS_ServiceAlerts (1).pb",
	"./data/GTFS_TripUpdates (1).pb",
	"./data/GTFS_VehiclePositions (1).pb",
];
files_2 = [
	"./data/GTFS_ServiceAlerts (2).pb",
	"./data/GTFS_TripUpdates (2).pb",
	"./data/GTFS_VehiclePositions (2).pb",
];
files_3 = [
	"./data/GTFS_ServiceAlerts (3).pb",
	"./data/GTFS_TripUpdates (3).pb",
	"./data/GTFS_VehiclePositions (3).pb",
];

const gtfsProto = protobuf.loadSync(
	path.join(__dirname, "gtfs-realtime.proto")
);
const FeedMessage = gtfsProto.lookupType("transit_realtime.FeedMessage");

// Analyze the files and print out the results

function readFile(file) {
	const fileContent = fs.readFileSync(file);
	return fileContent;
}

function analyzeFiles() {
	files_0_data = files_0.map(file => readFile(file));
	files_1_data = files_1.map(file => readFile(file));
	files_2_data = files_2.map(file => readFile(file));
	files_3_data = files_3.map(file => readFile(file));

	files_0_decoded = files_0_data.map(data => FeedMessage.decode(data));
	files_1_decoded = files_1_data.map(data => FeedMessage.decode(data));
	files_2_decoded = files_2_data.map(data => FeedMessage.decode(data));
	files_3_decoded = files_3_data.map(data => FeedMessage.decode(data));

	files_0_json = files_0_decoded.map(data => data.toJSON());
	files_1_json = files_1_decoded.map(data => data.toJSON());
	files_2_json = files_2_decoded.map(data => data.toJSON());
	files_3_json = files_3_decoded.map(data => data.toJSON());

	var d0 = new Date(files_0_json[0].header.timestamp * 1000);
	var d1 = new Date(files_1_json[0].header.timestamp * 1000);
	var d2 = new Date(files_2_json[0].header.timestamp * 1000);
	var d3 = new Date(files_3_json[0].header.timestamp * 1000);

	console.log(
		d0.toLocaleString(),
		"\tTrip Updates: ",
		files_0_json[1].entity.length,
		"\tVehicle Positions: ",
		files_0_json[2].entity.length
	);
	console.log(
		d1.toLocaleString(),
		"\tTrip Updates: ",
		files_1_json[1].entity.length,
		"\tVehicle Positions: ",
		files_1_json[2].entity.length
	);
	console.log(
		d2.toLocaleString(),
		"\tTrip Updates: ",
		files_2_json[1].entity.length,
		"\tVehicle Positions: ",
		files_2_json[2].entity.length
	);
	console.log(
		d3.toLocaleString(),
		"\tTrip Updates: ",
		files_3_json[1].entity.length,
		"\tVehicle Positions: ",
		files_3_json[2].entity.length
	);
}

analyzeFiles();

import CharityObj from "../views/Charities/Charity";

const deployLink = "https://api.exploreandgivemore.me";
const localLink = "http://localhost:8080";
const testing = false;

const getCharity = (charityId: number) => {
	const request = new XMLHttpRequest();
	const link = testing ? localLink : deployLink;
	request.open("GET", `${link}/charities/${charityId}`, false);
	request.setRequestHeader("Accept", "application/vnd.api+json");
	request.send();
	console.log("status: " + request.status);
	let response = null;
	if (request.status === 200) {
		response = JSON.parse(request.responseText);
		console.log(response);
	} else return null;
	if (response.status === "error") {
		return null;
	}
	return jsonToCharity(response.data.charity, charityId);
};

const parseJSONCharityGrid = (rawCharityList: any) => {
	const charityList: CharityObj[] = [];
	for (let rawCharity of rawCharityList) {
		let charity: CharityObj | null = jsonToCharity(rawCharity, 0);
		if (charity !== null) charityList.push(charity);
	}
	return charityList;
};

const jsonToCharity = (charity: any, index: number) => {
	if (charity == null) return null;
	const charityObj: CharityObj = {
		id: charity.id,
		name: charity.name,
		score: charity.score,
		rating: charity.rating,
		ratingImage: charity.ratingImage,
		city: charity.city,
		state: charity.state,
		causeArea: charity.causeArea,
		deductibility: charity.deductibility,
		ein: charity.ein,
		mission: charity.mission,
		classification: charity.classification,
		website: charity.website ?? "",
		irsSubsection: charity.irsSubsection,
		financialRating: charity.financialRating,
		accountabilityRating: charity.accountabilityRating,
		Attractions: charity.attractions,
		cityIn: charity.cityIn,
		iframeRender: charity.iframe_render
	};

	// already on HTTPS, safe to host website
	if (charityObj.website.includes("https")) {
		return charityObj;
	}

	// modify "http" to "https" and hope for the best
	charityObj.website = "https" + charityObj.website.slice(4);
	return charityObj;
};

export { getCharity, parseJSONCharityGrid, jsonToCharity };

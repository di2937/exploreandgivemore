import mui_img from "../../images/mui.png";
import gitlab_img from "../../images/gitlab.png";
import react_img from "../../images/react.png";
import postman_img from "../../images/postman.png";
import roadgoat_img from "../../images/roadgoat.png";
import opentrip_img from "../../images/opentrip.png";
import clearskies_img from "../../images/clearskies.png";
import marshmallow_img from "../../images/marshmallow.png";

interface Info {
	name: string;
	description: string;
	extended_description: string;
	link: string;
	image?: any;
	imageURL?: string;
}

const TOOLCHAIN: Info[] = [
	{
		name: "GitLab",
		description: "Version Control Platform",
		extended_description:
			"GitLab was used as an online code storage platform and for its capabilities for issue tracking and CI/CD",
		link: "https://gitlab.com/RikGhosh487/exploreandgivemore",
		image: gitlab_img
	},
	{
		name: "Material UI",
		description: "React Material UI Library",
		extended_description:
			"MUI libraries were used to build React applications using UI components",
		link: "https://mui.com/",
		image: mui_img
	},
	{
		name: "Postman",
		description: "API Designing and Documentation Tool",
		extended_description:
			"Postman was used to test and document our APIs using a graphical user interface",
		link: "https://www.postman.com/",
		image: postman_img
	},
	{
		name: "React",
		description: "JavaScript Frontend Web Framework",
		extended_description:
			"React was used to create reusable components for an interactive UI in our web application ",
		link: "https://reactjs.org/",
		image: react_img
	},
	{
		name: "Namecheap",
		description: "Domain Name Registration",
		extended_description: "Namecheap was used to register our domain name",
		link: "https://www.namecheap.com/",
		imageURL:
			"https://saasreviewhq.com/wp-content/uploads/2021/04/namecheap.svg"
	},
	{
		name: "Docker",
		description: "Containerization Tool",
		extended_description:
			"Docker was used to ensure our libraries and dependencies were consistent throughout our environments",
		link: "https://www.docker.com/",
		imageURL:
			"https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png"
	},
	{
		name: "AWS Amplify",
		description: "Frontend Hosting Platform",
		extended_description: "AWS was used to host our frontend application",
		link: "https://aws.amazon.com/amplify/",
		imageURL:
			"https://images.prismic.io/ionicframeworkcom/d3576c2287f6fd34c80c31bccf81cd3149dafc08_aws-amplify.png"
	},
	{
		name: "Discord",
		description: "Communication and Coordination Platform",
		extended_description:
			"Discord was our main form of communication and used to coordinate meeting times and other project related discussions",
		link: "https://discord.com",
		imageURL:
			"https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png"
	},
	{
		name: "Amazon RDS",
		description: "Relational Database Hosting Service",
		extended_description:
			"Amazon RDS was used to create and connect our database instance",
		link: "https://aws.amazon.com/rds",
		imageURL: "https://media.graphcms.com/cv9vca0YRemw8ARpICex"
	},
	{
		name: "PostgreSQL",
		description: "Object-Relational Database System",
		extended_description:
			"PostgreSQL was used to store and query our data into the database for our web application",
		link: "https://www.postgresql.org",
		imageURL:
			"https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
	},
	{
		name: "Flask",
		description: "Python Micro Web Framework for Backend",
		extended_description:
			"Flask was a framwork used in our backend to gather data from our APIs",
		link: "https://flask.palletsprojects.com",
		imageURL:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQl7BEwqp9RfFRZt_guSqMHxWC2zFqrI8-rQ&usqp=CAU"
	},
	{
		name: "Cloud Run",
		description: "Managed Compute Platform for Backend",
		extended_description: "Cloud Run was used to run our containers",
		link: "https://cloud.google.com/run",
		imageURL: "https://miro.medium.com/max/562/1*gYGvyOHloJ2JKO8MX3fYAw.png"
	},
	{
		name: "SQLAlchemy",
		description: "Python SQL Toolkit and Object Relational Mapper",
		extended_description:
			"SQLAlchemy was used to work on our relational database",
		link: "https://www.sqlalchemy.org/",
		imageURL: "https://www.sqlalchemy.org/img/sqla_logo.png"
	},
	{
		name: "Flask SQLAlchemy",
		description: "Flask Extension with SQLAlchemy Support",
		extended_description:
			"Flask SQLAlchemy was used to define our tables and models",
		link: "https://flask-sqlalchemy.palletsprojects.com/en/3.0.x/",
		imageURL:
			"https://flask-sqlalchemy.palletsprojects.com/en/2.x/_static/flask-sqlalchemy-logo.png"
	},
	{
		name: "Marshmallow",
		description:
			"Python Object Relational Mapping Serializer and Deserializer",
		extended_description:
			"Marshmallow was used to convert complex data types to and from Python data types",
		link: "https://marshmallow.readthedocs.io/en/stable/",
		image: marshmallow_img
	},
	{
		name: "Flask Marshmallow",
		description: "Flask Extension with Marshmallow Support",
		extended_description:
			"Flask Marshmallow was used to add additional features to Marshmallow",
		link: "https://flask-marshmallow.readthedocs.io/en/latest/",
		image: marshmallow_img
	},
	{
		name: "Jest",
		description: "JavaScript Testing Framework",
		extended_description:
			"Tested React components using this JavaScript testing framework",
		link: "https://jestjs.io/",
		imageURL:
			"https://seeklogo.com/images/J/jest-logo-F9901EBBF7-seeklogo.com.png"
	},
	{
		name: "Selenium",
		description: "Web Application Testing Framework",
		extended_description:
			"Performed cross-platform automatic web-based application testing using Selenium",
		link: "https://www.selenium.dev/",
		imageURL:
			"https://upload.wikimedia.org/wikipedia/commons/d/d5/Selenium_Logo.png"
	},
	{
		name: "ReCharts",
		description: "Visualization Library",
		extended_description:
			"Used charting and graphics components to display API data as graphs, plots, and charts",
		link: "https://recharts.org/en-US/",
		imageURL:
			"https://miro.medium.com/max/1400/1*Fwiw0oM1J_HIQZFWcaBPYw.png"
	},
	{
		name: "Prettier",
		description: "Frontend Formatter",
		extended_description:
			"Used to format the frontend Typescript and CSS code for uniformity and consistency",
		link: "https://prettier.io/",
		imageURL: "https://prettier.io/icon.png"
	},
	{
		name: "Black",
		description: "Backend Formatter",
		extended_description:
			"Used to format the backend python scripts for uniformity and consistency",
		link: "https://black.readthedocs.io/en/stable/",
		imageURL: "https://black.readthedocs.io/en/stable/_static/logo2.png"
	}
];

const APIS: Info[] = [
	{
		name: "RoadGoat",
		description: "API for City Data",
		extended_description:
			"RoadGoat was used to access to a comprehensive database regarding our cities model",
		link: "https://www.roadgoat.com/business/cities-api",
		image: roadgoat_img
	},
	{
		name: "Charity Navigator",
		description: "API for Charity Data",
		extended_description:
			"Charity Navigator was used to get comprehensive charity data for our charity model",
		link: "https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1397",
		image: "https://www.charitynavigator.org/_gfx_/promo/printable/jpegs/general_square.jpg"
	},
	{
		name: "OpenTrip Map",
		description: "API for Attractions Data",
		extended_description:
			"OpenTrip Map was used to get data from OpenTripMap database for our attractions model",
		link: "https://opentripmap.io/product",
		image: opentrip_img
	},
	{
		name: "MediaWiki API",
		description: "API for city descriptions",
		extended_description:
			"MediaWiki API was used to get city descriptions for our city model instance pages",
		link: "https://www.mediawiki.org/wiki/API:Main_page",
		image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/MediaWiki-2020-large-icon.svg"
	},
	{
		name: "Google Places API",
		description: "API for information on places",
		extended_description:
			"Google Places API was used to get more discriptive information on our places",
		link: "https://developers.google.com/maps/documentation/places/web-service/overview",
		image: "data:image/png;base64,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"
	},
	{
		name: "Clear Skies API",
		description: "API used for visualizations for the Clear Skies team",
		extended_description:
			"This API was developed by the Clear Skies team and used to produce several visualizations showcasing the data via plots, graphs and charts",
		link: "https://api.clear-skies.me",
		image: clearskies_img
	}
];

export { TOOLCHAIN, APIS };

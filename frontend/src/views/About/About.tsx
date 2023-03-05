/**
 * Developer Notes:
 *
 * We would like to thank Cole Weinmann and Kristina Zhou for providing explicit
 * permission to use some of their designed components for this project.
 *
 * Please check out their GitLab:
 * - Cole Weinmann: https://gitlab.com/coleweinman (@coleweinman)
 * - Kristina Zhou: https://gitlab.com/zhou.kristina (@zhou.kristina)
 *
 * We would like to thank the UniverCity website for providing ideas and concepts
 * that this site was used to bootstrap off of.
 *
 * Please check out UniverCity:
 * - https://www.univercity.me/
 */

import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "react-bootstrap-accordion/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios, { AxiosResponse } from "axios";
import ModelCard from "../../components/common/ModelCard";
import StatCard from "../../components/common/StatCard";
import SimpleStat from "../../components/common/SimpleStat";

import {
	CardContent,
	Typography,
	Divider,
	Stack,
	Box,
	Container,
	Button,
	Tooltip,
	Skeleton
} from "@mui/material";
import {
	Commit as CommitIcon,
	FormatListBulleted as IssueIcon,
	TaskAlt as TestIcon,
	Launch as LaunchIcon
} from "@mui/icons-material";

/* User Defined Imports ↓ */
import { TOOLCHAIN, APIS } from "./infoCards";

/* CSS Imports ↓ */
import "./aboutStyle.css";

/* Team Image Imports ↓ */
import rik_img from "../../images/rik.jpg";
import mariana_img from "../../images/mariana.jpg";
import daimu_img from "../../images/daimu.jpg";
import katherine_img from "../../images/katherine.jpg";
import jarrod_img from "../../images/jarrod.jpg";

/* Website Image Import ↓ */
import site_logo from "../../images/swe-logo-bg.png";

interface Person {
	name: string;
	role: string;
	leader?: string;
	bio: string;
	image: any;
	emails: string[];
	username: string;
	commits: number;
	issues: number;
	tests: number;
}

const PEOPLE: Person[] = [
	{
		name: "Katherine Eisen",
		role: "Full Stack Developer",
		bio:
			`I'm a 4th year computer science major at UT Austin and I'm from Round Rock, Texas. ` +
			`Outside of classes, I enjoy cooking, baking, going on long walks, and listening to music`,
		image: katherine_img,
		emails: ["keeisen@gmail.com"],
		leader: "Phase 3 Lead",
		username: "katherine-eisen",
		commits: 0,
		issues: 0,
		tests: 18
	},

	{
		name: "Rik Ghosh",
		role: "Full Stack Developer",
		bio:
			`I am a third year computer science and mathematics major at UT Austin. I am from Houston, TX` +
			` and I enjoy music and watching movies`,
		image: rik_img,
		leader: "Phase 1 Lead",
		emails: ["rikghosh487@gmail.com"],
		username: "RikGhosh487",
		commits: 0,
		issues: 0,
		tests: 41
	},

	{
		name: "Mariana Medina",
		role: "Front End Developer",
		bio:
			`I am a fourth year computer science major at UT Austin. I am from Houston, TX` +
			` and I enjoy reading and watching shows in my free time`,
		image: mariana_img,
		emails: ["marianamedina@utexas.edu"],
		username: "marianamedina",
		commits: 0,
		issues: 0,
		tests: 2
	},

	{
		name: "Daimu Iwata",
		role: "Full Stack Developer",
		bio:
			`I am an international senior studying computer science at UT Austin. I am from Japan` +
			` and I enjoy playing soccer and watching movies`,
		image: daimu_img,
		leader: "Phase 2 Lead",
		emails: [
			"di2937@cs.utexas.edu",
			"dimeonvin@gmail.com",
			"dime@Dimes-MacBook-Pro.local",
			"dime@wireless-10-148-103-179.public.utexas.edu"
		],
		username: "dimeonvin",
		commits: 0,
		issues: 0,
		tests: 23
	},

	{
		name: "Jarrod Brown",
		role: "Backend Developer",
		bio:
			`I am a senior computer science major at UT Austin, and I'm from Houston, TX.` +
			` I enjoy watching and playing sports, mainly football, basketball, and wrestling`,
		image: jarrod_img,
		emails: [
			"jarrod.brown@utexas.edu",
			"jarrodbrown@Jarrods-MBP.attlocal.net"
		],
		username: "jarrod-brown",
		commits: 0,
		issues: 0,
		tests: 24
	}
];

interface AboutState {
	people: Person[];
	totalCommits: number;
	totalIssues: number;
	totalTests: number;
	loading: boolean;
}

class About extends React.Component<{}, AboutState> {
	constructor(props: any) {
		super(props);

		this.state = {
			people: PEOPLE,
			totalCommits: 0,
			totalIssues: 0,
			totalTests: 108,
			loading: true
		};
	}

	/* Request data from the GitLab API asynchronously */
	async getData() {
		const PROJECT_ID: string = "39620115";
		let pageSize: number = 500;
		let page: number = 1;

		/* Commit Data */
		let totalCommits: number = 0;
		let developerTotalCommits: number = 0;
		let commitMap: Map<string, number> = new Map();
		let newPeople: Person[] = this.state.people;

		while (totalCommits % pageSize === 0) {
			let response: AxiosResponse<any, any> = await axios.get(
				`https://gitlab.com/api/v4/projects/${PROJECT_ID}` +
					`/repository/commits?per_page=${pageSize}&page=${page++}`
			);

			if (response.data.length === 0) {
				// no data received
				break;
			}

			for (let commit of response.data) {
				let email = commit.author_email;
				commitMap.set(email, (commitMap.get(email) ?? 0) + 1);
				totalCommits++;
			}
		}

		for (let person of newPeople) {
			if (person.commits === 0) {
				for (let email of person.emails) {
					person.commits += commitMap.get(email) ?? 0;
				}
			}
			developerTotalCommits += person.commits;
		}
		console.log(commitMap);

		/* Issue Data */
		let totalIssues: number = 0;
		let assignedTotalIssues: number = 0;
		page = 1; // reset page back to 1
		let issueMap: Map<string, number> = new Map();

		while (totalIssues % pageSize === 0) {
			let issueResponse: AxiosResponse<any, any> = await axios.get(
				`https://gitlab.com/api/v4/projects/${PROJECT_ID}` +
					`/issues?per_page=${pageSize}&page=${page++}`
			);

			console.log(issueResponse.data.length);
			if (issueResponse.data.length === 0) {
				// no data received
				break;
			}

			for (let issue of issueResponse.data) {
				if (issue.assignee != null) {
					let username = issue.assignee.username;
					issueMap.set(username, (issueMap.get(username) ?? 0) + 1);
				}
				totalIssues++;
			}
		}

		for (let person of newPeople) {
			person.issues = issueMap.get(person.username) ?? 0;
			assignedTotalIssues += person.issues;
		}

		this.setState({
			people: newPeople,
			totalCommits: developerTotalCommits,
			totalIssues: assignedTotalIssues,
			loading: false
		});
	}

	componentDidMount(): void {
		this.getData();
	}

	render(): React.ReactNode {
		console.log(this.state.loading);
		return (
			<Container className="page-container" sx={{ textAlign: "center" }}>
				<Typography
					gutterBottom
					variant="h2"
					sx={{ textAlign: "center" }}
					style={{ marginTop: 40 }}
				>
					About <b>Explore & Give More</b>
				</Typography>

				<img src={site_logo} alt="Logo" width="450px" height="auto" />

				<Accordion>
					<Accordion.Item eventKey="0">
						<Accordion.Header>
							<em>Learn More</em>
							<br />
						</Accordion.Header>
						<Accordion.Body>
							<Typography
								sx={{ margin: "30px 100px" }}
								variant="body1"
							>
								Explore And Give More, also known as
								Explore&GiveMore is a website that aims to
								become a comprehensive city guide that allows
								users to learn information regarding the cities
								and the public attractions it has to offer. It
								also helps users learn what kind of charitable
								organizations are deeply connected with the
								city. The city guide emphasizes cities and
								attractions that directly help the city in terms
								of revenue or relief, and also highlights
								charities people can donate to. Our motto is to
								become "<em>A Humanitarian City Guide</em>",
								going beyond other city guides and providing
								more than just information regarding your trip
								to a particular the city.
							</Typography>
							<Typography
								sx={{ margin: "30px 100px" }}
								variant="body1"
							>
								Explore And Give More was designed to help those
								looking to learn more about their city of
								choice, explore the different attractions and
								visitor hot spots a city has to offer, and
								overall connect them to charities that are
								deeply rooted to helping those in the city, in
								the hopes of encouraging them to give something
								back. Although this website was intended for
								regional travelers and tourists, the "
								<em>Humanitarian City Guide</em>" welcomes
								online visitors from around the globe.
							</Typography>
							<Typography
								sx={{ margin: "30px 100px" }}
								variant="body1"
							>
								Our website also offers a REST API, that can be
								used to scrape the data we house in our servers
								regarding cities, attractions, and charities.
							</Typography>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="1">
						<Accordion.Header>
							<em>Developer Notes</em>
							<br />
						</Accordion.Header>
						<Accordion.Body>
							<Typography
								sx={{ margin: "30px 140px" }}
								variant="body1"
								color="text.secondary"
							>
								This website combines data from <b>Cities</b>,{" "}
								<b>Attractions</b>, and <b>Charities</b>. In
								order to connect Attractions to Charities, we
								used proximity and events. We also support local
								charities, instead of larger NGOs, to foster
								regional support for cities and its people.
							</Typography>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>

				<Typography
					sx={{ margin: "16px", marginTop: "36px" }}
					variant="h3"
				>
					Team Members
				</Typography>
				<div>
					{this.state.people.map((p) => (
						<ModelCard
							key={p.username}
							fitImage={false}
							height="620px"
							width="300px"
							imageHeight="300px"
							image={p.image}
						>
							<CardContent>
								<Typography variant="h5" component="div">
									{p.name}
								</Typography>
								<Typography
									sx={{ mb: 0 }}
									variant="subtitle1"
									color="text.secondary"
								>
									{p.role}
								</Typography>
								<Typography
									sx={{ mb: 1.5 }}
									variant="subtitle2"
									color="text.secondary"
								>
									<b>{p.leader}</b>
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
								>
									{p.bio}
								</Typography>
							</CardContent>
							<Box style={{ flexGrow: 2 }}></Box>
							<Divider sx={{ width: "300px" }}></Divider>
							<Stack
								direction="row"
								divider={
									<Divider orientation="vertical" flexItem />
								}
								spacing={1.5}
								sx={{
									alignSelf: "center",
									padding: "16px"
								}}
							>
								<Stack
									direction="column"
									alignItems="center"
									alignSelf="center"
									width="60px"
								>
									<CommitIcon fontSize="small" />
									<Typography variant="body2" margin="0px">
										Commits
									</Typography>
									<Typography
										variant="body1"
										textAlign="center"
									>
										{this.state.loading ? (
											<Skeleton width="36px" />
										) : (
											p.commits
										)}
									</Typography>
								</Stack>
								<Tooltip
									title="Total issues assigned"
									followCursor={true}
								>
									<Stack
										direction="column"
										alignItems="center"
										alignSelf="center"
										width="60px"
									>
										<IssueIcon fontSize="small" />
										<Typography
											variant="body2"
											margin="2px"
										>
											Issues
										</Typography>
										<Typography
											variant="body1"
											textAlign="center"
										>
											{this.state.loading ? (
												<Skeleton width="36px" />
											) : (
												p.issues
											)}
										</Typography>
									</Stack>
								</Tooltip>
								<Stack
									direction="column"
									alignItems="center"
									alignSelf="center"
									width="60px"
								>
									<TestIcon fontSize="small" />
									<Typography variant="body2" margin="2px">
										Tests
									</Typography>
									<Typography
										variant="body1"
										textAlign="center"
									>
										{this.state.loading ? (
											<Skeleton width="36px" />
										) : (
											p.tests
										)}
									</Typography>
								</Stack>
							</Stack>
						</ModelCard>
					))}
				</div>
				<Typography
					sx={{ margin: "16px", marginTop: "36px" }}
					variant="h3"
				>
					Repository Data
				</Typography>
				<StatCard elevation={1}>
					<SimpleStat
						label="Total Commits"
						value={this.state.totalCommits.toString()}
						icon={CommitIcon}
						loading={this.state.loading}
					/>
					<SimpleStat
						label="Total Issues"
						value={this.state.totalIssues.toString()}
						icon={IssueIcon}
						loading={this.state.loading}
					/>
					<SimpleStat
						label="Total Tests"
						value={this.state.totalTests.toString()}
						icon={TestIcon}
						loading={this.state.loading}
					/>
				</StatCard>
				<Typography
					sx={{ margin: "16px", marginTop: "36px" }}
					variant="h3"
				>
					Toolchain
				</Typography>
				<div>
					{TOOLCHAIN.map((t) => (
						<ModelCard
							key={t.name}
							width="250px"
							height="290px"
							imageHeight="150px"
							href={t.link}
							target="_blank"
							image={t.image ?? t.imageURL}
							fitImage={true}
							center={true}
						>
							<CardContent className="flip-card">
								<Typography className="flip-card-inner">
									<div className="flip-card-front">
										<Typography
											gutterBottom
											variant="h5"
											component="div"
										>
											{t.name}
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary"
											paddingLeft="40px"
											paddingRight="40px"
										>
											{t.description}
										</Typography>
									</div>
									<div className="flip-card-back">
										<Typography
											variant="body2"
											color="text.secondary"
											paddingLeft="40px"
											paddingRight="40px"
										>
											{t.extended_description}
										</Typography>
									</div>
								</Typography>
							</CardContent>
						</ModelCard>
					))}
				</div>
				<Typography
					sx={{ margin: "16px", marginTop: "36px" }}
					variant="h3"
				>
					APIs
				</Typography>
				<div>
					{APIS.map((a) => (
						<ModelCard
							key={a.name}
							width="250px"
							height="290px"
							imageHeight="150px"
							href={a.link}
							target="_blank"
							image={a.image ?? a.imageURL}
							fitImage={true}
							center={true}
						>
							<CardContent className="flip-card">
								<Typography className="flip-card-inner">
									<div className="flip-card-front">
										<Typography
											gutterBottom
											variant="h5"
											component="div"
										>
											{a.name}
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary"
											paddingLeft="40px"
											paddingRight="40px"
										>
											{a.description}
										</Typography>
									</div>
									<div className="flip-card-back">
										<Typography
											variant="body2"
											color="text.secondary"
											paddingLeft="40px"
											paddingRight="40px"
										>
											{a.extended_description}
										</Typography>
									</div>
								</Typography>
							</CardContent>
						</ModelCard>
					))}
				</div>
				<Stack
					direction="row"
					spacing={2}
					justifyContent="center"
					sx={{ padding: "36px" }}
				>
					<Button
						variant="outlined"
						href="https://gitlab.com/RikGhosh487/exploreandgivemore"
						target="_blank"
					>
						GitLab Repository
						<LaunchIcon sx={{ marginLeft: "8px" }} />
					</Button>
					<Button
						variant="outlined"
						href="https://documenter.getpostman.com/view/14067869/2s83Ycg2LW"
						target="_blank"
					>
						Postman API Documentation
						<LaunchIcon sx={{ marginLeft: "8px" }} />
					</Button>
				</Stack>
			</Container>
		);
	}
}

export default About;

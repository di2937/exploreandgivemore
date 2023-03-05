# Explore&GiveMore

**Canvas/Discord Group Number:** 11 AM - Group 8

## The Developer Team
| Name | GitLabID | UT EID
| :--: | :--: | :--: |
| Rik Ghosh | [`RikGhosh487`](https://gitlab.com/RikGhosh487) | `rgg857` |
| Katherine Eisen | [`katherine-eisen`](https://gitlab.com/katherine-eisen) | `kee663` |
| Mariana Medina | [`marianamedina`](https://gitlab.com/marianamedina) | `mm94863` |
| Daimu Iwata | [`dimeonvin`](https://gitlab.com/dimeonvin) | `di2937` |
| Jarrod Brown | [`jarrod-brown`](https://gitlab.com/jarrod-brown) | `jcb5852` |

----

**Phase 1 Leader: Rik Ghosh**
> Role of leader:
> - Guided group meetings
> - Clarified questions regarding design choices or bugs.
> - Created and designated tasks and issues on GitLab

| Name | Estimated Completion Time | Actual Completion Time |
| :--: | :--: | :--: |
| Rik Ghosh | 15 hrs  | 20 hrs |
| Katherine Eisen | 15 hrs | 17 hrs |
| Mariana Medina | 13 hrs | 15 hrs |
| Daimu Iwata | 15 hrs | 20 hrs |
| Jarrod Brown | 10 hrs | 8 hrs  |

----

**Phase 2 Leader: Daimu Iwata**
> Role of leader:
> - Oversaw extraction of data from APIs and implemented scraping scripts
> - Created Backend hosting through Google Cloud Run and deployed updated instances
> - Found and scraped companion APIs for richer data for models
> - Extensively managed local GitLab runner for pipelines
> - Resolved bugs and errors in testing components

| Name | Estimated Completion Time | Actual Completion Time |
| :--: | :--: | :--: |
| Rik Ghosh | 40 hrs  | 50 hrs |
| Katherine Eisen | 25 hrs | 33 hrs |
| Mariana Medina | 25 hrs | 28 hrs |
| Daimu Iwata | 40 hrs | 50 hrs |
| Jarrod Brown | 30 hrs | 15 hrs  |

----

**Phase 3 Leader: Katherine Eisen**
> Role of leader:
> - Opened issues upfront about everything to be completed this phase
> - Created the search/sort/filter bar component present on the model pages
> - Added additional frontend tests to handle searching, sorting, and filtering

| Name | Estimated Completion Time | Actual Completion Time |
| :--: | :--: | :--: |
| Rik Ghosh | 25 hrs  | 15 hrs |
| Katherine Eisen | 30 hrs | 18 hrs |
| Mariana Medina | 25 hrs | 15 hrs |
| Daimu Iwata | 30 hrs | 20 hrs |
| Jarrod Brown | 10 hrs | 15 hrs  |

----

## Project Information

- **Latest Git SHA**: `264de20720467090356d817ea60e2148a10d501f`
- **Project Website:** [exploreandgivemore.me](https://www.exploreandgivemore.me)
- **GitLab Pipelne:** [GitLab Pipeline](https://gitlab.com/RikGhosh487/exploreandgivemore/-/blob/main/.gitlab-ci.yml)
- **URL of GitLab Repository:** [ExploreAndGiveMore](https://gitlab.com/RikGhosh487/exploreandgivemore)

<details>
    <summary markdown="span"> View Previous SHAs </summary>
    <ul>
        <li> Phase I - <a href="https://gitlab.com/RikGhosh487/exploreandgivemore/-/commit/b0a7d66442e7e2fd6beb882a8465b2a0e424d81a" target="blank_">b0a7d66</a>
        <li> Phase II - <a href="https://gitlab.com/RikGhosh487/exploreandgivemore/-/commit/f7ee67699948f803fb0c83a5d4bfc03b1c23ac1b" target="blank_">f7ee676</a>
        <li> Phase III - <a href="https://gitlab.com/RikGhosh487/exploreandgivemore/-/commit/264de20720467090356d817ea60e2148a10d501f" target="blank_">264de20</a>
    </ul>
</details>

----

**Project Proposal:** The Explore&GiveMore website aims to become a comprehensive city guide that gives you information regarding the cities, the public attractions it has to offer, and what kind of charitable organizations are deeply connected with this city. The city guide emphasizes cities and attractions that directly help the city in terms of revenue or relief, and also highlights charities people can donate to.

----

## APIs
**RESTful APIs for Model Data:**
* [**Cities API**](https://www.roadgoat.com/business/cities-api): https://www.roadgoat.com/business/cities-api
* [**Charitable Organizations API**](https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1397): https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1397
* [**Attractions API**](https://opentripmap.io/product): https://opentripmap.io/product 
* [**Attractions API**](https://developers.google.com/maps/documentation/places/web-service): https://developers.google.com/maps/documentation/places/web-service

----

## Models
- Cities (within USA)
- Attractions (within USA)
- Charitable Organizations (within USA)

<details>
    <summary markdown="span"> Learn More About Instance Counts </summary>
    <b>Instances per Model:</b>
    <ul>
        <li> 531 Cities
        <li> 5573 Nonprofits/Charities
        <li> 2643 Attractions
    </ul>
</details>

----

<details>
    <summary markdown="span"> Learn More About Filtering and Sorting Attributes </summary>
    <b>Filter and Sorting Attributes</b>
    <ul>
        <li> Cities
            <ul>
                <li> Population Size
                <li> Time Zone
                <li> Budget Score
                <li> Walk Score
                <li> "Known-For" Tags
            </ul>
        <li> Attractions
            <ul>
                <li> City
                <li> State
                <li> Popularity
                <li> Cultural Heritage Recognition Status
                <li> "Attribute" Tags
            </ul>
        <li> Charities
            <ul>
                <li> Cause Area
                <li> Star Rating
                <li> City
                <li> State
                <li> Donation Deductibility Status
            </ul>
    </ul>
</details>

----

<details>
    <summary> Learn More About Additional Searchable Attributes </summary>
    <b>Additional Searchable Attributes</b>
    <ul>
        <li> Cities
            <ul>
                <li> Name
                <li> State
                <li> Bike Score
                <li> Timezone
                <li> Cost of Living
            </ul>
        <li> Attractions
            <ul>
                <li> Year of Establishment (if applicable)
                <li> Nearby Charities
                <li> Religious Affiliations (if any)
                <li> Hours of Operation (if available)
                <li> Contact Information
            </ul>
        <li> Charities
            <ul>
                <li> IRS Subsection
                <li> IRS Organization Classification
                <li> Financial Rating
                <li> Accountability Rating
                <li> Charity EIN
            </ul>
    </ul>
</details>

----

<details>
    <summary> Learn More About Rich Media Used</summary>
    <b> Media within Instance Pages </b>
    <ul>
        <li> Cities
            <ul>
                <li> City Images
                <li> City Description
                <li> Embedded Map of the City
                <li> Iframe of City walk score
            </ul>
        <li> Attractions
            <ul>
                <li> Attraction Image
                <li> Description of Attraction
                <li> Embedded Website of the Attraction
                <li> Embedded Map
                <li> Attraction contact information
                <li> Attraction reviews
            </ul>
        <li> Charities
            <ul>
                <li> Image of Charity Logo
                <li> Charity Mission Statement
                <li> Embedded Website of the Charity
            </ul>
    </ul>
</details>

----

**Questions this site will answer:**
1. What are some of the places I could visit if I were to visit this city?
2. What are some charities connected with this city?
3. What charities do these public actions support?

----

### Comments
We implemented all of the user stories that were possible for phase 2 except for those which we received too late to actually implement. We will implement all of the leftover issues in phase 3.

We would like to thank Cole Weinmann and Kristina Zhou for providing explicit permission to use some of their designed components for this project.
Please check out their GitLab:
- Cole Weinmann: [`@coleweinman`](https://gitlab.com/coleweinman)
- Kristina Zhou: [`@zhou.kristina`](https://gitlab.com/zhou.kristina)

We would like to thank the UniverCity website for providing ideas and concepts
that this site was used to bootstrap off of.

Please check out UniverCity:
- https://www.univercity.me/

We would like to thank Nathaniel Nemenzo for providing explicit permission to use some of his testing components for this project (Selenium Tests):
Please check out his GitLab:
- Nathaniel Nemenzo [`@Nathaniel-Nemenzo`](https://gitlab.com/Nathaniel-Nemenzo)

We would like to thank GetThatBread GitLab for providing ideas and concepts for Selenium testing that we could bootstrap off of.

Please check out GetThatBread GitLab:
- https://gitlab.com/Nathaniel-Nemenzo/getthatbread/

Developer Notes:
- You can learn more about how each of the tools are used by hovering over their respective cards in the About page
- Due to lack of robust data in the `Attractions` model, you can expect a different (more refined) dataset in the next Phase (this message will be updated once that change has taken effect)
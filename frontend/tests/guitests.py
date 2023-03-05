# from GetThatBread repository: https://gitlab.com/Nathaniel-Nemenzo/getthatbread/-/blob/main/frontend/getthatbread/selenium/test_gui.py

import sys
import time
import unittest

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver import Remote
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class SeleniumTests(unittest.TestCase):
    driver = None
    wait = None
    local = False  # set to FALSE when pushing to gitlab
    dev = False  # set to FALSE to test actual webpage
    website = "https://www.exploreandgivemore.me/"
    url = website + "{0}"

    """ Home tests """

    @classmethod
    def setUp(self):
        # print("beginning setup for test_gui module")

        if self.dev:
            self.website = "http://localhost:3000/"
            self.url = self.website + "{0}"

        # allow gitlab ci/cd to run selenium tests
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("window-size=1200x600")
        if self.local:
            self.driver = webdriver.Chrome(
                service=Service(ChromeDriverManager().install()), options=chrome_options
            )
        else:
            self.driver = Remote(
                "http://selenium__standalone-chrome:4444/wd/hub", options=chrome_options
            )
        self.driver.get(self.url)
        self.wait = WebDriverWait(self.driver, 20)

    @classmethod
    def tearDown(self):
        # print("tearing down test_gui module")
        self.driver.quit()

    if False:
        # @unittest.skip("demonstrating skipping")
        def testTitle(self):
            print(" --------- test title ---------")
            assert self.driver.title == "Explore & Give More"

        # @unittest.skip("demonstrating skipping")
        def testNavBarListing(self):
            print(" --------- test nav bar listing ---------")
            expected_navbar = ["Home", "Cities", "Attractions", "Charities", "About"]
            # Check if navbar buttons are listed
            navbar = self.driver.find_elements(
                by=By.XPATH, value="//a[@class='navbar']"
            )
            index = 0
            for option in navbar:
                option_text = option.get_attribute("innerHTML").lower()
                self.assertEqual(option_text, expected_navbar[index])
                index = index + 1

        # @unittest.skip("demonstrating skipping")
        def test_existence(self):
            print(" --------- test existence ---------")
            result = self.driver.find_element(by=By.CSS_SELECTOR, value="#root")
            self.assertNotEqual(result, None)

        # @unittest.skip("demonstrating skipping")
        # def test_num_cards(self):
        #     print(" --------- test num cards ---------")
        #     class_name = "MuiPaper-root"
        #     container_name = "bgimg"
        #     result = self.driver.find_element(by=By.CLASS_NAME, value=container_name)
        #     second_result = result.find_elements(by=By.CLASS_NAME, value=class_name)
        #     third = result.find_elements(by=By.CLASS_NAME, value="MuiContainer-root")
        #     # print(result[0].get_attribute("innerHTML").lower())
        #     self.assertEqual(
        #         len(second_result), 3, msg="Number of cards:".format(len(third))
        #     )

        # @unittest.skip("demonstrating skipping")
        def test_city(self):
            print(" --------- test city ---------")
            cities = self.driver.find_element(
                By.XPATH, '//*[@id="root"]/header/div/div[2]/li[2]'
            )
            cities.click()
            self.assertEqual(self.driver.current_url, self.url.format("cities"))

        # @unittest.skip("demonstrating skipping")
        def test_attraction(self):
            print(" --------- test attraction ---------")
            attractions = self.driver.find_element(
                By.XPATH, '//*[@id="root"]/header/div/div[2]/li[3]'
            )
            attractions.click()
            self.assertEqual(self.driver.current_url, self.url.format("attractions"))

        # @unittest.skip("demonstrating skipping")
        def test_charity(self):
            print(" --------- test charity ---------")
            attractions = self.driver.find_element(
                By.XPATH, '//*[@id="root"]/header/div/div[2]/li[4]'
            )
            attractions.click()
            self.assertEqual(self.driver.current_url, self.url.format("charities"))

        # @unittest.skip("demonstrating skipping")
        def test_about_page(self):
            print(" --------- test about page ---------")
            container_name = "MuiContainer-root"
            class_name2 = "MuiPaper-root"
            self.driver.get(self.url.format("about"))

            result = self.driver.find_element(by=By.CLASS_NAME, value=container_name)
            img = result.find_elements(by=By.CLASS_NAME, value=class_name2)

            self.assertEqual(True, len(img) >= 4)

        # @unittest.skip("demonstrating skipping")
        def test_city_img(self):
            print(" --------- test city instance image ---------")
            self.driver.get(self.url.format("cities/433"))
            WebDriverWait(self.driver, 4).until(
                EC.presence_of_element_located((By.TAG_NAME, "img"))
            )
            img = self.driver.find_element(by=By.TAG_NAME, value="img")
            site = img.get_attribute("src")
            self.assertNotEqual(site, "")

        # @unittest.skip("demonstrating skipping")
        def test_charity_img(self):
            print(" --------- test charity instance image ---------")
            self.driver.get(self.url.format("charity/155"))
            WebDriverWait(self.driver, 4).until(
                EC.presence_of_element_located((By.TAG_NAME, "img"))
            )
            img = self.driver.find_element(by=By.TAG_NAME, value="img")
            site = img.get_attribute("src")
            self.assertNotEqual(site, "")

        # @unittest.skip("demonstrating skipping")
        def test_attraction_img(self):
            print(" --------- test attraction instance image ---------")
            self.driver.get(self.url.format("attractions/1"))
            WebDriverWait(self.driver, 4).until(
                EC.presence_of_element_located((By.TAG_NAME, "img"))
            )
            img = self.driver.find_element(by=By.TAG_NAME, value="img")
            site = img.get_attribute("src")
            self.assertNotEqual(site, "")

    """ Sorting Tests """

    def test_charity_sort(self):
        print(" --------- test charity sorting ---------")
        self.driver.get(self.url.format("charities"))
        sort_button = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div/div[2]/div'
        )
        sort_button.click()
        name_sort = self.driver.find_element(
            By.XPATH, '//*[@id="menu-"]/div[3]/ul/li[2]'
        )
        # print(name_sort.get_attribute('innerHTML'))
        name_sort.click()
        self.assertEqual(
            self.driver.current_url, self.url.format("charities?sort_field=name")
        )

    def test_city_sort(self):
        print(" --------- test city sorting ---------")
        self.driver.get(self.url.format("cities"))
        sort_button = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div/div[2]/div'
        )
        sort_button.click()
        population_sort = self.driver.find_element(
            By.XPATH, '//*[@id="menu-"]/div[3]/ul/li[3]'
        )
        population_sort.click()
        self.assertEqual(
            self.driver.current_url, self.url.format("cities?sort_field=population")
        )

    def test_attraction_sort(self):
        print(" --------- test attraction sorting ---------")
        self.driver.get(self.url.format("attractions"))
        sort_button = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div/div[2]/div'
        )
        sort_button.click()
        state_sort = self.driver.find_element(
            By.XPATH, '//*[@id="menu-"]/div[3]/ul/li[4]'
        )
        state_sort.click()
        self.assertEqual(
            self.driver.current_url, self.url.format("attractions?sort_field=state")
        )

    """ Filtering Tests """

    def test_charity_filter(self):
        print(" --------- test charity filtering ---------")
        self.driver.get(self.url.format("charities"))
        filter_button = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div[1]/button[2]'
        )
        filter_button.click()
        cause_area_filter = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div[2]/div/div[1]/div'
        )
        # print(name_sort.get_attribute('innerHTML'))
        cause_area_filter.click()
        special_education_filter = self.driver.find_element(
            By.XPATH, '//*[@id="menu-"]/div[3]/ul/li[9]'
        )
        special_education_filter.click()
        self.assertEqual(
            self.driver.current_url,
            self.url.format("charities?causeArea=Special+Education"),
        )

    def test_city_filter(self):
        print(" --------- test city filtering ---------")
        self.driver.get(self.url.format("cities"))
        filter_button = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div[1]/button[2]'
        )
        filter_button.click()

        budget_filter = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div[3]/div[3]/div/div/span/span[10]'
        )
        budget_filter.click()
        self.assertEqual(
            self.driver.current_url, self.url.format("cities?max_budget=3")
        )

    def test_attraction_filter(self):
        print(" --------- test attraction filtering ---------")
        self.driver.get(self.url.format("attractions"))
        filter_button = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div[1]/button[2]'
        )
        filter_button.click()
        kinds_filter = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div[2]/div[5]/div/div'
        )
        # print(name_sort.get_attribute('innerHTML'))
        kinds_filter.click()
        tourist_object_filter = self.driver.find_element(
            By.XPATH, '//*[@id="menu-"]/div[3]/ul/li[5]'
        )
        tourist_object_filter.click()
        self.assertEqual(
            self.driver.current_url, self.url.format("attractions?kinds=Tourist+Object")
        )

    """ Searching Tests """

    def test_charity_search(self):
        print(" --------- test charity searching ---------")
        self.driver.get(self.url.format("charities"))
        search_bar = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div/div[1]/input'
        )
        search_bar.click()
        search_bar.send_keys("fish")
        search_button = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div/button[1]'
        )
        search_button.click()
        self.assertEqual(
            self.driver.current_url, self.url.format("charities?query=fish")
        )

    def test_city_search(self):
        print(" --------- test city searching ---------")
        self.driver.get(self.url.format("cities"))
        search_bar = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div/div[1]/input'
        )
        search_bar.click()
        search_bar.send_keys("austin")
        search_button = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div/button[1]'
        )
        search_button.click()
        self.assertEqual(
            self.driver.current_url, self.url.format("cities?query=austin")
        )

    def test_attraction_search(self):
        print(" --------- test attractions searching ---------")
        self.driver.get(self.url.format("attractions"))
        search_bar = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div/div[1]/input'
        )
        search_bar.click()
        search_bar.send_keys("movie")
        search_button = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/form/div/div/button[1]'
        )
        search_button.click()
        self.assertEqual(
            self.driver.current_url, self.url.format("attractions?query=movie")
        )

    """ search page tests """

    def test_search_page(self):
        print(" --------- test search page ---------")
        self.driver.get(self.url.format("search"))
        search_bar = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/main/div/form/div/input'
        )
        search_bar.click()
        search_bar.send_keys("fish")
        search_button = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/main/div/form/button'
        )
        search_button.click()
        self.assertEqual(self.driver.current_url, self.url.format("search?query=fish"))


if __name__ == "__main__":
    unittest.main()

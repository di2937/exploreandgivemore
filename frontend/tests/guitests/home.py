import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import sys

PATH = sys.argv[1]
website = sys.argv[2]
url = website + "{0}"


class SeleniumTests(unittest.TestCase):
    @classmethod
    def setUpClass(c):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        c.driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()), options=chrome_options
        )

    @classmethod
    def tearDownClass(c):
        c.driver.quit()

    def testNavBarListing(self):
        expected_navbar = ["Home", "Cities", "Attractions", "Charities", "About"]
        driver = self.createDriver()
        driver.get(self.url)
        # Check if navbar buttons are listed
        navbar = driver.find_elements(by=By.XPATH, value="//a[@class='navbar']")
        index = 0
        for option in navbar:
            option_text = option.get_attribute("innerHTML").lower()
            self.assertEqual(option_text, expected_navbar[index])
            index = index + 1
        driver.quit()

    def test_existence(self):
        self.driver.get(website)
        result = self.driver.find_element(by=By.CSS_SELECTOR, value="#root")
        self.assertNotEqual(result, None)

    def test_num_cards(self):
        self.driver.get(website)
        class_name = "MuiCardMedia-root"
        WebDriverWait(self.driver, 4).until(
            ec.presence_of_all_elements_located((By.CLASS_NAME, class_name))
        )
        result = self.driver.find_elements(by=By.CLASS_NAME, value=class_name)
        self.assertEqual(len(result), 3, msg="Number of cards:".format(len(result)))

    def test_city(self):
        self.driver.get(website)
        class_name = "MuiCardMedia-root"
        WebDriverWait(self.driver, 4).until(
            ec.presence_of_all_elements_located((By.CLASS_NAME, class_name))
        )
        self.driver.find_elements(by=By.CLASS_NAME, value=class_name)[0].click()
        self.assertEqual(self.driver.current_url, url.format("/cities"))

    def test_attraction(self):
        self.driver.get(website)
        class_name = "MuiCardMedia-root"
        WebDriverWait(self.driver, 4).until(
            ec.presence_of_all_elements_located((By.CLASS_NAME, class_name))
        )
        self.driver.find_elements(by=By.CLASS_NAME, value=class_name)[1].click()
        self.assertEqual(self.driver.current_url, url.format("/attractions"))

    def test_charity(self):
        self.driver.get(website)
        class_name = "MuiCardMedia-root"
        WebDriverWait(self.driver, 4).until(
            ec.presence_of_all_elements_located((By.CLASS_NAME, class_name))
        )
        element = self.driver.find_elements(by=By.CLASS_NAME, value=class_name)[2]
        element.click()
        self.assertEqual(self.driver.current_url, url.format("/charities"))

    def test_about_page(self):
        self.driver.get(url.format("/about"))
        WebDriverWait(self.driver, 4).until(
            ec.presence_of_all_elements_located((By.TAG_NAME, "img"))
        )
        img = self.driver.find_elements(by=By.TAG_NAME, value="img")
        self.assertEqual(True, len(img) >= 4)


if __name__ == "__main__":
    unittest.main(argv=["first-arg-is-ignored"], exit=True)

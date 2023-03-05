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
    def setUpClass(cls):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        cls.driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()), options=chrome_options
        )

    @classmethod
    def tearDownClass(c):
        c.driver.quit()

    def test_city_card(self):
        self.driver.get(website)
        class_name = "MuiButtonBase-root"
        WebDriverWait(self.driver, 4).until(
            ec.presence_of_all_elements_located((By.CLASS_NAME, class_name))
        )
        element = self.driver.find_element(by=By.CLASS_NAME, value=class_name)
        element.click()
        regex_pattern = website + "(\d)*"
        self.assertRegex(self.driver.current_url, regex_pattern)

    def test_city_img(self):
        self.driver.get(url.format("/433"))
        WebDriverWait(self.driver, 4).until(
            ec.presence_of_element_located((By.TAG_NAME, "img"))
        )
        img = self.driver.find_element(by=By.TAG_NAME, value="img")
        site = img.get_attribute("src")
        self.assertNotEqual(site, "")

    def test_city_links(self):
        self.driver.get(url.format("/449"))
        css_str = "a[href*='charities']"
        WebDriverWait(self.driver, 4).until(
            ec.presence_of_element_located((By.CSS_SELECTOR, css_str))
        )
        element = self.driver.find_element(by=By.CSS_SELECTOR, value=css_str)
        element.click()
        regex_url = website[0 : website.rfind("/")] + "/charities/"
        regex_pattern = regex_url + "(\d)*"
        self.assertRegex(self.driver.current_url, regex_pattern)


if __name__ == "__main__":
    unittest.main(argv=["first-arg-is-ignored"], exit=True)

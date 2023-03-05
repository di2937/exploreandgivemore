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
    def tearDownClass(cls):
        cls.driver.quit()

    def test_attractions_maps(self):
        self.driver.get(url.format("/1"))
        tag_name = "iframe"
        WebDriverWait(self.driver, 4).until(
            ec.presence_of_all_elements_located((By.TAG_NAME, tag_name))
        )
        # tests if there is a map fram
        text = self.driver.find_element(by=By.TAG_NAME, value=tag_name).get_attribute(
            "title"
        )
        self.assertEqual(text, "map_frame", msg="The text:{0}".format(text))


if __name__ == "__main__":
    unittest.main(argv=["first-arg-is-ignored"], exit=True)

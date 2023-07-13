# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class AppDynamicsJob(unittest.TestCase):
    def setUp(self):
        # AppDynamics will automatically override this web driver
        # as documented in https://docs.appdynamics.com/display/PRO44/Write+Your+First+Script
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.google.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_app_dynamics_job(self):
        driver = self.driver
        driver.get("https://mol.hostplus.com.au/mjol")
        driver.find_element_by_xpath("//div[@id='root']/div[2]/div[2]/div/div[3]/div/div/div/div[3]/div/div/form/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div/div/div/div/div[2]/div/div[2]/div/div/div/div/div").click()
        driver.find_element_by_id("react-select-11-option-2").click()
        driver.find_element_by_id("mjol-form.personal-details.personal-details-input-wrapper.personal-details-sub-layout-line-1.first-name").click()
        driver.find_element_by_id("mjol-form.personal-details.personal-details-input-wrapper.personal-details-sub-layout-line-1.first-name").clear()
        driver.find_element_by_id("mjol-form.personal-details.personal-details-input-wrapper.personal-details-sub-layout-line-1.first-name").send_keys("JASON")
        driver.find_element_by_id("mjol-form.personal-details.personal-details-input-wrapper.personal-details-sub-layout-line-1.last-name").click()
        driver.find_element_by_id("mjol-form.personal-details.personal-details-input-wrapper.personal-details-sub-layout-line-1.last-name").clear()
        driver.find_element_by_id("mjol-form.personal-details.personal-details-input-wrapper.personal-details-sub-layout-line-1.last-name").send_keys("CHURCH")
        driver.find_element_by_xpath("//div[@id='root']/div[2]/div[2]/div/div[3]/div/div/div/div[3]/div/div/form/div/div[2]/div[2]/div[2]/div/div/div/div/div/div/div[2]/div/div/div/div/div[2]/div/div[2]/div/div/div/div/div").click()
        driver.find_element_by_id("react-select-12-option-1").click()
        driver.find_element_by_id("mjol-form.personal-details.personal-details-input-wrapper.personal-details-sub-layout-line-2.date-of-birth").click()
        driver.find_element_by_id("mjol-form.personal-details.personal-details-input-wrapper.personal-details-sub-layout-line-2.date-of-birth").clear()
        driver.find_element_by_id("mjol-form.personal-details.personal-details-input-wrapper.personal-details-sub-layout-line-2.date-of-birth").send_keys("16/01/1974")
        driver.find_element_by_id("mjol-form.contact-details.contact-details-e-contact-section.contact-details-sub-layout.email-address").click()
        driver.find_element_by_id("mjol-form.contact-details.contact-details-e-contact-section.contact-details-sub-layout.email-address").clear()
        driver.find_element_by_id("mjol-form.contact-details.contact-details-e-contact-section.contact-details-sub-layout.email-address").send_keys("CHURCH@yopmail.com")
        driver.find_element_by_id("mjol-form.contact-details.contact-details-e-contact-section.contact-details-sub-layout.confirm-email-address").click()
        driver.find_element_by_id("mjol-form.contact-details.contact-details-e-contact-section.contact-details-sub-layout.confirm-email-address").clear()
        driver.find_element_by_id("mjol-form.contact-details.contact-details-e-contact-section.contact-details-sub-layout.confirm-email-address").send_keys("CHURCH@yopmail.com")
        driver.find_element_by_xpath("//input[@value='+61']").click()
        driver.find_element_by_xpath("//input[@value='+61']").click()
        driver.find_element_by_xpath("//input[@value='+61 47 2880 786']").clear()
        driver.find_element_by_xpath("//input[@value='+61 47 2880 786']").send_keys("+61 47 2880 786")
        driver.find_element_by_xpath("//div[@id='root']/div[2]/div[2]/div/div[3]/div/div/div/div[3]/div/div/form/div[2]/div[4]/div[2]/div/div[2]/div/div/div/div/div").click()
        driver.find_element_by_id("react-select-13-option-0").click()
        driver.find_element_by_xpath("//div[@id='root']/div[2]/div[2]/div/div[3]/div/div/div/div[3]/div/div/form/div[4]/div[2]/div/div[2]/div[2]/div/div/div/ul/li[2]/label").click()
        driver.find_element_by_id("mjol-form.tfn-section.tfn-section-input-wrapper.tfn-sub-layout.tfn-prompt").click()
        driver.find_element_by_id("mjol-form.tfn-section.tfn-section-input-wrapper.tfn-sub-layout.tfn-prompt").clear()
        driver.find_element_by_id("mjol-form.tfn-section.tfn-section-input-wrapper.tfn-sub-layout.tfn-prompt").send_keys("879302190")
        driver.find_element_by_xpath("//div[@id='root']/div[2]/div[2]/div/div[3]/div/div/div/div[3]/div/div/form/div[5]/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div/div/div[2]/div/div[2]/div/div/div/ul/li/label").click()
        driver.find_element_by_xpath("//div[@id='root']/div[2]/div[2]/div/div[3]/div/div/div/div[3]/div/div/form/div[6]/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div/div/div/div/div[2]/div/div/div/ul/li/label").click()
        driver.find_element_by_xpath("//div[@id='root']/div[2]/div[2]/div/div[3]/div/div/div/div[3]/div/div/form/div[7]/div/div/div[2]/div/div/div/div/button/span").click()
        driver.find_element_by_id("accountDetailsDescription.input-section.password").click()
        driver.find_element_by_id("accountDetailsDescription.input-section.password").clear()
        driver.find_element_by_id("accountDetailsDescription.input-section.password").send_keys("Hellothere!@34")
        driver.find_element_by_id("accountDetailsDescription.input-section.confirmPassword").click()
        driver.find_element_by_id("accountDetailsDescription.input-section.confirmPassword").clear()
        driver.find_element_by_id("accountDetailsDescription.input-section.confirmPassword").send_keys("Hellothere!@34")
        driver.find_element_by_xpath("//div[@id='root']/div[2]/div[2]/div/div[3]/div/div/div/div[3]/div/div/form/div[3]/div/div/div[2]/div/div/div/div/button/span/span").click()
        driver.find_element_by_xpath("//div[@id='root']/div[2]/div[2]/div/div[3]/div/div/div/div/div/div/p").click()
        # ERROR: Caught exception [ERROR: Unsupported command [doubleClick | xpath=//div[@id='root']/div[2]/div[2]/div/div[3]/div/div/div/div/div/div/p | ]]
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        # To know more about the difference between verify and assert,
        # visit https://www.seleniumhq.org/docs/06_test_design_considerations.jsp#validating-results
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()

from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.common.by import By
import requests
from bs4 import BeautifulSoup
import re
import time

def subString(s, l):
    """
    Truncate a string to a specified length, considering multi-byte characters.
    :param s: The input string.
    :param l: The desired length.
    :return: The truncated string.
    """
    if l >= len(s):
        return s
    i = 0
    p = 0
    while True:
        ch = ord(s[i])
        if ch >= 252:
            p += 6
        elif ch >= 248:
            p += 5
        elif ch >= 240:
            p += 4
        elif ch >= 224:
            p += 3
        elif ch >= 192:
            p += 2
        else:
            p += 1
        if p >= l:
            break
        i = p
    return s[:i]

# MongoDB connection setup
client = MongoClient("mongodb://localhost:27017/")
db = client["hospital"]
db.drop_collection("hos")
db.drop_collection("img")
hos_collection = db["hos"]
img_collection = db["img"]

# Selenium WebDriver setup
options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--ignore-ssl-errors')
options.add_experimental_option("excludeSwitches", ['enable-automation', 'enable-logging'])
driver = webdriver.Chrome(options=options)

driver.maximize_window()
driver.implicitly_wait(10)

base_url = 'https://www.guahao.com/hospital/all/%E5%85%A8%E5%9B%BD/all/%E4%B8%8D%E9%99%90'
pageNum = 60

print("Starting to scrape hospital data...")
for i in range(1, 36):  # Adjusted for loop range as per your script
    current_url = f"{base_url}/p{i}"
    driver.get(current_url)
    time.sleep(2)
    print(f"Loaded page {i}")

    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'html.parser')
    result = soup.select('#g-cfg > div.g-grid2-l > div.g-hospital-items.to-margin > ul')
    
    for index in result:
        pattern = re.compile(r'<div class="info g-left">.*?<a class="img" href="(.*?)".*?src="(.*?)" title="(.*?)".*?<span title="(.*?)".*?<span title="(.*?)".*?<label monitor="search_allpg_hosplist,search_allpg_hosplist,data">(.*?)</label>.*?<label>(.*?)</label>.*?</li>', re.S)
        hospitals = re.findall(pattern, str(index))

        pattern = re.compile('<div class="top-left".*?class="J_Province".*?>(.*?)</span>', re.S)
        hos_province = re.findall(pattern, str(soup))[0]  # Province

        print(f"Extracted data for {len(hospitals)} hospitals on page {i}")
        for hospital in hospitals:
            hos_url, img_url, name, phone_number, position, reservation, evaluation = hospital
            img_response = requests.get(img_url)
            img_data = img_response.content

            hos_details_response = requests.get(hos_url)
            hos_details_soup = BeautifulSoup(hos_details_response.text, 'html.parser')
            intro_section = hos_details_soup.select_one('#g-cfg > div.grid-group > section > div.info > div.detail.word-break > div.about')
            intro_text = intro_section.get_text(strip=True) if intro_section else "No intro available"
            intro_text = subString(intro_text, 1000)

            followers_section = hos_details_soup.select_one('span[class="mark-count"]')
            followers = followers_section.get_text(strip=True) if followers_section else "0"

            department_list = hos_details_soup.select('#departments > div.grid-content > ul > li > label')
            departments = [dept.get_text(strip=True) for dept in department_list]
            if "特色科室" in departments:
                departments.remove("特色科室")
                spans = hos_details_soup.select('#departments > div.grid-content > ul > li:nth-child(1) > p > span')
                special_results = []
                for span in spans:
                    has_title_pattern = re.compile('''<span.*?<a.*?title="(.*?)">.*?</span>''', re.S)
                    no_title_pattern = re.compile('''<span.*?<a.*?monitor-div-id=".*?">(.*?)</a>.*?</span>''', re.S)
                    has_title_result = re.findall(has_title_pattern, str(span))
                    if not has_title_result:
                        no_title_result = re.findall(no_title_pattern, str(span))
                        special_results.append(no_title_result[0])
                    else:
                        special_results.append(has_title_result[0])
                special = ','.join(special_results)
            else:
                special = "None"
            if "其他" in departments:
                departments.remove("其他")
            if "推荐科室" in departments:
                departments.remove("推荐科室")
            hos_department = ','.join(departments)

            hos_data = {
                "name": name,
                "url": hos_url,
                "province": hos_province,
                "phone_number": phone_number,
                "position": position,
                "reservation": reservation,
                "evaluation": evaluation,
                "intro": intro_text,
                "followers": followers,
                "departments": hos_department,
                "special": special,
                "img_url": img_url,
            }
            
            hos_collection.insert_one(hos_data)
            img_collection.insert_one({"img_url": img_url, "data": img_data})
            print(f"Hospital data and image for {name} inserted into MongoDB.")

driver.quit()
print("Scraping process completed.")
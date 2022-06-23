import csv
import sys
from datetime import datetime
from typing import List, Union

import requests
from bs4 import BeautifulSoup

URL = "https://medium.com/feed/@vinothu"

def process_page(xml: str) -> List[List[Union[int, str]]]:
    """
    This is the meat of your web scraper:
    Pulling out the data you want from the HTML of the web page
    """
    webpage_parsed = BeautifulSoup(xml, 'xml')
    webpage_title = webpage_parsed.title
    print(webpage_title)

def pull_data(url: str) -> List[List[Union[int, str]]]:
    response = requests.get(url)
    response.raise_for_status()

    content = response.content#resp.content.decode('utf8')
    return process_page(content)


def main():
    # The program takes 1 optional argument: an output filename. If not present,
    # we will write the output a default filename, which is:
    filename = f"data/output-{datetime.utcnow().strftime('%Y-%m-%d')}.csv"
    if len(sys.argv) > 1:
        filename = sys.argv[1]

    print(f"Will write data to {filename}")

    print(f"Pulling data from {URL}...")
    data = pull_data(URL)
    print(f"Done pulling data.")

    #print("Writing data...")
    #with open(filename, 'wt') as outfile:
    #    writer = csv.writer(outfile)
    #    writer.writerows(data)
    #print("Done writing data.")


if __name__ == "__main__":
    main()

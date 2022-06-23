import csv
import sys
from datetime import datetime
from typing import List, Union
#import pandas as pd

import requests
from bs4 import BeautifulSoup

URL = "https://medium.com/feed/@vinothu"

def process_page(xml: str) -> List[List[Union[int, str]]]:
    """
    This is the meat of your web scraper:
    Pulling out the data you want from the HTML of the web page
    """
    webpage_parsed = BeautifulSoup(xml, 'lxml-xml')
    webpage_title = webpage_parsed.title
    print(webpage_title)
    
    #create empty dataframe
    #df = pd.DataFrame(columns=['Date Created', 'Title', 'URL', 'Image'])
    write_to_file(convert_html(webpage_parsed))
    
def write_to_file(lines):
    # Writing to file
    write_file_name = "cards_medium_ss.html"
    print(f"Writing data to file...{write_file_name}")
    with open(write_file_name, "w") as medium_file:
      # Writing data to a file
      medium_file.writelines(lines)
    print("Done writing data.")
    
def convert_html(webpage):
    # for medium
    lines = []
    lines.append('<!-- version 6 -->\n')
    lines.append('<html lang="en">\n')
    lines.append('<head>\n')
    lines.append('<base target="_self">\n')
    lines.append('<meta charset="utf-8">\n')
    lines.append('<meta name="viewport" content="width=device-width, initial-scale=1">\n')
    lines.append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>\n')
    lines.append('<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">\n')
    lines.append('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>\n')
    lines.append('<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>\n')
    lines.append('<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">\n')
    lines.append('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">\n')
    lines.append('</head>\n')
    lines.append('<body>\n')
    lines.append('<div class="container-fluid bg-white">\n')
    lines.append('<div class="row">\n')

    for ind, item in enumerate(webpage.findAll('item')):
      title = item.findChildren('title')
      title_text = title[0].getText()
      link = item.findChildren('link')
      link_text = link[0].getText()
      date = datetime.strptime(item.findChildren('pubDate')[0].getText(), "%a, %d %b %Y %H:%M:%S %Z")
      date = datetime.strftime(date.date(), "%m/%d/%Y")
      image_content = item.findChildren('content:encoded')[0].getText()
      image_parsed = BeautifulSoup(image_content, 'html.parser')
      image_src = image_parsed.img['src']
      print(f"-----------Card values {ind}-----------------")
      print(date, "\n", title_text, "\n", link_text, "\n", image_src)
      #df.loc[len(df)] = [date, title_text, link_text, image_src]

      if ind == 4:
        lines.append('<div class="col-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">\n')
        lines.append("<div class='card text-white bg-white border-secondary rounded h-100 zoom'>\n")
        lines.append("<a href='"+link_text+"' target='_blank' class='card-link text-secondary' id='data-card-news'>\n")
        lines.append("<img src='"+image_src+"' id='data-card-image' loading='lazy' class='card-img-top img-fluid' alt='...'>\n")
        lines.append("<div class='card-body p-1'>\n")
        lines.append("<p class='card-text' id='data-card-body-text'>"+title_text+"</p>\n")
        lines.append("</div>    <!-- news card body -->\n")
        lines.append('<div class="card-footer bg-transparent border-0">\n')
        lines.append("<small class='text-muted'><i class='glyphicon glyphicon-calendar'></i>"+date+"</small>\n")
        lines.append("</div>  <!-- news card footer -->\n")
        lines.append("</a>\n")
        lines.append("</div>        <!-- news card -->\n")
        lines.append("</div>   <!-- col card -->\n")

      #break

    lines.append("</div>            <!-- row card -->\n")
    lines.append("</div>      <!-- container -->\n")
    lines.append("</body>\n")
    lines.append("</html>\n")
    
    return lines

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

import csv
import json 

from pymupdf import name

class person:
    def __init__(self, first_name: str, last_name: str, email: str, gender: str, job_title: str, company: str, address: str, city: str, state: str, zip: str):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.gender = gender
        self.job_title = job_title
        self.company = company
        self.address = address
        self.city = city
        self.state = state
        self.zip = zip


rowNumber = 0
parsedCSV = {}
with open('Revify-Sample-Leads.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        personInstance = person(
            first_name=row['first_name'],
            last_name=row['last_name'],
            email=row['email'],
            gender=row['gender'],
            job_title=row['job_title'],
            company=row['company'],
            address=row['address'],
            city=row['city'],
            state=row['state'],
            zip=row['zip']
        )
        parsedCSV[rowNumber] = vars(personInstance)
        rowNumber += 1

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(parsedCSV, f) 
import xmlrpc.client
from os import name

url = "http://localhost:8070"
db = "odoo17"
username = 'admin'
password = '3bdcbad98516e9ff130525e5f5941be981ff9717'
# full_url = "http://localhost:8070/xmlrpc/common"




common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(url))

common1= xmlrpc.client.ServerProxy(url + "/xmlrpc/common")

user= common1.login(db,username,password)

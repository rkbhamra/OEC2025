from datetime import date, datetime
import mysql.connector.cursor
import requests
# import MySQLdb.cursors

from secureconnection import secureConnect



cnx = secureConnect("disastertracker")
curD = cnx.cursor(dictionary=True)
curL = cnx.cursor()

def getCategories():
    curL.execute(f"SELECT * FROM disastertypes ORDER BY Id = 0, DisasterType")
    print(curL.fetchall())

# def report(GPSpos, type, etc)

getCategories()
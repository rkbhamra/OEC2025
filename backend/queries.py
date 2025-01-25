from datetime import date, datetime
import mysql.connector.cursor
import requests
# import MySQLdb.cursors

from secureconnection import secureConnect



cnx = secureConnect("disastertracker")
curD = cnx.cursor(dictionary=True)
curL = cnx.cursor()

# def getCategories():
#     curL.execute(f"SELECT * FROM disastertypes ORDER BY Id = 0, DisasterType")
#     # print(curL.fetchall())
#     return curL.fetchall()

def report(lat, long, dtype, city, prov, country, severity, time):
    curL.execute("INSERT into reports (City, Province, Country, Type, Severity, TotalReports, Latitude, Longitude, TimeOfReport) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", 
                (city, prov, country, dtype, severity, 1, lat, long, time))
    cnx.commit()

def update(rid, severity, time):
    curL.execute("INSERT into updates (ReportId, Severity, TimeOfUpdate) VALUES (%s, %s, %s)", (rid, severity, time))
    curL.execute(f"UPDATE reports SET totalreports = totalreports + 1 where id = {rid}")
    cnx.commit()

def getTopNearMe(city):
    curL.execute(f"SELECT * FROM reports WHERE CITY = \"{city}\" ORDER BY TotalReports DESC LIMIT 5")
    # print(curL.fetchall())
    return curL.fetchall()

def checkForSimilar(dtype, lat, long):
    curL.execute(f"SELECT * FROM reports where type = \"{dtype}\" AND abs(Latitude - {lat}) < 0.5 AND abs(Longitude - {long}) < 0.5")

    ret = curL.fetchall()
    print(ret)
    return ret
    


# getCategories()
# report([43.641681, -79.459243], 1, "Toronto", "ON", "Canada", 4, "2025-01-14 16:33:00")
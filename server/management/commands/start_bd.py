import asyncio
import time

from django.core.management.base import BaseCommand
from server.models import StationType, BenzineType, AzsStation, SummaryForBenzine
from server.management.commands import _generate_initial as gi
from server.management.commands.azspoints import _tatneft as tatneft
from server.management.commands.azspoints import _gazprom as gazprom



def create_station_benzine_type(order_station):
    """
    STEP #1: create Firm names and Benzines type
    """
    t_stations = StationType.objects.all()
    if t_stations.count() > 0:
        pass
    else: 
        mt_stations = [StationType(name=key) for key in order_station]
        StationType.objects.bulk_create(mt_stations)

    t_benzine = BenzineType.objects.all()
    if t_benzine.count() > 0:
        pass
    else:
        for key_station  in order_station:
            st_station=StationType.objects.get(name=key_station)
            dic = {"tatneft": tatneft.fuel_types, 
                   "gazprom": gazprom.fuel_types}       
            for key in dic[key_station]:
                benzine = BenzineType.objects.create(
                    name = dic[key_station][key],
                    firmid = int(key))
                benzine.stationtype.add(st_station)
                benzine.save()



def create_azs_statiom(order_station):
    """
    STEP2: adding other data
    """
    bulk = asyncio.run(gi.bulk_azs(order_station))

    for data, firm in zip(bulk, order_station) :
        azs_type = StationType.objects.get(name=firm)
        print(firm)
        print(len(data))
        i, cou, step = 0, 1, 100
        
        for item in data:
            azs= item["azs"]
            servs = "; ".join(item["features"])

            m_azs = AzsStation.objects.create(
                lat = float(azs["lat"]),
                lon = float(azs["lon"]),
                address = azs["address"],
                number = int(azs["number"]),
                services = servs
            )
            m_azs.azstype.add(azs_type)
            m_azs.save()

            fuels = [ SummaryForBenzine(
                benzine = BenzineType.objects.get(firmid=fuel["type"]),
                azs = m_azs,
                cost = float(fuel["price"]),
                discont = float(fuel["discount_price"])
            ) for fuel in item["fuels"]]
                
            SummaryForBenzine.objects.bulk_create(fuels)
            if i == step*cou:
                print ("update ", cou * step)
                cou+=1
            i+=1
        print ("FULL update ", len(data))


class Command(BaseCommand):
    help = 'Create and update information about fuels'

    def handle(self, *args, **options):
        time1= time.time()
        StationType.objects.all().delete()
        BenzineType.objects.all().delete()
        AzsStation.objects.all().delete()
        SummaryForBenzine.objects.all().delete()

        order_station = ["tatneft", "gazprom"]
        create_station_benzine_type(order_station)
        print("finish 1 step")
        create_azs_statiom(order_station)
        time2 = time.time()
        self.stdout.write("Spend %f sec" % (time2-time1))


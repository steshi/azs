from django.db import models

class StationType(models.Model):
    name = models.TextField()

class BenzineType(models.Model):
    name = models.TextField()
    firmid = models.IntegerField() 
    stationtype = models.ManyToManyField(StationType) 


class AzsStation(models.Model):
    azstype = models.ManyToManyField(StationType) 
    number = models.IntegerField()
    lat=models.DecimalField(max_digits=10, decimal_places=7)
    lon=models.DecimalField(max_digits=10, decimal_places=7)

    address = models.TextField()
    services = models.TextField()


class SummaryForBenzine(models.Model):
    benzine = models.ForeignKey(BenzineType, on_delete=models.CASCADE)
    azs = models.ForeignKey(AzsStation, on_delete=models.CASCADE)
    cost = models.FloatField()
    discont = models.FloatField()
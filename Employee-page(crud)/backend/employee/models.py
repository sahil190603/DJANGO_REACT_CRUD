
# employee/models.py
from django.db import models

class Designation(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class Hobby(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Employee(models.Model):
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=50)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    designation = models.ForeignKey(Designation, on_delete=models.CASCADE)
    hobbies = models.ManyToManyField(Hobby , blank=True)
 
    def __str__(self):
        return self.name

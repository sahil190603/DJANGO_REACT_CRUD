from django.contrib import admin
from .models import Employee
from .models import Hobby
from .models import Designation

# Register your models here.

admin.site.register(Employee)
admin.site.register(Hobby)
admin.site.register(Designation)
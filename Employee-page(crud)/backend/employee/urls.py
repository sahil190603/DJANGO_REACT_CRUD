# employee/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, DesignationViewSet, HobbyViewSet 


router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'designations', DesignationViewSet)
router.register(r'hobbies', HobbyViewSet)



urlpatterns = [
    path('', include(router.urls)),
]


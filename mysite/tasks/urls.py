from django.urls import path
from . import views
from . views import *
from django.views.generic import TemplateView




app_name = "tasks"

urlpatterns = [    
    path('', TemplateView.as_view(template_name='index.html')),

    # api endpoints here
    path("api/tasks/", Task1ListView.as_view(), name="task1-list"),
    path("api/tasks/<int:pk>/", Task1DetailView.as_view(), name="task1-detail"),
    path("api/tasks/<int:pk>/add_subtask/", views.add_subtask, name="add-subtask"),
    
] 


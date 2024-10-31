from django.urls import include, path
from . import views
from . views import *
from django.views.generic import TemplateView
from rest_framework.authtoken import views




app_name = "accounts"

urlpatterns = [    
    path('', TemplateView.as_view(template_name='index.html')),

    # api endpoints here
    path('api-auth', include('rest_framework.urls')),
    path('api-token-auth', views.obtain_auth_token),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),

        
] 


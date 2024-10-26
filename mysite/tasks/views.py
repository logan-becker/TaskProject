from django.shortcuts import get_object_or_404, render, redirect
from django.views import generic
from django.utils import timezone
from requests import Response
from . models import Task1, SubTask1
from rest_framework import generics
from . serializer import Task1Serializer




# Create your views here.
def index(request):
    latest_task_list = Task1.objects.order_by("-pub_date")
    context = {
        "latest_task_list": latest_task_list,
    }
    return render(request, "tasks/index.html", context)
    

# get question by id or 404
def detail(request, task_id):
    task = get_object_or_404(Task1, pk=task_id)
    latest_subtask_list = task.subtask1_set.all()
    context = {
        "task1": task,
        "latest_subtask_list": latest_subtask_list,
    }
    return render(request, "tasks/detail.html", context)
    
    
class IndexView(generic.ListView):
    template_name = "tasks/index.html"
    context_object_name = "latest_task_list"
    
    # return the last 5 published questions  
    def get_queryset(self):
        return Task1.objects.filter(pub_date__lte=timezone.now()).order_by("-pub_date")

class DetailView(generic.DetailView):
    model = Task1
    template_name = "tasks/detail.html"
    context_object_name = "task1"  # Context object for the Task1 instance

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        
        # Add the list of related subtasks to the context
        context['latest_subtask_list'] = SubTask1.objects.filter(task=self.object)
        
        return context
    

# Create the api views here in order to have react render them from this view

class Task1ListView(generics.ListCreateAPIView):
    queryset = Task1.objects.all()
    serializer_class = Task1Serializer
    
class Task1DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task1.objects.all()
    serializer_class = Task1Serializer
    

    
    
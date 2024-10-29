from django.shortcuts import get_object_or_404, render, redirect
from django.views import generic
from django.utils import timezone
from . models import Task1, SubTask1
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . serializer import SubTask1Serializer, Task1Serializer




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
    
@api_view(['POST'])
def add_subtask(request, pk):
    # Fetch the task, or return a 404 if not found
    task = get_object_or_404(Task1, pk=pk)
    
    # Log the incoming data for debugging
    print("Incoming subtask data:", request.data)
    
    # Use SubTask1Serializer to validate and save incoming data
    serializer = SubTask1Serializer(data=request.data)
    if serializer.is_valid():
        try:
            # Save the subtask and associate it with the correct task
            serializer.save(task=task)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print("Error during save:", e)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        print("Validation errors:", serializer.errors)  # Log validation errors if any
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create the api views here in order to have react render them from this view

class Task1ListView(generics.ListCreateAPIView):
    queryset = Task1.objects.all()
    serializer_class = Task1Serializer
    
class Task1DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task1.objects.all()
    serializer_class = Task1Serializer
    

    
    
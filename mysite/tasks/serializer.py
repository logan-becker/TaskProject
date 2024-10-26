from rest_framework import serializers
from . models import Task1, SubTask1


class SubTask1Serializer(serializers.ModelSerializer):
    class Meta:
        model = SubTask1
        fields = ['id', 'title', 'description', 'is_completed']

class Task1Serializer(serializers.ModelSerializer):
    
    # Include the related subtasks
    subtasks = SubTask1Serializer(many=True, read_only=True)
    
    class Meta:
        model = Task1
        fields = ['id', 'title', 'description', 'pub_date', 'is_completed', "subtasks"]

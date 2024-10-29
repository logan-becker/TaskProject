from rest_framework import serializers
from . models import Task1, SubTask1


class SubTask1Serializer(serializers.ModelSerializer):
    
    description = serializers.CharField(required=False, allow_blank=True)  # Explicitly optional
    task = serializers.PrimaryKeyRelatedField(read_only=True)  # Add task as a read-only field

    
    class Meta:
        model = SubTask1
        fields = ['title', 'description', 'is_completed', 'task']

class Task1Serializer(serializers.ModelSerializer):
    
    # Include the related subtasks
    subtasks = SubTask1Serializer(many=True, read_only=True)
    
    class Meta:
        model = Task1
        fields = ['id', 'title', 'description', 'pub_date', 'is_completed', "subtasks"]

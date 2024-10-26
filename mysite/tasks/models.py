from django.db import models

# Create your models here.
class Task1(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    pub_date = models.DateTimeField("date published")
    is_completed = models.BooleanField(default=False)

    
    def __str__(self):
        return self.title
    
class SubTask1(models.Model):
    task = models.ForeignKey(Task1, on_delete=models.CASCADE, related_name='subtasks')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.task.title} - {self.title}"



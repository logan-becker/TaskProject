from django.contrib import admin

from .models import Task1, SubTask1

class InlineSubTask1(admin.TabularInline):
    model = SubTask1
    extra = 5
    
    
class SubTask1Admin(admin.ModelAdmin):
    fieldsets = [
        ("Sub Task Title", {"fields": ["title"]}),
        ("Description", {"fields": ["description"]}),
        ("Complete?", {"fields": ["is_completed"]})
        
    ]

class Task1Admin(admin.ModelAdmin):
    
    fieldsets = [
        ("Task Title", {"fields": ["title"]}),
        ("Description", {"fields": ["description"]}),
        ("Date Published", {"fields": ["pub_date"]}),
        ("Complete?", {"fields": ["is_completed"]}),
    ]
    
    inlines = [InlineSubTask1]
    list_display = ["title", "pub_date"]
    list_filter = ["pub_date"]
    search_fields=["title"]

# Register your models here.
admin.site.register(Task1, Task1Admin)
admin.site.register(SubTask1)


    
    

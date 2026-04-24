import json
import os
import time

class Cache:
    """
    A simple file-based caching utility with Time-To-Live (TTL) support.
    """
    def __init__(self, cache_file="cache.json", ttl=3600):
        self.cache_file = cache_file
        self.ttl = ttl
        self.data = self._load()

    def _load(self):
        if os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, 'r') as f:
                    return json.load(f)
            except json.JSONDecodeError:
                return {}
        return {}

    def _save(self):
        with open(self.cache_file, 'w') as f:
            json.dump(self.data, f)

    def get(self, key):
        """Retrieve a value from the cache if it exists and hasn't expired."""
        if key in self.data:
            item = self.data[key]
            if time.time() - item['timestamp'] < self.ttl:
                return item['value']
            else:
                self.delete(key)
        return None

    def set(self, key, value):
        """Store a value in the cache."""
        self.data[key] = {
            'value': value,
            'timestamp': time.time()
        }
        self._save()

    def delete(self, key):
        """Delete a specific key from the cache."""
        if key in self.data:
            del self.data[key]
            self._save()

    def clear(self):
        """Clear all items from the cache."""
        self.data = {}
        if os.path.exists(self.cache_file):
            os.remove(self.cache_file)

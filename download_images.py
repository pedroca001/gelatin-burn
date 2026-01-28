import os
import requests
from urllib.parse import urlparse

# List of unique URLs found
urls = [
    "https://media.atomicatpages.net/u/NdH991CVXqTTY1DVqZK0s6D6kPM2/Pictures/sgnBDo9673283.webp",
    "https://media.atomicatpages.net/u/NdH991CVXqTTY1DVqZK0s6D6kPM2/Pictures/xChhtw9743031.webp",
    "https://media.atomicatpages.net/u/ihhp2PyxJ8ZEUoIL4S5Kcx620KU2/Pictures/SWmHRX2632243.jpeg",
    "https://media.atomicatpages.net/p/fblike.webp?height=48&width=48",
    "https://media.atomicatpages.net/u/NdH991CVXqTTY1DVqZK0s6D6kPM2/Pictures/RFBJDv0760781.jpeg",
    "https://media.atomicatpages.net/u/NdH991CVXqTTY1DVqZK0s6D6kPM2/Pictures/ynFAzm0760781.jpeg",
    "https://media.atomicatpages.net/u/ihhp2PyxJ8ZEUoIL4S5Kcx620KU2/Pictures/pikGKW2632243.jpeg",
    "https://media.atomicatpages.net/u/NdH991CVXqTTY1DVqZK0s6D6kPM2/Pictures/YwgHeF0760781.jpeg",
    "https://media.atomicatpages.net/u/ihhp2PyxJ8ZEUoIL4S5Kcx620KU2/Pictures/koPWQB2632243.jpeg",
    "https://media.atomicatpages.net/u/NdH991CVXqTTY1DVqZK0s6D6kPM2/Pictures/iYjjBk0760781.jpeg",
    "https://media.atomicatpages.net/p/fblogo.webp?height=48&width=48"
]

output_dir = "img"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for url in urls:
    # Handle query parameters for fblike.webp
    parsed = urlparse(url)
    filename = os.path.basename(parsed.path)
    
    # Save path
    save_path = os.path.join(output_dir, filename)
    
    try:
        print(f"Downloading {url} to {save_path}...")
        response = requests.get(url)
        response.raise_for_status()
        with open(save_path, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")

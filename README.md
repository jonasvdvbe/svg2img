# SVG2IMG API

https://github.com/jonasvdvbe/svg2img

A simple self-hosted API (Dockerized) that converts **SVG → PNG/JPG**.  
Supports raw SVG, JSON, form fields, or file upload.  
Built with **Node.js + Express + Sharp**.  

---

## 🚀 Features
- Convert SVGs to **PNG** or **JPG**
- Accepts input as:
  - raw `image/svg+xml`
  - `application/json` (`{ "svg": "..." }`)
  - `application/x-www-form-urlencoded` (`svg=...`)
  - file upload (`multipart/form-data`)
- Scale output resolution with `?scale=2`, `?scale=4`, etc.
- Dockerized — easy to run anywhere

---

## 📦 Run with Docker

### Option 1: Build locally
```bash
docker build -t svg2img .
docker run -p 8080:8080 svg2img
```

### Option 2: Pull from DockerHub
```bash
docker pull jonasvdvbe/svg2img
docker run -p 8080:8080 jonasvdvbe/svg2img
```

Now your API is available at:  
👉 `http://localhost:8080/convert`

---

## 🧪 Example Requests

### 1. Convert via form field
```bash
curl -X POST   -H "Content-Type: application/x-www-form-urlencoded"   --data-urlencode "svg=<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><circle cx='100' cy='100' r='80' fill='red'/></svg>"   "http://localhost:8080/convert?format=png"   --output circle.png
```

---

### 2. Higher resolution (3× scale)
```bash
curl -X POST   -H "Content-Type: application/x-www-form-urlencoded"   --data-urlencode "svg=<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><circle cx='100' cy='100' r='80' fill='blue'/></svg>"   "http://localhost:8080/convert?format=jpg&scale=3"   --output circle@3x.jpg
```

---

### 3. JSON body
```bash
curl -X POST   -H "Content-Type: application/json"   -d '{"svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\"><rect width=\"200\" height=\"200\" fill=\"green\"/></svg>"}'   "http://localhost:8080/convert?format=png&scale=2"   --output square.png
```

---

### 4. File upload
```bash
curl -X POST   -F "file=@example.svg"   "http://localhost:8080/convert?format=png"   --output example.png
```

---

## ⚙️ Query Parameters
- `format` → `png` (default) or `jpg`
- `scale` → multiplier for output resolution (`1` = original, `2` = 2× bigger, etc.)

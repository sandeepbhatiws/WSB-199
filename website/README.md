Gooey Playground & Demo E-commerce Site

Files:
- index.html — landing page with gooey playground
- shop.html — product catalog and cart
- checkout.html — mock checkout
- styles.css, script.js, shop.js, products.json

Run locally with a static server. From the folder `d:/Classess/WSB-199/website` run:

```powershell
python -m http.server 8000
# then open http://localhost:8000/
```

Notes:
- This is a static demo (no payments).
- Cart uses `localStorage`. Images come from placeholder service `picsum.photos`.

Next steps you might want:
- Add product images into an `assets/` folder.
- Add product detail pages or pagination.
- Integrate a real payment provider for production.

# Product Catalog — GitHub Pages Edition

This is a static HTML/CSS/JavaScript website. It runs directly on GitHub Pages:
- No Node.js, PM2, backend, database, login, API or environment variables.
- Product data is edited directly in `products.js`.
- Company details are edited in `site-config.js`.
- Multiple photos open in a full-screen gallery with touch swipe, arrow keys and previous/next controls.
- Includes a separate Contact page with phone, email, address, WhatsApp link and Google Maps embed.

## 1. Update your company details

Edit `site-config.js`:
- `companyName`
- `logo` — put your logo file in `assets/`, e.g. `assets/logo.png`
- `contactName`
- `phoneDisplay`
- `phoneDigits` — country code + number, digits only (India example: `919876543210`)
- `email`
- `address`
- `mapQuery` — full address or a Google Maps search phrase

## 2. Add products directly in code

Edit `products.js`. Example:
```js
window.PRODUCTS = [
  {
    name: "Product Name",
    code: "ITEM-001",
    photos: [
      "assets/products/item-001-front.jpg",
      "assets/products/item-001-back.jpg"
    ]
  },
  {
    name: "Another Product",
    code: "ITEM-002",
    photos: ["assets/products/item-002.jpg"]
  }
];
```
Copy the image files into `assets/products/`. File names and paths are case-sensitive on GitHub Pages. Use `photos: []` if a product has no image. Product codes should be unique.

## 3. Publish on GitHub Pages

1. Create a GitHub repository, for example `product-catalog`.
2. Upload all files and folders from this ZIP to the repository root. Do not upload the enclosing ZIP folder itself.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then Save.
6. Wait for the Pages deployment. Your public URL will look like `https://YOUR-USERNAME.github.io/product-catalog/`.

If you use a custom domain, configure it in Settings → Pages and follow GitHub's DNS instructions. Enable HTTPS when available.

## 4. QR code

After GitHub Pages is published and the final public URL works, create a QR code for that URL using any trusted QR generator. If the repository name or domain changes, regenerate the QR code.

## 5. Contact page / Google Maps

The map is embedded from the `mapQuery` value in `site-config.js`. Set it to your full business address or a Google Maps place/search URL. The page also includes clickable telephone and email links and a WhatsApp chat link.

## Folder structure

```text
product-catalog-github-pages/
├── index.html
├── contact.html
├── site-config.js
├── products.js
├── catalog.js
├── contact.js
├── styles.css
├── assets/
│   ├── favicon.svg
│   └── products/
└── README.md
```

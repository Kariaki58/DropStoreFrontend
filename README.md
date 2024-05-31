## DropStore

The frontend application of DropStore using React JS

![Screenshot from 2024-05-31 01-02-38](https://github.com/Kariaki58/DropStoreFrontend/assets/113528028/68128a01-8bae-470c-8c8c-ca13b2853f01)

![Screenshot from 2024-05-31 01-02-43](https://github.com/Kariaki58/DropStoreFrontend/assets/113528028/a592d77e-e395-4598-912d-2272fc072269)

## How To Install It

```
git clone <repo>
npm install
```

After Installation there no much to do, next up is setting up your .env file
mine looks like this

```
VITE_APP_CLOUDINARY_API_KEY=<cloudinary api key>
VITE_APP_CLOUDINARY_CLOUD_NAME=<cloudinary cloud name>
VITE_APP_BACKEND_BASEURL=<backend path>
VITE_APP_IMAGE_FOLDER=<cloudinary image present>
VITE_APP_VIDEO_FOLDER=<cloudinary video preset
```

After setting cloudinary up Run

```
npm run dev
```

## Bugs To Fix

- Fixing Responsivness across all screen devices
- Add to Cart state in the frontend
- avoid refreshing in the orders page

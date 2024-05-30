## DropStore

The frontend application of DropStore using React JS

![Screenshot from 2024-05-30 17-04-33](https://github.com/Kariaki58/DropStoreFrontend/assets/113528028/dec37fd2-9c73-43d5-95ca-99ac0426eb3a)
![Screenshot from 2024-05-30 17-04-36](https://github.com/Kariaki58/DropStoreFrontend/assets/113528028/805241b7-6602-45ce-b05b-a5047ad644bd)

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

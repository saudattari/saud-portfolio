# Mohammad Saud Portfolio Website

A modern Android developer portfolio website with:

- React + Vite
- Tailwind CSS
- Public portfolio pages
- Project detail pages with screenshots
- Admin dashboard
- Demo mode login (works without Firebase)
- Optional Firebase live mode
- Netlify deployment support

---

## Demo Admin Login

If you run the project without Firebase, use:

- **Email:** `admin@portfolio.com`
- **Password:** `admin123`

Open:

```bash
http://localhost:5173/admin
```

This demo mode uses localStorage, so you can test profile updates and add/edit projects immediately.

---

## Run Locally

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:5173
```

---

## What you can update from Admin

- Name
- Role
- Email
- Form receiver email
- Profile image
- Description / bio
- Stats (experience, apps, clients)
- Project title
- Project description
- Project link
- Header image
- Project screenshots
- Technologies
- Featured status

---

## Firebase Live Setup (Optional)

If you want real live cloud updates instead of demo local mode:

1. Create a Firebase project.
2. Enable **Authentication > Email/Password**.
3. Create your admin user in Firebase Authentication.
4. Enable **Firestore Database**.
5. Enable **Firebase Storage**.
6. Copy `.env.example` to `.env`.
7. Add your Firebase keys.

Example `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

After that restart dev server:

```bash
npm run dev
```

### Firestore Rules

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /site/profile {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules

```js
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## Deploy to Netlify

1. Push the project to GitHub.
2. Open Netlify.
3. Import your GitHub repository.
4. Use these settings:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

5. If using Firebase, add all `VITE_FIREBASE_*` environment variables in Netlify.
6. Deploy.

### Admin URL after deploy

```bash
https://your-site-name.netlify.app/admin
```

### Netlify Form Receiver Setup

The contact form is already prepared.
After deployment:

1. Open Netlify Dashboard.
2. Go to **Forms**.
3. Add email notification.
4. Use this email:

```text
abskills.institute@gmail.com
```

---

## Deploy to GitHub Pages

Netlify is recommended.
GitHub Pages works for the frontend, but Netlify is easier for forms.

---

## Notes

- Without Firebase, everything works in **demo mode** locally.
- With Firebase, it becomes a real cloud-managed portfolio.
- You can replace the default SVG visuals with your own images from admin.



---

## Cloudinary Image Upload Setup

This version can upload images to Cloudinary from the admin dashboard.

### Why Cloudinary?

Firebase Storage may require billing setup. Cloudinary has a Free plan and supports browser uploads using unsigned upload presets.

### Steps

1. Create a Cloudinary account.
2. Open Cloudinary Console.
3. Copy your **Cloud name** from the Dashboard.
4. Go to **Settings > Upload**.
5. Open **Upload presets**.
6. Click **Add upload preset**.
7. Set **Signing Mode** to **Unsigned**.
8. Save the preset.
9. Copy the upload preset name.

Add these values in `.env`:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

Restart:

```bash
npm run dev
```

Now admin uploads will go to Cloudinary and saved image URLs will be stored in Firestore/demo project data.

### Important security note

Unsigned upload presets are usable from browser code. For a portfolio, keep the preset restricted to images, use a portfolio folder, and avoid allowing very large files. For high-security production, use signed uploads through your own backend.

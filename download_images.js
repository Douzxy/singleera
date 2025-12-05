/**
 * download_images.js
 * Script untuk download gambar dari Unsplash ke folder lokal
 * Jalankan dengan: node download_images.js
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const MONTHS_DATA = [
  {
    name: "januari",
    photos: [
      "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=600&q=80",
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600&q=80",
      "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=600&q=80",
      "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80",
      "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=600&q=80",
    ],
  },
  {
    name: "februari",
    photos: [
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
      "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600&q=80",
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80",
    ],
  },
  {
    name: "maret",
    photos: [
      "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=80",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80",
      "https://images.unsplash.com/photo-1457530378978-8bac673b8062?w=600&q=80",
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=80",
    ],
  },
  {
    name: "april",
    photos: [
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80",
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&q=80",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80",
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
    ],
  },
  {
    name: "mei",
    photos: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
      "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=600&q=80",
    ],
  },
  {
    name: "juni",
    photos: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=80",
      "https://images.unsplash.com/photo-1468413253725-0d5181091f4a?w=600&q=80",
    ],
  },
  {
    name: "juli",
    photos: [
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=600&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
      "https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?w=600&q=80",
      "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=600&q=80",
      "https://images.unsplash.com/photo-1468078809804-4c7b3e60a478?w=600&q=80",
    ],
  },
  {
    name: "agustus",
    photos: [
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80",
      "https://images.unsplash.com/photo-1496483648148-47c686dc86a8?w=600&q=80",
      "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=600&q=80",
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&q=80",
    ],
  },
  {
    name: "september",
    photos: [
      "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=600&q=80",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    ],
  },
  {
    name: "oktober",
    photos: [
      "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600&q=80",
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
      "https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=600&q=80",
      "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?w=600&q=80",
      "https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=600&q=80",
    ],
  },
  {
    name: "november",
    photos: [
      "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?w=600&q=80",
      "https://images.unsplash.com/photo-1479030160180-b1860951d696?w=600&q=80",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80",
      "https://images.unsplash.com/photo-1520962922320-2038eebab146?w=600&q=80",
    ],
  },
  {
    name: "desember",
    photos: [
      "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&q=80",
      "https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=600&q=80",
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&q=80",
      "https://images.unsplash.com/photo-1513297887119-d46091b24bfb?w=600&q=80",
      "https://images.unsplash.com/photo-1481750565214-e7941f8afe7c?w=600&q=80",
    ],
  },
];

const imagesDir = path.join(__dirname, "images");

// Create main images folder
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (response) => {
        // Handle redirect
        if (response.statusCode === 301 || response.statusCode === 302) {
          const redirectUrl = response.headers.location;
          https
            .get(
              redirectUrl,
              { headers: { "User-Agent": "Mozilla/5.0" } },
              (res) => {
                res.pipe(file);
                file.on("finish", () => {
                  file.close();
                  resolve();
                });
              }
            )
            .on("error", reject);
        } else if (response.statusCode === 200) {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve();
          });
        } else {
          reject(new Error(`HTTP ${response.statusCode}`));
        }
      })
      .on("error", (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
  });
}

async function downloadAllImages() {
  console.log("Starting image download...\n");

  for (const month of MONTHS_DATA) {
    const monthDir = path.join(imagesDir, month.name);

    // Create month folder
    if (!fs.existsSync(monthDir)) {
      fs.mkdirSync(monthDir, { recursive: true });
    }

    console.log(`📁 Downloading ${month.name}...`);

    for (let i = 0; i < month.photos.length; i++) {
      const url = month.photos[i];
      const filename = `${String(i + 1).padStart(2, "0")}.jpg`;
      const filepath = path.join(monthDir, filename);

      // Skip if already exists
      if (fs.existsSync(filepath)) {
        console.log(`   ⏩ ${filename} (already exists)`);
        continue;
      }

      try {
        await downloadImage(url, filepath);
        console.log(`   ✅ ${filename}`);
      } catch (err) {
        console.log(`   ❌ ${filename} - ${err.message}`);
      }

      // Small delay between downloads
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  console.log("\n✨ Download complete!");
  console.log(
    'Now update js/data.js to use local paths like: "images/januari/01.jpg"'
  );
}

downloadAllImages();

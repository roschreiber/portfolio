import fs from "fs";
import path from "path";

const TOKEN = import.meta.env.AIRTABLE_TOKEN;
const BASE_ID = import.meta.env.AIRTABLE_BASE_ID;
const PTABLE = import.meta.env.AIRTABLE_PHOTO_TABLE;
const STABLE = import.meta.env.AIRTABLE_SERIES_TABLE;
const OUT = path.resolve('./photo-cache')

interface Photo {
  title: string;
  location: string;
  category: string;
  cameraSettings: string;
  dateTaken: string;
  src: string;
  filePath: string;
}

let cachedPhotos: Photo[] = [];
let lastFetch = 0;
let isFetching = false;

export async function fetchPhotos() {
  const THREE_HOURS = 3 * 60 * 60 * 1000;
  const oldCache = Date.now() - lastFetch > THREE_HOURS;
  const emptyCache = cachedPhotos.length === 0;

  if (!isFetching && (oldCache || emptyCache)) {
    isFetching = true;
    if (!TOKEN || !BASE_ID || !PTABLE) {
      console.error("Couldn't fetch from Airtable due to environment variables missing")
      isFetching = false;
      return [];
    } else {
      const params = new URLSearchParams();
      params.append("sort[0][field]", "Date Taken");
      params.append("sort[0][direction]", "desc");

      const baseURL = `https://api.airtable.com/v0/${BASE_ID}/${PTABLE}`;
      const url = `${baseURL}?${params.toString()}`;

      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch photos from Airtable: " + response.status);
      }

      const data = await response.json();

      fs.mkdirSync(OUT, { recursive: true });
      const photos: Photo[] = [];

      for (const record of data.records) {
        const fields = record.fields;
        const attachments = fields["Photo"];

        const photo = attachments[0];

        const fileName = photo.filename;
        const filePath = path.join(OUT, fileName);

        if (!fs.existsSync(filePath)) {
          const image = await fetch(photo.url);
          const buffer = await image.arrayBuffer();
          fs.writeFileSync(filePath, Buffer.from(buffer));
        }

        photos.push({
          title: fields["Title/Description"],
          location: fields["Location"],
          category: fields["Category"],
          cameraSettings: fields["Camera Settings"],
          dateTaken: fields["Date Taken"],
          src: "/photo/" + fileName,
          filePath: filePath,
        });
      }

      cachedPhotos = photos;
      lastFetch = Date.now();
      isFetching = false;
      return photos;

    }

  }

  return cachedPhotos;
}

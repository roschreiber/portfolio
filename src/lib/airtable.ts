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

interface Series {
  title: string;
  rating: string;
  type: string;
  notes: string;
  dateWatched: string;
  src: string;
  filePath: string;
}

let cachedPhotos: Photo[] = [];
let photosLastFetch = 0;
let isFetchingPhotos = false;

let cachedSeries: Series[] = [];
let seriesLastFetch = 0;
let isFetchingSeries = false;

export async function fetchSeries() {
  const THREE_HOURS = 3 * 60 * 60 * 1000;
  const oldCache = Date.now() - seriesLastFetch > THREE_HOURS;
  const emptyCache = cachedSeries.length === 0;

  if (!isFetchingSeries && (oldCache || emptyCache)) {
    isFetchingSeries = true;
    if (!TOKEN || !BASE_ID || !STABLE) {
      console.error("Couldn't fetch from Airtable due to environment variables missing")
      isFetchingSeries = false;
      return [];
    } else {
      const params = new URLSearchParams();
      params.append("sort[0][field]", "Date Watched");
      params.append("sort[0][direction]", "desc");

      const baseURL = `https://api.airtable.com/v0/${BASE_ID}/${STABLE}`;
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
      const series: Series[] = [];

      for (const record of data.records) {
        const fields = record.fields;
        const attachments = fields["Cover"];

        const cover = attachments[0];

        const fileName = cover.filename;
        const filePath = path.join(OUT, fileName);

        if (!fs.existsSync(filePath)) {
          const image = await fetch(cover.url);
          const buffer = await image.arrayBuffer();
          fs.writeFileSync(filePath, Buffer.from(buffer));
        }

        series.push({
          title: fields["Title"],
          rating: fields["Star Rating"],
          type: fields["Type"],
          notes: fields["Review Notes"],
          dateWatched: fields["Date Watched"],
          src: "/series/" + fileName,
          filePath: filePath
        });
      }

      cachedSeries = series;
      seriesLastFetch = Date.now();
      isFetchingSeries = false;
      return series;

    }

  }

  return cachedSeries;
  console.log(cachedSeries);

}

export async function fetchPhotos() {
  const THREE_HOURS = 3 * 60 * 60 * 1000;
  const oldCache = Date.now() - photosLastFetch > THREE_HOURS;
  const emptyCache = cachedPhotos.length === 0;

  if (!isFetchingPhotos && (oldCache || emptyCache)) {
    isFetchingPhotos = true;
    if (!TOKEN || !BASE_ID || !PTABLE) {
      console.error("Couldn't fetch from Airtable due to environment variables missing")
      isFetchingPhotos = false;
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
      photosLastFetch = Date.now();
      isFetchingPhotos = false;
      return photos;

    }

  }

  return cachedPhotos;
}

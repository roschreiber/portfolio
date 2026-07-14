import type { APIRoute } from "astro";

export const prerender = false;

type Device = {
    deviceName: string;
    battery: number;
    charging: boolean;
    image: string;
    refresh: string;
};

const devices: Device[] = [];

export const GET: APIRoute = async () => {
    return new Response(JSON.stringify(devices), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        const { deviceName, battery, charging, image, password } = body;
        if (!deviceName || battery === null || charging === null || !password) {
            return new Response("Bad Request", { status: 400 });
        }
        if (password !== import.meta.env.BATTERY_KEY) {
            return new Response("Unauthorized", { status: 401 });
        }

        const newDevice: Device = {
            deviceName,
            battery,
            charging,
            image,
            refresh: new Date().toISOString(),
        };

        const deviceIndex = devices.findIndex((d) => d.deviceName === deviceName);

        if (deviceIndex == -1) {
            devices.push(newDevice);
        } else {
            devices[deviceIndex] = newDevice;
        }

        return new Response("OK", { status: 200 });
            } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
};

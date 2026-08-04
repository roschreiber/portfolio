import type { APIRoute } from "astro";

export const prerender = false;

type Health = {
    stepsCount: number;
    sleepHrs: string;
    HrsStanding: number;
    ExerciseTime: number;
    kcalBurned: number;
    Floors: number;
    refresh: String;
};

const healthStats: Health[] = [];

export const GET: APIRoute = async () => {
    return new Response(JSON.stringify(healthStats), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        console.log(body);

        const { stepsCount, sleepHrs, HrsStanding, ExerciseTime, kcalBurned, Floors, password } = body;
        if (!stepsCount || sleepHrs === null || HrsStanding === null || ExerciseTime === null || kcalBurned === null || Floors === null || !password) {
            return new Response("Bad Request", { status: 400 });
        }
        if (password !== import.meta.env.BATTERY_KEY) {
            return new Response("Unauthorized", { status: 401 });
        }

        const newHealthStats: Health = {
            stepsCount,
            sleepHrs,
            HrsStanding,
            ExerciseTime,
            kcalBurned,
            Floors,
            refresh: new Date().toISOString(),
        };

        healthStats.push(newHealthStats);

        return new Response("OK", { status: 200 });
            } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
};

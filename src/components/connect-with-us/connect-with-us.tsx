import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { ReactNode, useRef } from "react";

// Register the hook to avoid React version discrepancies.
gsap.registerPlugin(useGSAP);

/**
 * Calculate an array of equidistant positions around a circle with a center at
 * `center`, a radius of `radius`, and `numPoints` number of points.
 *
 * @param radius    The radius of the circle.
 * @param numPoints The number of points around the circle.
 * @param phase     The angle to start from.
 * @returns A 2D array of equidistant positions around a circle with `numPoints`
 * number of points and a radius of `radius`. Each inner array is of the format
 * [x, y].
 */
const getRadialPoints = (
    radius: number,
    numPoints: number,
    phase: number = 0
): number[][] => {
    // The angle between each point.
    const INTERVAL = (2 * Math.PI) / numPoints;

    // Calculate the Cartesian position of each point.
    const positions = [];
    for (let i = 0; i < numPoints; i++) {
        const ANGLE = phase + INTERVAL * i;
        positions.push([radius * Math.cos(ANGLE), radius * Math.sin(ANGLE)]);
    }

    return positions;
};

const ConnectWithUs = (): ReactNode => {
    // const logos_ref = useRef();

    // Use selectors...
    // useGSAP(() => {
    //     gsap.to("#connect-logos", { rotation: "+=360", duration: 3 });
    // });

    /**
     * Stores the images paths of all the SVG logos to be displayed.
     */
    const IMAGES_PATHS = [
        "discord.svg",
        "facebook.svg",
        "gmail.svg",
        "instagram.svg",
        "linkedin.svg",
        "youtube.svg"
    ];

    // Calculate Cartesian coordinates for the logos.
    const LOGO_POSITIONS = getRadialPoints(
        315,
        IMAGES_PATHS.length,
        2 * Math.PI * (1 / 4)
    );

    console.log(LOGO_POSITIONS);

    return (
        <section
            id="connect-with-us"
            className="relative
                       w-screen h-screen
                       flex flex-col justify-center items-center
                       rounded-2xl
                       bg-neutral-800 text-center text-white"
        >
            <div
                id="connect-logos"
                className="static mt-20 flex flex flex-col items-center"
            >
                {IMAGES_PATHS.map((imagePath, index) => {
                    const style = {
                        transform: `translate(${LOGO_POSITIONS[index][0]}px, ${LOGO_POSITIONS[index][1]}px)`
                    };

                    return (
                        <img
                            key={imagePath}
                            src={`./src/assets/connect-with-us/${imagePath}`}
                            className="absolute inline"
                            style={style}
                        />
                    );
                })}
            </div>

            <div
                className="static space-y-6 
                           text-center font-family-[Manrope] text-white"
            >
                <button
                    id="connect-with-us-button"
                    className="border-1 border-white rounded-sm py-2 px-4"
                >
                    Members
                </button>

                <h2 className="text-5xl font-semibold">Connect With Us</h2>
                <h4>The students behind our Mission</h4>
            </div>
        </section>
    );
};

export default ConnectWithUs;

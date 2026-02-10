import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nils Heck — Builder. Founder. Future Thinker.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0B",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#FAFAFA",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Nils Heck
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#3B82F6",
              fontWeight: 500,
            }}
          >
            Builder. Founder. Future Thinker.
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#71717A",
              marginTop: "12px",
            }}
          >
            nilsheck.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

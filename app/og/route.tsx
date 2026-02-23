import { ImageResponse } from "next/og";

export function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "Nikzad Khani";

  return new ImageResponse(
    <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
      <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-center p-8">
        <div tw="flex flex-col md:flex-row items-center justify-center">
          <img
            src={new URL("../../public/me.jpg", import.meta.url).toString()}
            alt="Nikzad Khani"
            width={200}
            height={200}
            tw="rounded-full mr-8"
          />
          <h2 tw="flex flex-col text-6xl font-bold tracking-tight text-left">
            {title}
          </h2>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}

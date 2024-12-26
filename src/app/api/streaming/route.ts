/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const stream = new ReadableStream({
    start(controller) {
      let count = 0;

      // Function to push data into the stream
      const push = () => {
        if (count > 5) {
          controller.enqueue(
            new TextEncoder().encode(
              `data: ${JSON.stringify({ status: "end" })}\n\n`,
            ),
          ); // Close the stream after 5 iterations
          controller.close();
          return;
        }
        controller.enqueue(
          new TextEncoder().encode(`data: ${JSON.stringify({ count })}\n\n`),
        );
        count++;
        setTimeout(push, 1000); // Stream data every second
      };

      push();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
